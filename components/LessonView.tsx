import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, BookOpen, Brain, Image as ImageIcon, MessageCircle, Mic, RefreshCw, Send, StopCircle, Camera, VolumeX, MicOff } from 'lucide-react';
import { GradeLevel, ChatMessage } from '../types';
import TutorAvatar, { TutorStatus } from './TutorAvatar';
import ChatBubble from './ChatBubble';
import * as GeminiService from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface FlattenedLesson {
    id: string;
    title: string;
    description?: string;
}

interface LocationState {
  grade: GradeLevel;
  lesson: FlattenedLesson;
}

const LessonView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const { language, t, isRTL } = useLanguage();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tutorStatus, setTutorStatus] = useState<TutorStatus>('idle');
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!state) navigate('/');
    
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'ar' ? 'ar-EG' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleInteraction('custom', transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        GeminiService.stopSpeech();
    };
  }, [state, navigate, language]);

  // Handle immediate scrolling to ensure text is visible when voice starts
  useEffect(() => {
    if (messages.length > 0) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  const addMessage = (role: 'user' | 'model', text: string, type: 'text' | 'image' = 'text', mediaUrl?: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role, text, type, imageUrl: mediaUrl, timestamp: Date.now() }]);
  };

  useEffect(() => {
    if (state && messages.length === 0) {
      addMessage('model', t.p_welcome.replace('{title}', state.lesson.title));
    }
  }, [state]);

  if (!state) return null;
  const { grade, lesson } = state;

  const handleInteraction = async (mode: 'explain' | 'simplify' | 'quiz' | 'story' | 'custom', customQuery?: string) => {
    if (isLoading) return;
    setIsLoading(true);
    let userText = customQuery || '';
    if (!customQuery) {
        switch(mode) {
            case 'explain': userText = t.p_explain; break;
            case 'simplify': userText = t.p_simplify; break;
            case 'quiz': userText = t.p_quiz; break;
            case 'story': userText = t.p_story; break;
        }
    }
    addMessage('user', userText);
    setInputText(''); 

    try {
      setTutorStatus('thinking');
      let context = messages.slice().reverse().find(m => m.role === 'model')?.text;
      const responseText = await GeminiService.generateExplanation(grade, lesson.title, mode, language, customQuery, context);
      addMessage('model', responseText);
      
      setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
          GeminiService.playTextAsSpeech(responseText, () => setTutorStatus('speaking'), () => setTutorStatus('idle'), language);
      }, 50);

    } catch (error) {
      addMessage('model', t.p_error);
    } finally {
      setIsLoading(false);
      setTutorStatus('idle');
    }
  };

  const handleImageGeneration = async () => {
    if (isLoading) return;
    setIsLoading(true);
    addMessage('user', t.p_draw);
    setTutorStatus('thinking');
    try {
      const context = messages.filter(m => m.role === 'model').pop()?.text || lesson.title;
      const imageUrl = await GeminiService.generateEducationalImage(grade, context);
      if (imageUrl) addMessage('model', t.illustration, 'image', imageUrl);
    } catch (error) {
      addMessage('model', t.p_error);
    } finally {
      setIsLoading(false);
      setTutorStatus('idle');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    addMessage('user', t.p_checkHW);
    setTutorStatus('thinking');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      addMessage('user', '', 'image', base64);
      
      try {
        setTutorStatus('thinking');
        const response = await GeminiService.checkHomework(grade, lesson.title, base64, language);
        addMessage('model', response);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
          GeminiService.playTextAsSpeech(response, () => setTutorStatus('speaking'), () => setTutorStatus('idle'), language);
        }, 50);
      } catch (error) {
        addMessage('model', t.p_error);
      } finally {
        setIsLoading(false);
        setTutorStatus('idle');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      GeminiService.stopSpeech(); // Stop teacher if child wants to speak
      setTutorStatus('idle');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Recognition start error", e);
      }
    }
  };

  const stopVoice = () => {
    GeminiService.stopSpeech();
    setTutorStatus('idle');
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 overflow-hidden">
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
        onChange={handleFileChange}
      />

      <div className="bg-white shadow-md p-3 z-10 flex items-center gap-3 shrink-0 h-20">
        <button onClick={() => { stopVoice(); navigate(-1); }} className="p-2 bg-slate-100 rounded-full active:scale-90 transition-transform">{isRTL ? <ArrowRight /> : <ArrowLeft />}</button>
        <div className="w-14 h-14"><TutorAvatar status={tutorStatus} className="w-full h-full" showStatusBadge={false} language={language} /></div>
        <div className="flex-1">
          <h1 className="text-base font-bold text-slate-800 line-clamp-1">{lesson.title}</h1>
          <span className="text-xs text-slate-500">
            {tutorStatus === 'idle' ? (isListening ? t.listening : grade) : (tutorStatus === 'thinking' ? t.thinking : t.speaking)}
          </span>
        </div>
        
        {tutorStatus === 'speaking' && (
            <button 
                onClick={stopVoice}
                className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold animate-pulse active:scale-95 transition-transform"
            >
                <VolumeX size={16} />
                <span>{t.stopVoice}</span>
            </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((m) => (
            <ChatBubble 
              key={m.id} 
              message={m} 
              onSpeak={(text) => GeminiService.playTextAsSpeech(text, () => setTutorStatus('speaking'), () => setTutorStatus('idle'), language)} 
              isRTL={isRTL} 
            />
          ))}
          {isListening && (
            <div className={`flex w-full mb-4 justify-end`}>
                <div className="bg-blue-100 text-blue-700 p-3 rounded-2xl rounded-tl-none animate-pulse flex items-center gap-2">
                    <Mic size={18} />
                    <span>{t.listening}</span>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t p-2 md:p-4 shrink-0">
        <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                <QuickActionBtn label={t.explain} icon={<Brain size={16} />} color="bg-blue-500" onClick={() => handleInteraction('explain')} disabled={isLoading || isListening} />
                <QuickActionBtn label={t.simplify} icon={<RefreshCw size={16} />} color="bg-green-500" onClick={() => handleInteraction('simplify')} disabled={isLoading || isListening} />
                <QuickActionBtn label={t.story} icon={<MessageCircle size={16} />} color="bg-orange-500" onClick={() => handleInteraction('story')} disabled={isLoading || isListening} />
                <QuickActionBtn label={t.draw} icon={<ImageIcon size={16} />} color="bg-purple-500" onClick={handleImageGeneration} disabled={isLoading || isListening} />
                <QuickActionBtn label={t.quiz} icon={<BookOpen size={16} />} color="bg-indigo-500" onClick={() => handleInteraction('quiz')} disabled={isLoading || isListening} />
                <QuickActionBtn 
                  label={t.checkHW} 
                  icon={<Camera size={16} />} 
                  color="bg-rose-500" 
                  onClick={() => fileInputRef.current?.click()} 
                  disabled={isLoading || isListening} 
                />
            </div>
            <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl">
                <button 
                  onClick={toggleListening} 
                  className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                  disabled={isLoading}
                >
                  {isListening ? <StopCircle size={22} /> : <Mic size={22} />}
                </button>
                <input 
                  type="text" 
                  value={inputText} 
                  onChange={(e) => setInputText(e.target.value)} 
                  placeholder={t.writeQuestion} 
                  className="flex-1 bg-transparent border-none outline-none font-medium px-2" 
                  disabled={isLoading || isListening} 
                  dir={isRTL ? 'rtl' : 'ltr'} 
                  onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && handleInteraction('custom', inputText)}
                />
                <button 
                  onClick={() => handleInteraction('custom', inputText)} 
                  disabled={!inputText.trim() || isLoading || isListening} 
                  className="p-3 bg-blue-600 text-white rounded-xl active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Send size={20} className={isRTL ? 'rotate-180' : ''} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionBtn: React.FC<{ icon: React.ReactNode; label: string; color: string; onClick: () => void; disabled: boolean; }> = ({ icon, label, color, onClick, disabled }) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={`${color} text-white flex items-center gap-2 px-4 py-2 rounded-full shadow-sm whitespace-nowrap active:scale-95 transition-transform disabled:opacity-50`}
    >
        <span>{icon}</span><span className="text-sm font-bold">{label}</span>
    </button>
);

export default LessonView;
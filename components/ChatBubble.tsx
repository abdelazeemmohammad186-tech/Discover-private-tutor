import React from 'react';
import { ChatMessage } from '../types';
import { Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatBubbleProps {
  message: ChatMessage;
  onSpeak?: (text: string) => void;
  isRTL?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onSpeak, isRTL = true }) => {
  const isModel = message.role === 'model';
  const { t } = useLanguage();
  
  const justifyClass = isModel ? 'justify-start' : 'justify-end';
  
  let borderRadiusClass = isRTL 
    ? (isModel ? 'rounded-tr-2xl rounded-tl-none' : 'rounded-tr-none rounded-tl-2xl')
    : (isModel ? 'rounded-tl-2xl rounded-tr-none' : 'rounded-tl-none rounded-tr-2xl');

  return (
    <div className={`flex w-full mb-4 scroll-mt-24 ${justifyClass}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`
        relative max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-lg shadow-sm
        ${borderRadiusClass}
        ${isModel ? 'bg-white text-gray-800 border-2 border-blue-100' : 'bg-blue-500 text-white'}
      `}>
        {message.type === 'text' && <p className="whitespace-pre-wrap">{message.text}</p>}
        
        {message.type === 'image' && message.imageUrl && (
          <div className="mt-2 rounded-xl overflow-hidden border-2 border-gray-200">
            <img src={message.imageUrl} alt="AI Illustration" className="w-full h-auto" />
            <p className="text-sm text-gray-500 p-2 bg-gray-50 text-center">{t.illustration}</p>
          </div>
        )}

        {isModel && message.type === 'text' && onSpeak && (
          <button 
            onClick={() => onSpeak(message.text)}
            className={`absolute -bottom-10 p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 ${isRTL ? 'left-2' : 'right-2'}`}
          >
            <Volume2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
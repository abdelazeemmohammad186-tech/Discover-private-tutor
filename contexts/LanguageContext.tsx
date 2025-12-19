import React, { createContext, useState, useContext, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface Translations {
  appTitle: string;
  subTitle: string;
  grade1: string;
  grade2: string;
  grade3: string;
  primaryStage: string;
  start: string;
  back: string;
  loading: string;
  chooseLesson: string;
  poweredBy: string;
  
  // Lesson View
  explain: string;
  simplify: string;
  story: string;
  draw: string;
  quiz: string;
  checkHW: string;
  speak: string;
  stopVoice: string; // NEW
  listening: string;
  writeQuestion: string;
  preparing: string;
  thinking: string;
  speaking: string;
  checking: string;
  tutor: string;
  illustration: string;
  
  // Prompts (User side text for chat)
  p_explain: string;
  p_simplify: string;
  p_story: string;
  p_draw: string;
  p_quiz: string;
  p_checkHW: string;
  p_welcome: string;
  p_error: string;
}

const translations: Record<Language, Translations> = {
  ar: {
    appTitle: "المدرسة الخاصة",
    subTitle: "لمنهج Discover - اكتشف",
    grade1: "الصف الأول",
    grade2: "الصف الثاني",
    grade3: "الصف الثالث",
    primaryStage: "المرحلة الابتدائية",
    start: "ابدأ",
    back: "رجوع",
    loading: "جاري التحميل...",
    chooseLesson: "اختر الدرس لتبدأ التعلم مع معلمتك الذكية",
    poweredBy: "مدعوم بواسطة Google Gemini",
    
    explain: "اشرحي",
    simplify: "بسطيها",
    story: "قصة",
    draw: "ارسمي",
    quiz: "اسألي",
    checkHW: "صححي الواجب",
    speak: "تحدثي",
    stopVoice: "إيقاف الصوت",
    listening: "أستمع إليك...",
    writeQuestion: "اكتب سؤالك هنا...",
    preparing: "تجهز الدرس...",
    thinking: "تفكر...",
    speaking: "تتحدث الآن...",
    checking: "تصحح الواجب... 📝",
    tutor: "المعلمة الذكية",
    illustration: "رسم توضيحي للمفهوم",

    p_explain: "اشرحي لي الدرس",
    p_simplify: "ممكن شرح أبسط؟",
    p_story: "احكِ لي قصة عن الدرس",
    p_draw: "ممكن ترسمي لي صورة توضح الفكرة؟",
    p_quiz: "اسأليني سؤال",
    p_checkHW: "من فضلك صححي لي هذا الواجب.",
    p_welcome: "أهلاً بك يا بطل! 👋\n\nدرسنا اليوم بعنوان: \"{title}\".\n\nأنا جاهزة للشرح، اضغط على الأزرار أو اكتب سؤالك! 🚀",
    p_error: "حدث خطأ، حاول مرة أخرى.",
  },
  en: {
    appTitle: "Private Tutor",
    subTitle: "For Discover Curriculum",
    grade1: "Grade 1",
    grade2: "Grade 2",
    grade3: "Grade 3",
    primaryStage: "Primary Stage",
    start: "Start",
    back: "Back",
    loading: "Loading...",
    chooseLesson: "Choose a lesson to start learning with your AI Tutor",
    poweredBy: "Powered by Google Gemini",

    explain: "Explain",
    simplify: "Simplify",
    story: "Story",
    draw: "Draw",
    quiz: "Quiz",
    checkHW: "Check HW",
    speak: "Speak",
    stopVoice: "Stop Voice",
    listening: "Listening...",
    writeQuestion: "Type your question...",
    preparing: "Preparing lesson...",
    thinking: "Thinking...",
    speaking: "Speaking...",
    checking: "Grading... 📝",
    tutor: "AI Teacher",
    illustration: "Concept Illustration",

    p_explain: "Explain this lesson",
    p_simplify: "Can you make it simpler?",
    p_story: "Tell me a story about this",
    p_draw: "Can you draw a picture for this concept?",
    p_quiz: "Ask me a question",
    p_checkHW: "Please check this homework for me.",
    p_welcome: "Hello Hero! 👋\n\nToday's lesson is: \"{title}\".\n\nI am ready to explain. Click the buttons or ask me anything! 🚀",
    p_error: "An error occurred, please try again.",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
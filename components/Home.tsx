import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Star, Sun, BookOpen, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TutorAvatar from './TutorAvatar';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const grades = [
    { id: 'grade1', title: t.grade1, color: 'bg-blue-400', icon: <Star className="w-8 h-8 text-yellow-300" /> },
    { id: 'grade2', title: t.grade2, color: 'bg-green-400', icon: <Sun className="w-8 h-8 text-yellow-200" /> },
    { id: 'grade3', title: t.grade3, color: 'bg-orange-400', icon: <GraduationCap className="w-8 h-8 text-white" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 relative">
      
      {/* Language Toggle */}
      <button 
        onClick={toggleLanguage}
        className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md flex items-center gap-2 hover:bg-slate-50 transition-colors z-20"
      >
        <Globe size={20} className="text-blue-600" />
        <span className="font-bold text-slate-700 text-sm">{language === 'ar' ? 'English' : 'العربية'}</span>
      </button>

      <div className="mt-6 mb-10 text-center flex flex-col items-center">
        {/* Avatar and Book Container */}
        <div className="flex items-end justify-center gap-[-10px] mb-2">
            {/* Avatar - Main Focus */}
            <div className="w-40 h-40 -mb-4 z-10 relative">
                <TutorAvatar 
                    status="idle" 
                    className="w-full h-full" 
                    showStatusBadge={false} 
                    language={language} 
                />
            </div>
            
            {/* Book Icon - Decorative next to avatar */}
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg rotate-12 mb-6 -ms-4 z-0">
                <BookOpen className="text-white w-7 h-7" />
            </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{t.appTitle}</h1>
        <p className="text-slate-500 font-medium">{t.subTitle}</p>
      </div>

      <div className="w-full max-w-md grid gap-6">
        {grades.map((grade) => (
          <button
            key={grade.id}
            onClick={() => navigate(`/grade/${grade.id}`)}
            className={`${grade.color} relative overflow-hidden group p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-right`}
          >
             <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-8 -translate-y-8" />
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-black opacity-5 rounded-full translate-x-12 translate-y-12" />
             
             <div className="relative z-10 flex items-center justify-between">
                <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <span className="block text-white/80 text-sm font-bold mb-1">{t.primaryStage}</span>
                    <h2 className="text-3xl font-black text-white">{grade.title}</h2>
                </div>
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                    {grade.icon}
                </div>
             </div>
          </button>
        ))}
      </div>

      <footer className="mt-auto py-8 text-center text-slate-400 text-sm">
        <p>أتعلم – أفهم – أطبق</p>
        <p className="mt-2 text-xs opacity-50">{t.poweredBy}</p>
      </footer>
    </div>
  );
};

export default Home;
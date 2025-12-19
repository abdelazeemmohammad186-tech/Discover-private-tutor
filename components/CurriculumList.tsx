import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, PlayCircle, Book, ArrowRight, ArrowLeft } from 'lucide-react';
import { CURRICULUM_DATA } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const CurriculumList: React.FC = () => {
  const { gradeId } = useParams<{ gradeId: string }>();
  const navigate = useNavigate();
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);
  const { t, isRTL, language } = useLanguage();

  const curriculumKey = gradeId as keyof typeof CURRICULUM_DATA;
  const curriculum = CURRICULUM_DATA[curriculumKey];

  if (!curriculum) {
    return <div className="p-8 text-center text-red-500">Curriculum not found</div>;
  }

  // Helper to get translated grade title
  const getGradeTitle = () => {
    switch(gradeId) {
      case 'grade1': return t.grade1;
      case 'grade2': return t.grade2;
      case 'grade3': return t.grade3;
      default: return curriculum.grade;
    }
  };

  const toggleTheme = (id: string) => {
    setExpandedTheme(expandedTheme === id ? null : id);
  };

  const startLesson = (lesson: any) => {
    navigate(`/lesson/${lesson.id}`, { 
      state: { 
        grade: getGradeTitle(), 
        // Flatten the title for the next view, or pass the whole object
        lesson: {
            ...lesson,
            title: lesson.title[language] // Pass string to LessonView to avoid breaking it immediately
        }
      } 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-blue-500 p-6 text-white shadow-lg rounded-b-[3rem] mb-8 relative">
        <button 
          onClick={() => navigate('/')}
          className={`absolute top-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm ${isRTL ? 'right-6' : 'left-6'}`}
          aria-label={t.back}
        >
          {isRTL ? <ArrowRight className="text-white" size={24} /> : <ArrowLeft className="text-white" size={24} />}
        </button>
        
        <div className="max-w-2xl mx-auto text-center pt-2">
            <h1 className="text-3xl font-bold mb-2">{getGradeTitle()}</h1>
            <p className="opacity-90">{t.chooseLesson}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 space-y-4">
        {curriculum.themes.map((theme) => (
          <div key={theme.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <button
              onClick={() => toggleTheme(theme.id)}
              className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Book size={20} />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 block">
                        {language === 'ar' ? (theme.term === 1 ? 'الترم الأول' : 'الترم الثاني') : (theme.term === 1 ? 'Term 1' : 'Term 2')}
                    </span>
                    <h3 className="font-bold text-lg text-slate-800">{theme.title[language]}</h3>
                </div>
              </div>
              {expandedTheme === theme.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
            </button>

            {expandedTheme === theme.id && (
              <div className="border-t border-slate-100 bg-slate-50/50">
                {theme.chapters.map((chapter) => (
                  <div key={chapter.id} className="p-4">
                    <h4 className={`text-sm font-bold text-slate-500 mb-3 px-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {chapter.title[language]}
                    </h4>
                    <div className="space-y-2">
                      {chapter.lessons.map((lesson) => (
                        <div 
                          key={lesson.id}
                          onClick={() => startLesson(lesson)}
                          className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-all hover:shadow-md flex items-center justify-between"
                        >
                          <div className={isRTL ? 'text-right' : 'text-left'}>
                            <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                {lesson.title[language]}
                            </h5>
                            {lesson.description && (
                                <p className="text-xs text-slate-500 mt-1">
                                    {lesson.description[language]}
                                </p>
                            )}
                          </div>
                          <PlayCircle className={`text-slate-300 group-hover:text-blue-500 transition-colors ${!isRTL && 'rotate-180'}`} size={28} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumList;
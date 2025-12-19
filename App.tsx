import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CurriculumList from './components/CurriculumList';
import LessonView from './components/LessonView';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="min-h-screen text-slate-800 font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grade/:gradeId" element={<CurriculumList />} />
            <Route path="/lesson/:lessonId" element={<LessonView />} />
          </Routes>
        </div>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
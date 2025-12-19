export enum GradeLevel {
  Grade1 = 'الصف الأول',
  Grade2 = 'الصف الثاني',
  Grade3 = 'الصف الثالث',
}

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Lesson {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
}

export interface Chapter {
  id: string;
  title: LocalizedText;
  lessons: Lesson[];
}

export interface Theme {
  id: string;
  title: LocalizedText;
  term: 1 | 2;
  chapters: Chapter[];
}

export interface Curriculum {
  grade: GradeLevel;
  themes: Theme[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  type: 'text' | 'image';
  imageUrl?: string;
  timestamp: number;
}
export type TComment = {
  id: number,
  name: string,
  country: string,
  comment: string
}
// src/types/user.ts


// types/user.ts

export type UserRole = 'admin' | 'teacher' | 'student';

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  age?: number | null;
  gender?: 'ذكر' | 'أنثى' | null;
  country?: string | null;
  education_level?: string | null;
  japanese_level?: string | null;
  role: UserRole; // حقل نوع الدور: أدمن أو معلم أو طالب
  created_at?: string;
  updated_at?: string;
}

// أنواع بيانات الاختبار
export interface Question {
  id: number;
  type: 'multiple_choice' | 'text_input';
  question: string;
  options?: string[] | null;
  level_weight: string;
}

export interface TestSubmissionResponse {
  message: string;
  score: number;
  total_questions: number;
  japanese_level: string;
}
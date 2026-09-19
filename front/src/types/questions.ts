// types/question.ts

export type QuestionType = 'multiple_choice' | 'text';

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[] | null; // خيارات الإجابة للأسئلة الأختيارية
  correct_answer: string;
  level: string; // مثل N5, N4, N3, N2, N1
  created_at?: string;
}

export type CreateQuestionInput = Omit<Question, 'id' | 'created_at'>;
export type UpdateQuestionInput = Partial<CreateQuestionInput>;
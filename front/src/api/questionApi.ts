// services/questionApi.ts
import APIURL from './apiConfig';
import type { Question, CreateQuestionInput, UpdateQuestionInput } from '../types/questions';

export const questionApi = {
  /**
   * جلب كافة الأسئلة للوحة التحكم
   */
  async getAll(): Promise<Question[]> {
    const response = await APIURL.get<Question[]>('/dashboard/questions');
    return response.data;
  },

  /**
   * إضافة سؤال جديد
   */
  async create(data: CreateQuestionInput): Promise<Question> {
    const response = await APIURL.post<Question>('/dashboard/questions', data);
    return response.data;
  },

  /**
   * تعديل سؤال حالي
   */
  async update(id: number, data: UpdateQuestionInput): Promise<Question> {
    const response = await APIURL.put<Question>(`/dashboard/questions/${id}`, data);
    return response.data;
  },

  /**
   * حذف سؤال
   */
  async delete(id: number): Promise<{ message: string }> {
    const response = await APIURL.delete<{ message: string }>(`/dashboard/questions/${id}`);
    return response.data;
  },
};
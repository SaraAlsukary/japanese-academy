// services/testApi.ts
import type { Question, TestSubmissionResponse } from '../types/user';
import APIURL from './apiConfig';



export const testApi = {
  /**
   * جلب قائمة أسئلة اختبار تحديد المستوى
   */
  async getQuestions(): Promise<Question[]> {
    const response = await APIURL.get<Question[]>('/placement-test/questions');
    return response.data;
  },

  /**
   * إرسال إجابات الاختبار للحصول على النتيجة وتحديث مستوى الطالب
   */
  async submitTest(answers: Record<number, string>): Promise<TestSubmissionResponse> {
    const response = await APIURL.post<TestSubmissionResponse>('/placement-test/submit', {
      answers,
    });
    return response.data;
  },
};
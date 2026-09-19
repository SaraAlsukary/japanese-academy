// hooks/useTest.ts
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testApi } from '../api/testApi';
import type { Question, TestSubmissionResponse } from '../types/user';

export const useTest = (enabled: boolean = true) => {
  const queryClient = useQueryClient();

  // 1. حالة التنقل والإجابات المكتوبة محلياً
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // 2. جلب الأسئلة باستخدام React Query
  const {
    data: questions = [],
    isLoading: loadingQuestions,
    isError: isQuestionsError,
    error: questionsError,
    refetch: refetchQuestions,
  } = useQuery<Question[], Error>({
    queryKey: ['placement-test-questions'],
    queryFn: testApi.getQuestions,
    enabled, // يتم الجلب فقط عند فتح المودال أو تفعيل الهوك
    staleTime: 1000 * 60 * 5, // حفظ الكاش لمدة 5 دقائق
    gcTime: 1000 * 60 * 10,
  });

  // 3. تسليم الإجابات باستخدام useMutation
  const submitMutation = useMutation<TestSubmissionResponse, Error, Record<number, string>>({
    mutationFn: (userAnswers) => testApi.submitTest(userAnswers),
    onSuccess: () => {
      // إبطال كاش بيانات المستخدم ليتم جلب المستوى اللغوي الجديد تلقائياً
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });

  // 4. تسجبل/تعديل إجابة سؤال
  const setAnswer = useCallback((questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  // 5. التنقل بين الأسئلة
  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }, [questions.length]);

  const prevQuestion = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // 6. إعادة ضبط حالة الاختبار
  const resetTest = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    submitMutation.reset();
  }, [submitMutation]);

  // 7. تسليم الاختبار
  const handleSubmit = useCallback(async () => {
    if (Object.keys(answers).length === 0) return;
    return await submitMutation.mutateAsync(answers);
  }, [answers, submitMutation]);

  const currentQuestion = questions[currentIndex] || null;
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = questions.length > 0 && currentIndex === questions.length - 1;
  const hasAnsweredCurrent = currentQuestion
    ? Boolean(answers[currentQuestion.id]?.trim())
    : false;

  return {
    // البيانات والأسئلة
    questions,
    currentQuestion,
    currentIndex,
    answers,

    // حالات التحميل والأخطاء
    loading: loadingQuestions,
    submitting: submitMutation.isPending,
    error:
      (questionsError ? questionsError.message : null) ||
      (submitMutation.error ? submitMutation.error.message : null),
    isQuestionsError,

    // النتيجة عند اكتمال الاختبار
    result: submitMutation.data || null,

    // الدوال والعمليات
    setAnswer,
    nextQuestion,
    prevQuestion,
    submitTest: handleSubmit,
    resetTest,
    refetchQuestions,

    // المساعدات الشروطية
    isFirstQuestion,
    isLastQuestion,
    hasAnsweredCurrent,
  };
};
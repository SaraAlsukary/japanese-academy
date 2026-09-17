import { AxiosError } from 'axios';

export const parseApiError = (error: unknown) => {
  const err = error as AxiosError<any>;

  // 1. أخطاء Validation (422)
  if (err.response?.status === 422 && err.response?.data?.errors) {
    return {
      isValidation: true,
      errors: err.response.data.errors as Record<string, string[]>,
      message: err.response.data.message || "يرجى التأكد من البيانات المدخلة",
    };
  }

  // 2. أخطاء تحتوي على رسالة خاصة من الخادم
  if (err.response?.data?.message) {
    return {
      isValidation: false,
      errors: {},
      message: err.response.data.message,
    };
  }

  // 3. أخطاء شبكة أو انقطاع سيرفر
  return {
    isValidation: false,
    errors: {},
    message: "تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً.",
  };
};
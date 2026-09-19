import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

// 1. إنشاء حساب
export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,
  });
};

// 2. التحقق من OTP للتسجيل
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: authApi.verifyOtp,
  });
};

// 3. تسجيل الدخول
export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
  });
};

// 4. إعادة إرسال OTP
export const useResendOtp = () => {
  return useMutation({
    mutationFn: authApi.resendOtp,
  });
};

// 5. نسيت كلمة المرور
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
};

// 6. التحقق من OTP إعادة التعيين
export const useVerifyResetOtp = () => {
  return useMutation({
    mutationFn: authApi.verifyResetOtp,
  });
};

// 7. إعادة تعيين كلمة المرور
export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
};

// 8. تسجيل الخروج
export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
  });
};

// 9. حذف الحساب
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: authApi.deleteAccount,
  });
};

// 10. جلب بيانات الملف الشخصي
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    enabled: !!localStorage.getItem('token'),
  });
};

// 11. تعديل البيانات الشخصية
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: () => {
      // إعادة جلب بيانات الملف الشخصي لتحديث الواجهة فوراً
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// 12. تحديث الصورة الشخصية
export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.updateAvatar,
    onSuccess: () => {
      // إعادة جلب بيانات الملف الشخصي لتظهر الصورة الجديدة مباشرة
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
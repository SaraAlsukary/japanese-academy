import { APIURL } from "./apiConfig";

export const authApi = {
    register: (data: any) => APIURL.post('/register', data).then((res) => res.data),
    verifyOtp: (data: any) => APIURL.post('/verify-otp', data).then((res) => res.data),
    login: (data: any) => APIURL.post('/login', data).then((res) => res.data),
    resendOtp: (data: any) => APIURL.post('/resend-otp', data).then((res) => res.data),
    forgotPassword: (data: any) => APIURL.post('/forgot-password', data).then((res) => res.data),
    verifyResetOtp: (data: any) => APIURL.post('/verify-reset-otp', data).then((res) => res.data),
    resetPassword: (data: any) => APIURL.post('/reset-password', data).then((res) => res.data),
    logout: () => APIURL.post('/logout').then((res) => res.data),
    getProfile: () => APIURL.get('/profile').then((res) => res.data),
    deleteAccount: () => APIURL.delete('/delete-account').then((res) => res.data),
    
    // 🔹 تعديل البيانات الشخصية
    updateProfile: (data: any) => APIURL.post('/update-profile', data).then((res) => res.data),
    
    // 🔹 تحديث الصورة الشخصية (مهم جداً إرسال multipart/form-data)
    updateAvatar: (formData: FormData) => 
        APIURL.post('/update-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => res.data),
};
import { useEffect, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

// استيراد الـ Hooks الخاصة بـ React Query (تأكد من تعديل المسار حسب مشروعك)
import {
    useForgotPassword,
    useVerifyResetOtp,
    useResetPassword,
} from "../hooks/useAuthQueries"; // عدّل المسار إذا لزم الأمر

const ForgotPassword = () => {
    const navigate = useNavigate();

    // حالات (States) النماذج
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // حالات التنقل بين الخطوات
    const [showVerification, setShowVerification] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    // حالات واجهة المستخدم
    const [error, setError] = useState("");
    const [direction, setDirection] = useState<"rtl" | "ltr">("ltr");
    const [passwordError, setPasswordError] = useState("");
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    // جلب دوال React Query
    const { mutate: forgotPassword, isPending: isForgotPending } = useForgotPassword();
    const { mutate: verifyOtp, isPending: isVerifyPending } = useVerifyResetOtp();
    const { mutate: resetPassword, isPending: isResetPending } = useResetPassword();

    // 1. معالجة إرسال البريد الإلكتروني
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        forgotPassword(
            { email },
            {
                onSuccess: (response: any) => {
                    toast.success(response?.data?.message || "تم إرسال رمز التحقق بنجاح");
                    setShowVerification(true);
                },
                onError: (err: any) => {
                    setError(err?.response?.data?.error || "حدث خطأ أثناء العملية.");
                }
            }
        );
    };

    // 2. معالجة التحقق من الرمز
    const handleVerifyCode = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        verifyOtp(
            { email, otp: verificationCode },
            {
                onSuccess: (response: any) => {
                    toast.success(response?.data?.message || "تم التحقق بنجاح");
                    setShowVerification(false);
                    setShowPasswordFields(true);
                },
                onError: (err: any) => {
                    setError(err?.response?.data?.error || "رمز التحقق غير صحيح أو منتهي الصلاحية.");
                }
            }
        );
    };

    // 3. معالجة إعادة إرسال الرمز
    const handleResendCode = () => {
        setError("");
        forgotPassword(
            { email },
            {
                onSuccess: (response: any) => {
                    toast.success(response?.data?.message || "تم إعادة إرسال الرمز بنجاح");
                },
                onError: (err: any) => {
                    setError(err?.response?.data?.error || "حدث خطأ أثناء إعادة إرسال الرمز.");
                }
            }
        );
    };

    // 4. معالجة إعادة تعيين كلمة المرور
    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setPasswordError("");

        if (newPassword !== confirmPassword) {
            setError("كلمة المرور غير متطابقة.");
            return;
        }

        if (!Object.values(passwordCriteria).every(Boolean)) {
            setPasswordError(
                "يجب أن تحتوي كلمة السر على ٨ أحرف على الأقل، حرف كبير واحد، حرف صغير واحد، رقم واحد، ورمز واحد."
            );
            return;
        }

        resetPassword(
            {
                email,
                otp: verificationCode,
                password: newPassword,
                password_confirmation: confirmPassword
            },
            {
                onSuccess: (response: any) => {
                    toast.success(response?.data?.message || "تم تغيير كلمة المرور بنجاح");
                    navigate("/home");
                },
                onError: (err: any) => {
                    setError(err?.response?.data?.error || "حدث خطأ أثناء إعادة تعيين كلمة المرور.");
                }
            }
        );
    };

    // دوال مساعدة
    const handlePast = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        toast.warning("لا يُسمح بلصق النص هنا.");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDirection(/[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr");
    };

    const validatePassword = (password: string) => {
        setPasswordCriteria({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*~\-_.]/.test(password),
        });
    };

    // إعدادات الأنيميشن والتصميم
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    const inputClasses = "w-full px-4 py-3 mt-2 mb-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B151A] text-2xl focus:border-[#8B151A] transition-all bg-[#f5f7f7]";
    const labelClasses = "block text-[#1A1A1A] font-bold text-2xl";
    const buttonClasses = "w-full py-3 bg-[#8B151A] text-white text-3xl font-bold rounded-lg hover:bg-[#6c1014] transition-colors disabled:opacity-70 disabled:cursor-not-allowed";
    useEffect(() => {
        if (showVerification === true) {
            // قفز ناعم (Smooth) لأعلى الصفحة
            window.scrollTo({
                top: 0,
                behavior: "smooth", // يجعل الحركة سلسة وليست قفزة مفاجئة
            });
        }
    }, [showVerification]);
    return (
        <div dir="rtl" className=" flex items-center justify-center bg-gray-50 p-4 py-30">
            <div className="w-full max-w-xl bg-white p-6 md:py-10 md:p-8 rounded-xl shadow-lg border-t-4 border-t-[#C5A059]">

                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <RiLockPasswordFill className="text-4xl text-[#8B151A]" />
                    <h2 className="text-3xl md:text-5xl font-bold text-[#8B151A]">نسيت كلمة المرور</h2>
                </div>

                <AnimatePresence mode="wait">
                    {/* الخطوة 1: إدخال البريد الإلكتروني */}
                    {!showVerification && !showPasswordFields && (
                        <motion.form
                            key="email-form"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
                                <label className={labelClasses}>البريد الإلكتروني:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        handleInputChange(e);
                                    }}
                                    style={{ direction }}
                                    required
                                    className={inputClasses}
                                    placeholder="أدخل بريدك الإلكتروني"
                                />
                            </div>
                            <button type="submit" disabled={isForgotPending} className={buttonClasses}>
                                {isForgotPending ? "جاري إرسال رمز التحقق..." : "إرسال الرمز"}
                            </button>
                        </motion.form>
                    )}

                    {/* الخطوة 2: التحقق من الرمز */}
                    {showVerification && !showPasswordFields && (
                        <motion.form
                            key="verification-form"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onSubmit={handleVerifyCode}
                        >
                            <div className="mb-4">
                                <label className={labelClasses}>رمز التحقق:</label>
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => {
                                        setVerificationCode(e.target.value);
                                        handleInputChange(e);
                                    }}
                                    style={{ direction }}
                                    required
                                    className={`${inputClasses} text-center tracking-[0.5em] text-2xl font-mono`}
                                    placeholder="-----"
                                    maxLength={6}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <button type="submit" disabled={isVerifyPending} className={buttonClasses}>
                                    {isVerifyPending ? "جاري التحقق..." : "تحقق"}
                                </button>
                                <button
                                    type="button"
                                    disabled={isForgotPending}
                                    onClick={handleResendCode}
                                    className="w-full py-3 bg-transparent border-2 border-[#C5A059] text-[#C5A059] text-3xl font-bold rounded-lg hover:bg-[#C5A059] hover:text-white transition-colors disabled:opacity-70"
                                >
                                    {isForgotPending ? "جاري إعادة إرسال الرمز..." : "إعادة إرسال الرمز"}
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {/* الخطوة 3: إعادة تعيين كلمة المرور */}
                    {showPasswordFields && (
                        <motion.form
                            key="reset-form"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onSubmit={handleResetPassword}
                        >
                            <div className="mb-4">
                                <label className={labelClasses}>كلمة المرور الجديدة:</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        validatePassword(e.target.value);
                                        handleInputChange(e);
                                    }}
                                    onPaste={handlePast}
                                    required
                                    style={{ direction }}
                                    className={inputClasses}
                                />

                                {/* شروط كلمة المرور */}
                                <ul className="mt-2 text-xl space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <li className={passwordCriteria.length ? "text-green-600 font-medium" : "text-[#8B151A]"}>
                                        {passwordCriteria.length ? "✓ تحتوي على 8 أحرف على الأقل." : "✗ يجب أن تحتوي على 8 أحرف على الأقل."}
                                    </li>
                                    <li className={passwordCriteria.uppercase ? "text-green-600 font-medium" : "text-[#8B151A]"}>
                                        {passwordCriteria.uppercase ? "✓ تحتوي على حرف كبير واحد." : "✗ يجب أن تحتوي على حرف كبير واحد."}
                                    </li>
                                    <li className={passwordCriteria.lowercase ? "text-green-600 font-medium" : "text-[#8B151A]"}>
                                        {passwordCriteria.lowercase ? "✓ تحتوي على حرف صغير واحد." : "✗ يجب أن تحتوي على حرف صغير واحد."}
                                    </li>
                                    <li className={passwordCriteria.number ? "text-green-600 font-medium" : "text-[#8B151A]"}>
                                        {passwordCriteria.number ? "✓ تحتوي على رقم واحد." : "✗ يجب أن تحتوي على رقم واحد."}
                                    </li>
                                    <li className={passwordCriteria.specialChar ? "text-green-600 font-medium" : "text-[#8B151A]"}>
                                        {passwordCriteria.specialChar ? "✓ تحتوي على رمز واحد (!@#$%^&*~-_.)." : "✗ يجب أن تحتوي على رمز واحد (!@#$%^&*~-_.)."}
                                    </li>
                                </ul>
                            </div>

                            {passwordError && (
                                <p className="text-[#8B151A] text-sm mb-4 font-bold">{passwordError}</p>
                            )}

                            <div className="mb-6">
                                <label className={labelClasses}>تأكيد كلمة المرور:</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        handleInputChange(e);
                                    }}
                                    onPaste={handlePast}
                                    required
                                    style={{ direction }}
                                    className={inputClasses}
                                />
                            </div>

                            <button type="submit" disabled={isResetPending} className={buttonClasses}>
                                {isResetPending ? "جاري إعادة تعيين كلمة المرور..." : "تأكيد كلمة المرور"}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* عرض الأخطاء العامة */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 p-3 bg-[#8B151A]/10 border border-[#8B151A] text-[#8B151A] rounded-lg text-center font-bold"
                    >
                        {error}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
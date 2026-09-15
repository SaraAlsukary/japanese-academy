import { useState } from "react";
import axios from "axios";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // استيراد Framer Motion
import { APIURL } from "../api/apiConfig";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingReset, setIsLoadingReset] = useState(false);

    const [direction, setDirection] = useState<"rtl" | "ltr">("ltr");
    const [passwordError, setPasswordError] = useState("");
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${APIURL}/forgot-password`, { email });
            setMessage(response.data.message);
            setShowVerification(true);
            setError("");
        } catch (err: any) {
            setError(err?.response?.data?.error || "حدث خطأ أثناء العملية.");
            setMessage("");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePast = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        toast.warning("لا يُسمح بلصق النص هنا.");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDirection(/[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr");
    };

    const handleResendCode = async () => {
        setIsLoadingReset(true);
        try {
            const response = await axios.post(`${APIURL}/resend-otp`, { email });
            setMessage(response.data.message);
            toast.success("تم إعادة إرسال الرمز بنجاح");
            setError("");
        } catch (err: any) {
            setError(err?.response?.data?.error || "حدث خطأ أثناء العملية.");
            setMessage("");
        } finally {
            setIsLoadingReset(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${APIURL}/verify-reset-otp`, {
                email,
                otp: verificationCode,
            });
            setMessage(response.data.message);
            setError("");
            setShowVerification(false);
            setShowPasswordFields(true);
        } catch (err: any) {
            setError(err?.response?.data?.error || "حدث خطأ أثناء التحقق.");
            setMessage("");
        } finally {
            setIsLoading(false);
        }
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

    const handleResetPassword = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("كلمة المرور غير متطابقة.");
            setIsLoading(false);
            return;
        }

        if (!Object.values(passwordCriteria).every(Boolean)) {
            setPasswordError(
                "يجب أن تحتوي كلمة السر على ٨ أحرف على الأقل، حرف كبير واحد، حرف صغير واحد، رقم واحد، ورمز واحد."
            );
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${APIURL}/reset-password`, {
                email,
                otp: verificationCode,
                password: newPassword,
                password_confirmation: confirmPassword,
            });
            toast.success("تم تغيير كلمة المرور بنجاح");
            setMessage(response.data.message);
            navigate("/");
            setError("");
        } catch (err: any) {
            setError(err?.response?.data?.error || "حدث خطأ أثناء إعادة تعيين كلمة المرور.");
            setMessage("");
        } finally {
            setIsLoading(false);
        }
    };

    // إعدادات الأنيميشن لـ Framer Motion
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    const inputClasses =
        "w-full px-4 py-3 mt-2 mb-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B151A] focus:border-[#8B151A] transition-all bg-[#f5f7f7]";
    const labelClasses = "block text-[#1A1A1A] font-bold text-lg";
    const buttonClasses =
        "w-full py-3 bg-[#8B151A] text-white text-xl font-bold rounded-lg hover:bg-[#6c1014] transition-colors disabled:opacity-70 disabled:cursor-not-allowed";

    return (
        <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-t-[#C5A059]">

                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <RiLockPasswordFill className="text-4xl text-[#8B151A]" />
                    <h2 className="text-3xl font-bold text-[#8B151A]">نسيت كلمة المرور</h2>
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
                            <button type="submit" disabled={isLoading} className={buttonClasses}>
                                {isLoading ? "جاري إرسال رمز التحقق..." : "إرسال الرمز"}
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
                                <button type="submit" disabled={isLoading} className={buttonClasses}>
                                    {isLoading ? "جاري التحقق..." : "تحقق"}
                                </button>
                                <button
                                    type="button"
                                    disabled={isLoadingReset}
                                    onClick={handleResendCode}
                                    className="w-full py-3 bg-transparent border-2 border-[#C5A059] text-[#C5A059] text-lg font-bold rounded-lg hover:bg-[#C5A059] hover:text-white transition-colors disabled:opacity-70"
                                >
                                    {isLoadingReset ? "جاري إعادة إرسال الرمز..." : "إعادة إرسال الرمز"}
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
                                <ul className="mt-2 text-sm space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
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

                            <button type="submit" disabled={isLoading} className={buttonClasses}>
                                {isLoading ? "جاري إعادة تعيين كلمة المرور..." : "تأكيد كلمة المرور"}
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
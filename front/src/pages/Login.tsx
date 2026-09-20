import React, { useState, useEffect, useRef } from "react"; // 1. أضف useRef هنا
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import LoginImg from "../assets/Login/snapedit_1739098994814-removebg-preview.png";
import { useLogin } from "../hooks/useAuthQueries";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export default function LoginUser() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [direction, setDirection] = useState<"rtl" | "ltr">("ltr");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  // 2. إنشاء مرجع لعنصر الخطأ
  const errorRef = useRef<HTMLParagraphElement>(null);

  // تحميل البيانات المحفوظة في localStorage عند بدء التشغيل
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  // 3. التمرير التلقائي لأعلى عند حدوث خطأ
  useEffect(() => {
    if (error && errorRef.current) {
      // نضع تأخير بسيط (setTimeout) لضمان أن الفريم ورك قام برسم (Render) عنصر الخطأ أولاً
      setTimeout(() => {
        errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [error]);

  const handleInputChange = (value: string) => {
    setDirection(/[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr");
  };

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // تصفير الخطأ عند المحاولة الجديدة

    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data: any) => {
          toast.success("تم تسجيل الدخول بنجاح");

          if (data?.token) {
            localStorage.setItem("token", data.token);
            if (setIsAuthenticated) setIsAuthenticated(true);
            queryClient.invalidateQueries(['profile'] as any);

            navigate('/home');
          }
          // 🌟 الأهم: تحديث السياق لتتغير أزرار النافبار فوراً 🌟
          if (rememberMe) {
            localStorage.setItem("savedEmail", email);
            localStorage.setItem("savedPassword", password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("savedEmail");
            localStorage.removeItem("savedPassword");
            localStorage.removeItem("rememberMe");
          }
        },
        onError: (err: any) => {
          const errorMsg =
            err?.response?.data?.message ||
            "البريد الإلكتروني أو كلمة المرور غير صحيحة";
          setError(errorMsg); // هذا سيقوم بتشغيل الـ useEffect الخاص بالتمرير
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-xl w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-brand-black"
      >
        <div className="text-center">
          {LoginImg && (
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              src={LoginImg}
              alt="Logo"
              className="h-30 mx-auto object-contain mb-2"
            />
          )}
          <h1 className="text-3xl font-extrabold text-brand-red">
            تسجيل الدخول
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ... حقول البريد الإلكتروني وكلمة المرور ... */}
          {/* (لقد تركتها كما هي لتقليل طول الكود المعروض هنا) */}
          <div className="space-y-2">
            <label className="block text-2xl font-bold text-brand-black text-right">
              البريد الإلكتروني:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange(e.target.value);
              }}
              required
              style={{ direction }}
              placeholder="example@mail.com"
              className="w-full h-12 px-4 text-xl rounded-xl border border-gray-300 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-2xl font-bold text-brand-black text-right">
              كلمة المرور:
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ direction }}
                placeholder="••••••••"
                className="w-full h-12 px-4 text-xl rounded-xl border border-gray-300 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-black"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-red focus:outline-none p-1 transition-colors"
              >
                {passwordVisible ? <FaEyeSlash size={20} /> : <IoEyeSharp size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-brand-black select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red accent-brand-red cursor-pointer"
              />
              <span className="text-xl">حفظ البريد الإلكتروني وكلمة المرور</span>
            </label>
          </div>

          {/* رسالة الخطأ */}
          <AnimatePresence>
            {error && (
              <motion.p
                ref={errorRef} // 4. ربط المرجع بعنصر الخطأ هنا
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-red-600 font-bold text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full h-12 cursor-pointer bg-brand-red hover:bg-[#731216] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-2xl"
          >
            {loginMutation.isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                جارٍ تسجيل الدخول...
              </span>
            ) : (
              "تسجيل الدخول"
            )}
          </motion.button>

          <div className="text-center pt-1">
            <Link
              to="/home/Reset_Password"
              className="text-xl font-bold text-brand-black hover:text-brand-gold transition-colors inline-block"
            >
              هل نسيت كلمة المرور؟
            </Link>
          </div>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-xl font-bold text-gray-400 absolute">
              أو
            </span>
          </div>

          <div className="text-center">
            <Link to="/home/Register_account">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full cursor-pointer h-12 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-bold rounded-xl transition-all duration-200 text-2xl"
              >
                إنشاء حساب جديد
              </motion.button>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
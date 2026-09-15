import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import LoginImg from "../assets/Login/snapedit_1739098994814-removebg-preview.png";
import {APIURL} from "../api/apiConfig";
import { useAuth } from "../hooks/useAuth";

export default function LoginUser() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [direction, setDirection] = useState<"rtl" | "ltr">("ltr");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();

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

  const handleInputChange = (value: string) => {
    setDirection(/[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${APIURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok && data.token) {
        toast.success("تم تسجيل الدخول بنجاح");

        login(data.token, data.user.role, data.user.id);
        localStorage.setItem("token", data.token);

        if (rememberMe) {
          localStorage.setItem("savedEmail", email);
          localStorage.setItem("savedPassword", password);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("savedEmail");
          localStorage.removeItem("savedPassword");
          localStorage.removeItem("rememberMe");
        }

        navigate("/");
      } else {
        setError(data.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error:", err);
      setError("حدث خطأ في الاتصال بالخادم. الرجاء المحاولة لاحقًا.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-xl w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-brand-black"
      >
        {/* الشعار والحافز البصري */}
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
          {/* حقل البريد الإلكتروني */}
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
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-black"
            />
          </div>

          {/* حقل كلمة المرور */}
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
                className="w-full h-12 pr-4 pl-11 rounded-xl border border-gray-300 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all text-brand-black"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-red focus:outline-none p-1 transition-colors"
              >
                {passwordVisible ? <FaEyeSlash size={20} /> : <IoEyeSharp size={20} />}
              </button>
            </div>
          </div>

          {/* تذكرني */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-brand-black select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 rounded border-gray-300 text-brand-red focus:ring-brand-red accent-brand-red cursor-pointer"
              />
              <span>حفظ البريد الإلكتروني وكلمة المرور</span>
            </label>
          </div>

          {/* رسالة الخطأ */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-red-600 font-bold text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* زر تسجيل الدخول */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-brand-red hover:bg-[#731216] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-2xl"
          >
            {isLoading ? (
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

          {/* رابط نسيت كلمة المرور */}
          <div className="text-center pt-1">
            <Link
              to="/home/Reset_Password"
              className="text-xl font-bold text-brand-black hover:text-brand-gold transition-colors inline-block"
            >
              هل نسيت كلمة المرور؟
            </Link>
          </div>

          {/* فاصل */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-xl font-bold text-gray-400 absolute">
              أو
            </span>
          </div>

          {/* زر إنشاء حساب جديد */}
          <div className="text-center">
            <Link to="/home/Register_account">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full h-12 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-bold rounded-xl transition-all duration-200 text-2xl"
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
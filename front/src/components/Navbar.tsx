import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { FaHome, FaCommentAlt, FaQuestionCircle } from "react-icons/fa";
import { MdLibraryBooks, MdDashboard } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { FaBook, FaUserGroup, FaMicrophoneLines } from "react-icons/fa6";
import { GrMoreVertical } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";

// Hooks & Context
import { useLogout } from '../hooks/useAuthQueries';
import { useAuth } from "../context/AuthContext"; 
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const logout = useLogout();

  // --- دالة موحدة لتسجيل الخروج ---
  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem('token');
        
        // تحديث حالة التطبيق فوراً لتتغير الأزرار
        if (setIsAuthenticated) setIsAuthenticated(false);
        
        // تنظيف الكاش الخاص بـ React Query
        queryClient.clear();

        toast.success("تم تسجيل الخروج بنجاح");
        navigate('/home');
        setIsOpen(false); // إغلاق القائمة في الموبايل
      },
      onError: () => {
        toast.error("حدث خطأ أثناء تسجيل الخروج");
      }
    });
  };

  // --- مكون مخصص للأزرار الأساسية (حمراء) ---
  const RedNavButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center px-4 py-2 m-1 min-[330px]:w-20 md:w-32 xl:w-44 text-sm md:text-base xl:text-xl font-bold text-white bg-brand-red border-2 border-brand-red rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-brand-red hover:shadow-md"
    >
      {children}
    </button>
  );

  // --- مكون مخصص لأزرار الإطار (شفافة/حد أحمر) مخصصة لتسجيل الخروج ---
  const OutlineNavButton = ({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative flex items-center justify-center px-4 py-2 m-1 min-[330px]:w-20 md:w-32 xl:w-44 text-sm md:text-base xl:text-xl font-bold text-brand-red border-2 border-brand-red bg-white rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-brand-red hover:text-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );

  // --- مكون داخلي لروابط الأقسام ---
  const NavLinkItem = ({ to, icon: Icon, text }: { to: string; icon: any; text: string }) => (
    <li className="w-full xl:w-auto xl:border-none border-b border-gray-300 py-2.5 xl:py-0">
      <Link
        to={to}
        className="flex items-center text-right xl:text-center text-lg xl:text-2xl font-bold text-brand-black hover:text-brand-gold transition-colors w-full px-3"
      >
        <Icon className="mx-2 text-brand-red text-xl xl:text-2xl" />
        {text}
      </Link>
    </li>
  );

  return (
    <nav dir="rtl" className="max-w-full mx-auto px-3 xl:px-[90px] py-3 flex flex-wrap items-center justify-between">

      {/* 1. زر القائمة للموبايل */}
      <button
        className="xl:hidden flex items-center justify-center w-10 h-10 relative focus:outline-none ml-1 cursor-pointer order-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <div className="relative w-8 h-[3px]">
          <span className={`absolute left-0 w-full h-full bg-brand-red rounded-full transition-all duration-300 ${isOpen ? "bg-transparent" : "top-0"}`}></span>
          <span className={`absolute left-0 w-full h-full bg-brand-red rounded-full transition-all duration-300 ${isOpen ? "rotate-45 top-0" : "-top-2.5"}`}></span>
          <span className={`absolute left-0 w-full h-full bg-brand-red rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 top-0" : "top-2.5"}`}></span>
        </div>
      </button>

      {/* 2. أزرار التحكم - الموبايل */}
      <div className="flex xl:hidden items-center justify-center w-auto min-[330px]:w-[200px] order-2">
        {isAuthenticated ? (
          <div className="flex gap-1">
            <Link to="user-panel">
              <RedNavButton>لوحة التحكم</RedNavButton>
            </Link>
            <OutlineNavButton onClick={handleLogout} disabled={logout.isPending}>
              <BiLogOut className="ml-1 text-2xl" />
              {logout.isPending ? "جاري..." : "خروج"}
            </OutlineNavButton>
          </div>
        ) : (
          <div className="flex gap-1">
            <Link to="/home/Login_users"><RedNavButton>دخول</RedNavButton></Link>
            <Link to="/home/Register_account"><RedNavButton>تسجيل</RedNavButton></Link>
          </div>
        )}
      </div>

      {/* 3. الشعار */}
      <Link to="/home" className="cursor-default order-3 xl:order-3">
        <img
          src={'/logo.png'}
          alt="الشعار"
          className="w-14 min-[330px]:w-16 md:w-40 xl:w-40 bg-white rounded-full mt-1 xl:mt-0 shadow-sm"
        />
      </Link>

      {/* 4. القائمة المنسدلة والروابط */}
      <div
        className={`w-full xl:w-auto xl:flex-1 xl:flex xl:items-center xl:justify-between overflow-hidden transition-all duration-500 ease-in-out order-4 xl:order-2 ${isOpen
          ? "max-h-[800px] opacity-100 mt-4"
          : "max-h-0 opacity-0 xl:max-h-none xl:opacity-100 xl:mt-0"
          }`}
      >
        {/* أزرار التحكم - سطح المكتب */}
        <div className="hidden xl:flex items-center justify-end ml-4">
          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link to="/home/user-panel">
                <RedNavButton>
                  <MdDashboard className="ml-1 text-2xl" />
                  لوحة التحكم
                </RedNavButton>
              </Link>
              <OutlineNavButton onClick={handleLogout} disabled={logout.isPending}>
                <BiLogOut className="ml-1 text-2xl" />
                {logout.isPending ? "جاري الخروج..." : "تسجيل الخروج"}
              </OutlineNavButton>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/home/Register_account"><RedNavButton>سجل الآن</RedNavButton></Link>
              <Link to="/home/Login_users"><RedNavButton>تسجيل الدخول</RedNavButton></Link>
            </div>
          )}
        </div>

        {/* روابط الأقسام */}
        <ul className="flex flex-col xl:flex-row xl:flex-wrap items-center justify-center xl:gap-6 w-full bg-gray-50 xl:bg-transparent mt-3 xl:mt-0 p-2 xl:p-0 rounded-lg xl:rounded-none">
          <div className="flex flex-col xl:flex-row flex-wrap items-center justify-center text-center w-full xl:w-auto xl:gap-0">
            <NavLinkItem to="/home" icon={FaHome} text="الصفحة الرئيسية" />
            <NavLinkItem to="Teachers" icon={FaUserGroup} text="الهيئة التدريسية" />
            <NavLinkItem to="Levels" icon={MdLibraryBooks} text="المستويات الدراسية" />
            <NavLinkItem to="Subjects" icon={FaBook} text="المواد الدراسية" />
          </div>

          <div className="flex flex-col xl:flex-row flex-wrap items-center justify-center text-center w-full xl:w-auto xl:gap-0">
            <NavLinkItem to="Fees" icon={BsCashCoin} text="الرسوم الدراسية" />
            <NavLinkItem to="Questions" icon={FaQuestionCircle} text="الأسئلة الشائعة" />
            <NavLinkItem to="Comments" icon={FaCommentAlt} text="آراء الطلاب" />
            <NavLinkItem to="More_services" icon={GrMoreVertical} text="خدمات إضافية" />
            <NavLinkItem to="Support" icon={FaMicrophoneLines} text="الدعم الفني" />
          </div>
        </ul>
      </div>
    </nav>
  );
}
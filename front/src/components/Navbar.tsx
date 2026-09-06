import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { FaHome, FaCommentAlt, FaQuestionCircle } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { FaBook, FaUserGroup, FaMicrophoneLines } from "react-icons/fa6";
import { GrMoreVertical } from "react-icons/gr";

// --- تم تعليق الاستيرادات الخاصة بالصلاحيات ---
// import { useNavigate } from "react-router-dom";
// import APIURL from "../../api/constants";
// import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // --- تم تعليق كل ما يخص حالة تسجيل الدخول ---
  /*
  const [role, setRole] = useState(localStorage.getItem("userRole"));
  const [error, setError] = useState<null | string>(null);
  const Navigate = useNavigate();
  const auth = useAuth();

  const fetchUserData = async () => { ... }
  useEffect(() => { ... }, []);
  const handleLogout = () => { ... }
  */

  // --- مكون مخصص لأزرار الدخول والتسجيل باللون الأحمر للهوية البصرية ---
  const RedNavButton = ({ children }: { children: React.ReactNode }) => (
    <button
      className="relative flex items-center justify-center px-4 py-2 m-1 min-[330px]:w-28 md:w-32 xl:w-44 text-sm md:text-base xl:text-xl font-bold text-white bg-brand-red border-2 border-brand-red rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-brand-red hover:shadow-md"
    >
      {children}
    </button>
  );

  // --- مكون داخلي لروابط الأقسام (تم تكبير النصوص والأيقونات) ---
  const NavLinkItem = ({ to, icon: Icon, text }: { to: string; icon: any; text: string }) => (
    <li className="w-full xl:w-auto xl:border-none border-b border-gray-300 py-2.5 xl:py-0">
      <Link
        to={to}
        className="flex items-center text-right xl:text-center text-lg xl:text-xl font-bold text-brand-black hover:text-brand-gold transition-colors w-full px-3"
      >
        <Icon className="mx-2 text-brand-red text-xl xl:text-2xl" />
        {text}
      </Link>
    </li>
  );

  return (
    <nav dir="rtl" className="max-w-full mx-auto px-3 xl:px-[90px] py-3 flex flex-wrap items-center justify-between">
      {/* 1. الشعار (Logo) - تم تكبيره قليلاً ليتناسب مع النصوص */}
      {/* 3. زر التبديل (Hamburger Menu) - تم تكبيره للموبايل */}
      <button
        className="xl:hidden flex items-center justify-center w-10 h-10 relative focus:outline-none ml-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <div className="relative w-8 h-[3px]">
          <span className={`absolute left-0 w-full h-full bg-brand-red rounded-full transition-all duration-300 ${isOpen ? "bg-transparent" : "top-0"}`}></span>
          <span className={`absolute left-0 w-full h-full bg-brand-red rounded-full transition-all duration-300 ${isOpen ? "rotate-45 top-0" : "-top-2.5"}`}></span>
          <span className={`absolute left-0 w-full h-full bg-brand-red rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 top-0" : "top-2.5"}`}></span>
        </div>
      </button>

      {/* 2. أزرار التحكم - نسخة الجوال */}
      <div className="flex xl:hidden items-center justify-end w-auto min-[330px]:w-[265px]">
        {/* أزرار التسجيل والدخول مفعلة */}
        <div className="flex gap-1">
          <Link to="/Login_users"><RedNavButton>دخول</RedNavButton></Link>
          <Link to="/Register_account"><RedNavButton>تسجيل</RedNavButton></Link>
        </div>

        {/* الأزرار التي تحتاج تسجيل دخول (معلقة) */}
        {/*
          <div className="flex items-center gap-1">
             ... أزرار لوحة التحكم وتسجيل الخروج ...
          </div>
        */}
      </div>



      {/* 4. القائمة المنسدلة (الروابط والأزرار للشاشات الكبيرة) */}
      <div
        className={`w-full xl:w-auto xl:flex-1 xl:flex xl:items-center xl:justify-between overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[800px] opacity-100 mt-4 block" : "max-h-0 opacity-0 xl:max-h-none xl:opacity-100 xl:mt-0 hidden xl:flex"
          }`}
      >
        {/* أزرار التحكم - نسخة سطح المكتب */}
        <div className="hidden xl:flex items-center justify-end ml-4">

          {/* أزرار التسجيل والدخول مفعلة */}

          <div className=" flex flex-col gap-3">
            <Link to="/Register_account"><RedNavButton>سجل الآن</RedNavButton></Link>
            <Link to="/Login_users"><RedNavButton>تسجيل الدخول</RedNavButton></Link>
          </div>
          {/* الأزرار التي تحتاج تسجيل دخول (معلقة) */}
          {/*
            <div className="flex items-center gap-2">
               ... أزرار لوحة التحكم وتسجيل الخروج ...
            </div>
          */}
        </div>

        {/* روابط الأقسام - تم زيادة المسافات (gap) وتكبير الخط */}
        <ul className="flex flex-col xl:flex-row xl:flex-wrap items-center justify-center xl:gap-6 w-full bg-gray-50 xl:bg-transparent mt-3 xl:mt-0 p-2 xl:p-0 rounded-lg xl:rounded-none">
          <div className="flex flex-col xl:flex-row flex-wrap items-center justify-center text-center w-full xl:w-auto xl:gap-4">
            <NavLinkItem to="/" icon={FaHome} text="الصفحة الرئيسية" />
            <NavLinkItem to="/Teachers" icon={FaUserGroup} text="الهيئة التدريسية" />
            <NavLinkItem to="/Level_division" icon={MdLibraryBooks} text="المستويات الدراسية" />
            <NavLinkItem to="/Study_materials" icon={FaBook} text="المواد الدراسية" />
          </div>

          <div className="flex flex-col xl:flex-row flex-wrap items-center justify-center text-center w-full xl:w-auto xl:gap-4">
            <NavLinkItem to="/Fees" icon={BsCashCoin} text="الرسوم الدراسية" />
            <NavLinkItem to="/Questions" icon={FaQuestionCircle} text="الأسئلة الشائعة" />
            <NavLinkItem to="/Comments" icon={FaCommentAlt} text="آراء الطلاب" />
            <NavLinkItem to="/More_services" icon={GrMoreVertical} text="خدمات إضافية" />
            <NavLinkItem to="/Support" icon={FaMicrophoneLines} text="الدعم الفني" />
          </div>
        </ul>

      </div>
      <Link to="/" className="cursor-default">
        <img
          src={'/logo.png'}
          alt="الشعار"
          className="w-14 min-[330px]:w-16 md:w-40 xl:w-40 bg-white rounded-full mt-1 xl:mt-0 shadow-sm"
        />
      </Link>
    </nav>
  );
}
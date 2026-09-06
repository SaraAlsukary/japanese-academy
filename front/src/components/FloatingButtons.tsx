import  { useState, useEffect } from "react";
import { FaChevronUp, FaWhatsapp, FaEnvelope, FaComment, FaTimes } from "react-icons/fa";

export default function FloatingButtons() {
  const [showUp, setShowUp] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false); // حالة لفتح وإغلاق أزرار السوشال ميديا
  
  // إظهار وإخفاء زر الصعود حسب التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowUp(true);
      } else {
        setShowUp(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. زر الصعود للأعلى (Up Button) */}
      <button
        onClick={scrollToTop}
        aria-label="الصعود للأعلى"
        className={`fixed z-50 bottom-[15vh] border-2 border-brand-gold bg-brand-red text-white p-3 rounded-full cursor-pointer shadow-2xl transition-all duration-500 hover:scale-110 hover:bg-red-900 animate-bounce ${
          showUp ? "left-5 opacity-100" : "-left-16 opacity-0"
        }`}
      >
        <FaChevronUp className="text-xl md:text-2xl" />
      </button>

      {/* 2. قائمة السوشال ميديا (Social Media Menu) */}
      <div className="fixed z-50 bottom-[8vh] right-4 flex flex-col-reverse items-center gap-3">
        
        {/* الزر الرئيسي (أيقونة الرسالة / الإغلاق) */}
        <button
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          aria-label="تواصل معنا"
          className="p-4 rounded-full bg-brand-black border-2 border-brand-gold text-brand-gold shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 z-10 flex items-center justify-center"
        >
          {/* تغيير الأيقونة بين الرسالة وعلامة الإغلاق (X) */}
          {isSocialOpen ? (
            <FaTimes className="text-2xl md:text-3xl text-brand-red transition-transform duration-300 rotate-90" />
          ) : (
            <FaComment className="text-2xl md:text-3xl transition-transform duration-300" />
          )}
        </button>

        {/* الأزرار الفرعية (تظهر فقط عند الضغط على الزر الرئيسي) */}
        <div
          className={`flex flex-col gap-3 transition-all duration-500 origin-bottom ${
            isSocialOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-50 pointer-events-none"
          }`}
        >
          {/* زر واتساب */}
          <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noreferrer"
            aria-label="واتساب"
            className="p-3.5 rounded-full bg-brand-red border-2 border-brand-gold text-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-red-900 flex items-center justify-center"
          >
            <FaWhatsapp className="text-2xl" />
          </a>

          {/* زر البريد الإلكتروني */}
          <a
            href="mailto:info@academy.com"
            aria-label="البريد الإلكتروني"
            className="p-3.5 rounded-full bg-brand-red border-2 border-brand-gold text-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-red-900 flex items-center justify-center"
          >
            <FaEnvelope className="text-2xl" />
          </a>
        </div>

      </div>
    </>
  );
}
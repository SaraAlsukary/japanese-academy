import { useState } from "react";
import { CgScreen } from "react-icons/cg";
import { FaMobileAlt } from "react-icons/fa";

export default function DesktopViewButton() {
  const [desktopView, setDesktopView] = useState(false);

  // Function to request desktop site view
  const requestDesktopSite = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/(iphone|ipod|ipad|android)/)) {
      const viewport = document.querySelector("meta[name=viewport]");
      if (viewport) {
        if (desktopView) {
          // Reset to default mobile viewport
          viewport.setAttribute(
            "content",
            "width=device-width, initial-scale=1"
          );
        } else {
          // Set to desktop viewport
          viewport.setAttribute("content", "width=1250");
        }
      }
    }
    setDesktopView(!desktopView);
  };

  return (
    <button
      onClick={requestDesktopSite}
      className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs md:text-sm text-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-white/20 ${
        desktopView
          ? "bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800"
          : "bg-gradient-to-r from-[#48b24b] to-[#0d5a25] hover:from-[#3ea241] hover:to-[#0a471d]"
      }`}
      title={desktopView ? "التحويل لعرض الجوال" : "التحويل لعرض الكمبيوتر"}
    >
      {/* دائرة الأيقونة المتفاعلة */}
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
        {desktopView ? (
          <FaMobileAlt className="text-sm text-white" />
        ) : (
          <CgScreen className="text-base text-white" />
        )}
      </div>

      {/* نص الزر الديناميكي */}
      <span className="tracking-wide">
        {desktopView ? "عرض الجوال" : "عرض الكمبيوتر"}
      </span>
    </button>
  );
}
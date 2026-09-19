import React from "react";
// import { User, BookOpen, TrendingUp, CalendarDays } from "lucide-react";
import { User, } from "lucide-react";

export type TabType = "profile" | "courses" | "progress" | "schedule";

interface TabsNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  coursesCount: number;
}

export const TabsNavigation: React.FC<TabsNavigationProps> = ({
  activeTab,
  setActiveTab,
  // coursesCount,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 no-scrollbar">
      <TabButton
        id="profile"
        activeTab={activeTab}
        onClick={() => setActiveTab("profile")}
        icon={<User className="w-4 h-4" />}
        label="الملف الشخصي"
      />
      {/* <TabButton
        id="courses"
        activeTab={activeTab}
        onClick={() => setActiveTab("courses")}
        icon={<BookOpen className="w-4 h-4" />}
        label="المستويات والاشتراكات"
        badge={coursesCount}
      />
      <TabButton
        id="progress"
        activeTab={activeTab}
        onClick={() => setActiveTab("progress")}
        icon={<TrendingUp className="w-4 h-4" />}
        label="تقدم الطالب والإنجازات"
      />
      <TabButton
        id="schedule"
        activeTab={activeTab}
        onClick={() => setActiveTab("schedule")}
        icon={<CalendarDays className="w-4 h-4" />}
        label="جدول الدروس المباشرة"
        badge="مباشر"
      /> */}
    </div>
  );
};

function TabButton({
  id,
  activeTab,
  onClick,
  icon,
  label,
  badge,
}: {
  id: TabType;
  activeTab: TabType;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
}) {
  const isActive = activeTab === id;

  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-xl font-bold text-xl flex items-center gap-2 transition-all whitespace-nowrap relative ${isActive
          ? "bg-brand-red text-white shadow-md shadow-red-900/10"
          : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200/80"
        }`}
    >
      {icon}
      <span>{label}</span>
      {badge !== undefined && (
        <span
          className={`text-xl px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-white text-brand-red" : "bg-red-100 text-brand-red"
            }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
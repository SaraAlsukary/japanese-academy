import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

// الهوكات
import {
  useProfile,
  useDeleteAccount,
  useUpdateProfile,
  useUpdateAvatar,
} from "../hooks/useAuthQueries";

// الأنواع والبيانات
import type { StudentDashboardData, UserData } from "../types/dashboard";

// المكونات المفككة
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { TabsNavigation, type TabType } from "../components/dashboard/TabsNavigation";
import { ProfileTab } from "../components/dashboard/tabs/ProfileTab";
// import { CoursesTab } from "../components/dashboard/tabs/CoursesTab";
// import { ProgressTab } from "../components/dashboard/tabs/ProgressTab";
// import { ScheduleTab } from "../components/dashboard/tabs/ScheduleTab";
import { EditProfileModal } from "../components/dashboard/modals/EditProfileModal";
import { DeleteAccountModal } from "../components/dashboard/modals/DeleteAccountModal";

const mockStudentData: StudentDashboardData = {
  currentLevel: "المستوى المتوسط (N3)",
  overallProgress: 68,
  completedLessons: 24,
  totalLessons: 35,
  attendanceRate: "95%",
  avgQuizScore: "92%",
  studyHours: "48 ساعة",
  enrolledLevels: [
    {
      id: "jlpt-n4",
      title: "دورة اللغة اليابانية - المستوى الأساسي (JLPT N4)",
      instructor: "أ. سينسي تاناكا",
      progress: 100,
      status: "مكتمل",
      lessonsCount: "30 درس",
      badgeColor: "bg-emerald-500",
    },
    {
      id: "jlpt-n3",
      title: "دورة اللغة اليابانية - المستوى المتوسط (JLPT N3)",
      instructor: "أ. كينجي ساتو",
      progress: 68,
      status: "نشط حالياً",
      lessonsCount: "35 درس",
      badgeColor: "bg-brand-red",
    },
    {
      id: "kanji-mastery",
      title: "دورة إتقان الكانجي (Kanji N3 & N2)",
      instructor: "أ. مريم العلي",
      progress: 40,
      status: "نشط حالياً",
      lessonsCount: "20 درس",
      badgeColor: "bg-brand-gold",
    },
  ],
  skillsBreakdown: [
    { skill: "القواعد (Grammar)", progress: 80 },
    { skill: "مفردات الكانجي (Kanji & Vocab)", progress: 65 },
    { skill: "الاستماع (Listening)", progress: 75 },
    { skill: "القراءة والمحادثة (Reading & Speaking)", progress: 55 },
  ],
  upcomingSchedule: [
    {
      id: 1,
      title: "جلسة محادثة مباشرة: تطبيقات N3",
      date: "اليوم - 2026/09/20",
      time: "07:00 مساءً (توقيت مكة)",
      instructor: "أ. كينجي ساتو",
      status: "قريب جداً",
      isLiveSoon: true,
    },
    {
      id: 2,
      title: "شرح كتاب قواعد الكانجي - الدرس 12",
      date: "الثلاثاء - 2026/09/22",
      time: "08:30 مساءً (توقيت مكة)",
      instructor: "أ. مريم العلي",
      status: "مجدول",
      isLiveSoon: false,
    },
    {
      id: 3,
      title: "مراجعة شاملة لاختبار JLPT N3 التجريبي",
      date: "الجمعة - 2026/09/25",
      time: "06:00 مساءً (توقيت مكة)",
      instructor: "أ. سينسي تاناكا",
      status: "مجدول",
      isLiveSoon: false,
    },
  ],
};

export default function UserDashboard() {
  const navigate = useNavigate();

  // الهوكات
  const { data: userData, isLoading, isError } = useProfile();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { mutate: updateAvatar, isPending: isUpdatingAvatar } = useUpdateAvatar();

  // الحالات
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // معالجات الأحداث
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    updateAvatar(formData);
  };

  const handleSaveProfile = (updatedData: Partial<UserData>) => {
    updateProfile(updatedData, {
      onSuccess: () => setIsEditModalOpen(false),
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        localStorage.removeItem("token");
        navigate("/home");
      },
    });
  };

  if (isLoading) {
    return (
      <div dir="rtl" className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-100 text-gray-800">
        <Loader2 className="w-12 h-12 text-brand-red animate-spin mb-4" />
        <p className="text-gray-600 font-medium text-lg">جارٍ تحميل بيانات الحساب...</p>
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div dir="rtl" className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-100 text-gray-800">
        <p className="text-red-600 font-medium text-lg mb-4">فشل في تحميل بيانات الملف الشخصي</p>
        <button
          onClick={() => navigate("/Login_users")}
          className="px-5 py-2.5 bg-brand-red text-white rounded-xl hover:bg-brand-red/90 transition-colors shadow-md font-medium"
        >
          العودة لصفحة التسجيل
        </button>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 text-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* الهيدر الرئيسي */}
        <DashboardHeader
          userData={userData}
          currentLevel={mockStudentData.currentLevel}
          isUpdatingAvatar={isUpdatingAvatar}
          onAvatarChange={handleAvatarChange}
          onOpenEditModal={() => setIsEditModalOpen(true)}
        />

        {/* شريط التبويبات */}
        <TabsNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          coursesCount={mockStudentData.enrolledLevels.length}
        />

        {/* محتوى التبويبات */}
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <ProfileTab
              userData={userData}
              onStartPlacementTest={() => navigate('/home/test')}
              onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
            />
          )}

          {/* {activeTab === "courses" && <CoursesTab data={mockStudentData} />}

          {activeTab === "progress" && <ProgressTab data={mockStudentData} />}

          {activeTab === "schedule" && <ScheduleTab data={mockStudentData} />} */}
        </AnimatePresence>

      </div>

      {/* النوافذ المنبثقة */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        userData={userData}
        isUpdating={isUpdatingProfile}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
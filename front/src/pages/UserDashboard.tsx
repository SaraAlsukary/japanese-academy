import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  User,
  Mail,
  Globe,
  Calendar,
  Users,
  GraduationCap,
  Languages,
  Phone,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";
// 1. استيراد هوك جلب البيانات من React Query
import { useProfile } from "../hooks/useAuthQueries"; // تأكد من ضبط المسار حسب مشروعك

// متغيرا التحريك لـ Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function UserDashboard() {
  const navigate = useNavigate();

  // 2. استخدام useProfile بدلاً من useEffect و fetch اليدوي
  const { data: userData, isLoading, isError } = useProfile();

  // التعامل مع حالة التحميل
  if (isLoading) {
    return (
      <div dir="rtl" className="min-h-[70vh] flex flex-col items-center justify-center bg-[#1A1A1A] text-white">
        <Loader2 className="w-12 h-12 text-[#C5A059] animate-spin mb-4" />
        <p className="text-gray-400 font-medium text-lg">جارٍ تحميل بيانات الحساب...</p>
      </div>
    );
  }

  // التعامل مع حدوث خطأ أو عدم وجود بيانات
  if (isError || !userData) {
    return (
      <div dir="rtl" className="min-h-[70vh] flex flex-col items-center justify-center bg-[#1A1A1A] text-white">
        <p className="text-red-400 font-medium text-lg mb-4">فشل في تحميل بيانات الملف الشخصي</p>
        <button
          onClick={() => navigate("/Login_users")}
          className="px-4 py-2 bg-[#8B151A] text-white rounded-lg hover:bg-[#8B151A]/80 transition-colors"
        >
          العودة لصفحة التسجيل
        </button>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#1A1A1A] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Banner - كارت الترحيب الرئيسي */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#8B151A] via-[#1A1A1A] to-[#1A1A1A] border border-[#C5A059]/30 p-6 sm:p-8 shadow-2xl"
        >
          {/* تعديل مكان التأثير الضوئي ليكون على اليمين */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* الصورة الرمزية / Avatar */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#8B151A] border-2 border-[#C5A059] flex items-center justify-center text-3xl font-bold text-[#C5A059] shadow-lg">
                {userData.first_name?.[0]?.toUpperCase()}
                {userData.last_name?.[0]?.toUpperCase()}
              </div>
              {/* تعديل مكان النقطة الخضراء لتكون على اليسار بدلاً من اليمين لتناسب الشاشة العربية */}
              <span className="absolute bottom-1 left-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#1A1A1A]" />
            </div>

            {/* نصوص الترحيب */}
            <div className="text-center sm:text-right space-y-2 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[#C5A059] text-xl font-semibold tracking-wide uppercase flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> طالب في الأكاديمية
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white">
                مرحباً بك، <span className="text-[#C5A059]">{userData.first_name} {userData.last_name}</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-xl flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                حساب مفعل وجاهز للتعلم
              </p>
            </div>
          </div>
        </motion.div>

        {/* شبكة البطاقات تفاعلية - Grid Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* قسم البيانات الشخصية */}
          <motion.div variants={cardVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-[#C5A059] flex items-center gap-2 border-b border-[#C5A059]/20 pb-2">
              <User className="w-5 h-5 text-[#8B151A]" />
              المعلومات الشخصية
            </h2>

            <div className="bg-[#222222] border border-gray-800 rounded-xl p-5 space-y-4 hover:border-[#C5A059]/40 transition-colors">
              <InfoRow icon={<Mail className="w-5 h-5 text-[#C5A059]" />} label="البريد الإلكتروني" value={userData.email} />
              <InfoRow icon={<Phone className="w-5 h-5 text-[#C5A059]" />} label="رقم الهاتف" value={userData.phone || "غير محدد"} />
              <InfoRow icon={<Globe className="w-5 h-5 text-[#C5A059]" />} label="الدولة" value={userData.country || "غير محدد"} />
              <InfoRow icon={<Calendar className="w-5 h-5 text-[#C5A059]" />} label="العمر" value={userData.age ? `${userData.age} سنة` : "غير محدد"} />
              <InfoRow icon={<Users className="w-5 h-5 text-[#C5A059]" />} label="الجنس" value={userData.gender || "غير محدد"} />
            </div>
          </motion.div>

          {/* قسم البيانات الأكاديمية واللغة */}
          <motion.div variants={cardVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-[#C5A059] flex items-center gap-2 border-b border-[#C5A059]/20 pb-2">
              <GraduationCap className="w-5 h-5 text-[#8B151A]" />
              المستوى التعليمي واللغوي
            </h2>

            <div className="bg-[#222222] border border-gray-800 rounded-xl p-5 space-y-4 hover:border-[#C5A059]/40 transition-colors">
              <InfoRow icon={<GraduationCap className="w-5 h-5 text-[#C5A059]" />} label="المستوى التعليمي" value={userData.education_level || "غير محدد"} />
              <InfoRow icon={<Languages className="w-5 h-5 text-[#C5A059]" />} label="مستوى اللغة اليابانية" value={userData.japanese_level || "غير محدد"} highlight />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

// مكون فرعي لصف البيانات (Reusable Row)
function InfoRow({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A1A]/60 hover:bg-[#1A1A1A] transition-colors border border-gray-800/50">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-gray-400 text-xl md:text-2xl font-medium">{label}</span>
      </div>
      <span
        className={`font-semibold text-xl ltr md:text-2xl ${
          highlight
            ? "text-[#C5A059] bg-[#8B151A]/20 px-3 py-1 rounded-full border border-[#8B151A]/40"
            : "text-gray-200"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
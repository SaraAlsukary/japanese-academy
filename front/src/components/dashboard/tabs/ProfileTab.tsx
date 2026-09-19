import React from "react";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    Globe,
    Calendar,
    Users,
    GraduationCap,
    Languages,
    AlertTriangle,
    Trash2,
    ClipboardCheck,
    Sparkles,
} from "lucide-react";
import type { UserData } from "../../../types/dashboard";

interface ProfileTabProps {
    userData: UserData;
    onOpenDeleteModal: () => void;
    onStartPlacementTest?: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
    userData,
    onOpenDeleteModal,
    onStartPlacementTest,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* كارت المعلومات الشخصية */}
                <div className="rounded-2xl p-6 bg-gradient-to-br from-brand-red via-[#7D1217] to-[#520B0E] text-white shadow-xl shadow-red-950/15 border border-red-800/40 space-y-5">
                    <h2 className="text-xl md:text-3xl font-bold text-brand-gold flex items-center gap-2 border-b border-white/15 pb-3">
                        <User className="w-6 h-6 text-brand-gold" />
                        المعلومات الشخصية
                    </h2>

                    <div className="space-y-3">
                        <InfoRow icon={<Mail className="w-5 h-5 text-brand-gold" />} label="البريد الإلكتروني" value={userData.email} theme="red" />
                        <InfoRow dir="ltr" className="ltr text-left" icon={<Phone className="w-5 h-5 text-brand-gold" />} label="رقم الهاتف" value={userData.phone || "غير محدد"} theme="red" />
                        <InfoRow icon={<Globe className="w-5 h-5 text-brand-gold" />} label="الدولة" value={userData.country || "غير محدد"} theme="red" />
                        <InfoRow icon={<Calendar className="w-5 h-5 text-brand-gold" />} label="العمر" value={userData.age ? `${userData.age} سنة` : "غير محدد"} theme="red" />
                        <InfoRow icon={<Users className="w-5 h-5 text-brand-gold" />} label="الجنس" value={userData.gender || "غير محدد"} theme="red" />
                    </div>
                </div>

                {/* كارت المستوى التعليمي واللغوي */}
                <div className="rounded-2xl p-6 bg-gradient-to-br from-[#D2A652] via-brand-gold to-[#8B6B2B] text-white shadow-xl shadow-amber-950/15 border border-amber-300/30 space-y-5">
                    <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 border-b border-white/20 pb-3">
                        <GraduationCap className="w-6 h-6 text-white" />
                        المستوى التعليمي واللغوي
                    </h2>

                    <div className="space-y-3">
                        <InfoRow icon={<GraduationCap className="w-5 h-5 text-amber-100" />} label="المستوى التعليمي" value={userData.education_level || "غير محدد"} theme="gold" />
                        <InfoRow icon={<Languages className="w-5 h-5 text-amber-100" />} label="مستوى اللغة اليابانية" value={userData.japanese_level || "غير محدد"} highlight theme="gold" />

                        {/* الخانة الفضية لخيار اختبار تحديد المستوى */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-black/20 hover:bg-black/30 border border-white/15 backdrop-blur-md transition-all gap-4">
                            <div className="flex items-center gap-3">
                                <ClipboardCheck className="w-6 h-6 text-amber-100 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-amber-50 text-base md:text-lg font-medium">
                                        تحديد المستوى
                                    </span>
                                    <span className="text-sm text-amber-200/90 font-normal">
                                        اجتز الاختبار لاقتراح المساق المناسب لك
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onStartPlacementTest}
                                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-slate-900 to-black hover:from-black hover:to-slate-900 text-amber-300 hover:text-amber-200 border border-amber-400/40 rounded-xl text-lg cursor-pointer md:text-xl font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                                اختبار تحديد المستوى
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* منطقة الحذف والخصوصية */}
            <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1 text-center sm:text-right">
                    <h3 className="text-lg md:text-2xl font-bold text-red-900 flex items-center justify-center sm:justify-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        منطقة الحساب والخصوصية
                    </h3>
                    <p className="text-lg text-red-700 font-medium">
                        عند حذف الحساب، سيتم إزالة جميع بياناتك ونتائجك الأكاديمية بشكل نهائي ولا يمكن استعادتها.
                    </p>
                </div>

                <button
                    onClick={onOpenDeleteModal}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap text-lg cursor-pointer"
                >
                    <Trash2 className="w-5 h-5" />
                    حذف الحساب
                </button>
            </div>
        </motion.div>
    );
};

// مكون فرعي موحد لصفوف البيانات
export function InfoRow({
    dir,
    className,
    icon,
    label,
    value,
    highlight = false,
    theme = "red",
}: {
    dir?: string;
    className?: string;
    icon: React.ReactNode;
    label: string;
    value: string | number;
    highlight?: boolean;
    theme?: "red" | "gold";
}) {
    const isRed = theme === "red";

    return (
        <div
            className={`flex items-center justify-between p-4 rounded-xl backdrop-blur-md transition-all border ${isRed
                ? "bg-black/20 hover:bg-black/30 border-white/10"
                : "bg-black/20 hover:bg-black/30 border-white/15"
                }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className={`${isRed ? "text-red-100" : "text-amber-50"} text-xl font-medium`}>
                    {label}
                </span>
            </div>
            <span
                dir={dir}
                className={`font-semibold text-xl ${className || ""} ${highlight
                    ? "text-white bg-brand-red px-3.5 py-1 rounded-full border border-red-400 shadow-sm font-bold "
                    : "text-white"
                    }`}
            >
                {value}
            </span>
        </div>
    );
}
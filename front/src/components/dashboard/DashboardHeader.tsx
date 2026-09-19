import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Camera, Edit3, Loader2 } from "lucide-react";
import type { UserData } from "../../types/dashboard";

interface DashboardHeaderProps {
  userData: UserData;
  currentLevel: string;
  isUpdatingAvatar: boolean;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenEditModal: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userData,
  currentLevel,
  isUpdatingAvatar,
  onAvatarChange,
  onOpenEditModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white via-slate-50 to-red-50/50 border border-brand-gold/30 p-6 sm:p-8 shadow-xl shadow-gray-200/50"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">

          {/* الصورة الشخصية */}
          <div
            className="relative group cursor-pointer shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={onAvatarChange}
              accept="image/*"
              className="hidden"
            />

            {userData.avatar_url ? (
              <img
                src={userData.avatar_url}
                alt="User Avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-brand-gold/50"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-brand-red to-[#520B0E] border-4 border-white shadow-lg ring-2 ring-brand-gold/50 flex items-center justify-center text-3xl font-bold text-white">
                {userData.first_name?.[0]?.toUpperCase()}
                {userData.last_name?.[0]?.toUpperCase()}
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {isUpdatingAvatar ? (
                <Loader2 className="w-7 h-7 text-white animate-spin" />
              ) : (
                <Camera className="w-7 h-7 text-white" />
              )}
            </div>

            <span className="absolute bottom-1 left-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white shadow" />
          </div>

          {/* البيانات والترحيب */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="bg-brand-red/10 text-brand-red px-3 py-0.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1 border border-brand-red/20">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> طالب أكاديمي
              </span>
              <span className="bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full text-xs font-bold border border-amber-300">
                المستوى   {currentLevel}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              مرحباً بك، <span className="text-brand-red">{userData.first_name} {userData.last_name}</span> 👋
            </h1>

            <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              حساب نشط ومسجل في أكاديمية اللغة اليابانية
            </p>
          </div>
        </div>

        <button
          onClick={onOpenEditModal}
          className="px-4 py-2.5 bg-white border group border-brand-gold/60 text-gray-800 hover:bg-brand-gold hover:text-white rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 text-lg cursor-pointer"
        >
          <Edit3 className="w-4 h-4 text-brand-gold group-hover:text-white" />
          تعديل البيانات
        </button>
      </div>
    </motion.div>
  );
};
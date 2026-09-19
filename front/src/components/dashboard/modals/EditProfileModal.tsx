import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, X, Loader2, Save } from "lucide-react";
import type{ UserData } from "../../../types/dashboard";

interface EditProfileModalProps {
  isOpen: boolean;
  userData: UserData;
  isUpdating: boolean;
  onClose: () => void;
  onSave: (formData: Partial<UserData>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  userData,
  isUpdating,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    first_name: userData.first_name || "",
    last_name: userData.last_name || "",
    phone: userData.phone || "",
    country: userData.country || "",
    age: userData.age ? String(userData.age) : "",
    gender: userData.gender || "",
    education_level: userData.education_level || "",
    japanese_level: userData.japanese_level || "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 relative space-y-5 my-8"
        >
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 border-b pb-3">
            <Edit3 className="w-6 h-6 text-brand-red" />
            <h3 className="text-xl font-bold text-gray-900">تعديل الملف الشخصي</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-medium">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">الاسم الأول</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">اسم العائلة</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">الدولة</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">العمر</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">الجنس</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none bg-white text-sm"
                >
                  <option value="">اختر الجنس</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">المستوى التعليمي</label>
                <input
                  type="text"
                  value={formData.education_level}
                  onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">مستوى اللغة اليابانية</label>
                <input
                  type="text"
                  value={formData.japanese_level}
                  onChange={(e) => setFormData({ ...formData, japanese_level: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={isUpdating}
                className="flex-1 py-2.5 bg-brand-red hover:bg-brand-red/90 disabled:bg-red-400 text-white font-semibold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جارٍ الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                disabled={isUpdating}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm"
              >
                إلغاء
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
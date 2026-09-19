import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, Loader2, X } from "lucide-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative space-y-5"
        >
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-gray-900">
              هل أنت تأكد من رغبتك في حذف الحساب؟
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              هذا الإجراء نهائي ولا يمكن التراجع عنه. سيتم حذف جميع بياناتك الشخصية وسجلاتك في الأكاديمية تماماً.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جارٍ الحذف...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  تأكيد الحذف النهائي
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm"
            >
              إلغاء
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
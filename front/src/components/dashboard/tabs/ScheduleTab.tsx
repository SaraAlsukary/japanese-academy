import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, Video, Calendar, Clock, ChevronLeft } from "lucide-react";
import type{ StudentDashboardData } from "../../../types/dashboard";

interface ScheduleTabProps {
  data: StudentDashboardData;
}

export const ScheduleTab: React.FC<ScheduleTabProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-brand-red" />
            جدول الدروس المباشرة والجلسات التفاعلية
          </h3>
          <p className="text-gray-600 text-sm mt-1 font-medium">
            احرص على الحضور في الموعد المحدد لتفاعل أسرع مع المعلمين.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.upcomingSchedule.map((item) => (
          <div
            key={item.id}
            className={`bg-white border rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
              item.isLiveSoon ? "border-brand-red/50 ring-1 ring-brand-red/20 bg-red-50/20" : "border-gray-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl shrink-0 ${item.isLiveSoon ? "bg-brand-red text-white" : "bg-gray-100 text-gray-700"}`}>
                <Video className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${item.isLiveSoon ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{item.instructor}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-base md:text-lg">
                  {item.title}
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600 pt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand-gold" /> {item.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-gold" /> {item.time}</span>
                </div>
              </div>
            </div>

            <button
              className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                item.isLiveSoon
                  ? "bg-brand-red hover:bg-brand-red/90 text-white animate-pulse"
                  : "bg-gray-900 hover:bg-black text-white"
              }`}
            >
              {item.isLiveSoon ? "انضم للبث المباشر الآن" : "تذكيري بالموعد"}
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, PlayCircle } from "lucide-react";
import type{ StudentDashboardData } from "../../../types/dashboard";

interface CoursesTabProps {
  data: StudentDashboardData;
}

export const CoursesTab: React.FC<CoursesTabProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* ملخص المستوى الحالي */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <span className="text-xs font-bold text-brand-red bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            المستوى المستهدف
          </span>
          <h3 className="text-2xl font-extrabold text-gray-900">
            أنت تدرس حالياً: <span className="text-brand-red">{data.currentLevel}</span>
          </h3>
          <p className="text-gray-600 text-sm font-medium">
            إنجازك العام في هذا المستوى يتقدم بخطوات ثابته نحو الموعد النهائي للاختبار!
          </p>
        </div>

        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-gray-700">نسبة الإنجاز</span>
            <span className="text-brand-red">{data.overallProgress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border">
            <div
              className="h-full bg-gradient-to-r from-brand-gold to-brand-red transition-all duration-500 rounded-full"
              style={{ width: `${data.overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* قائمة المساقات */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-red" />
          المستويات والمساقات المسجل بها ({data.enrolledLevels.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.enrolledLevels.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs text-white font-bold px-2.5 py-1 rounded-lg ${course.badgeColor}`}>
                    {course.status}
                  </span>
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {course.lessonsCount}
                  </span>
                </div>

                <h4 className="font-bold text-gray-900 text-lg leading-snug">
                  {course.title}
                </h4>

                <p className="text-xs text-gray-500 font-medium">
                  المعلم المسؤول: {course.instructor}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>التقدم في الدورة</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-gold rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <button className="w-full py-2 bg-slate-900 hover:bg-brand-red text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <PlayCircle className="w-4 h-4" /> متابعة الدراسة
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
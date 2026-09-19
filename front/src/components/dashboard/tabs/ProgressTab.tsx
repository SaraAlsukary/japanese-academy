import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, BarChart3, Award, Clock, TrendingUp } from "lucide-react";
import type{ StudentDashboardData } from "../../../types/dashboard";

interface ProgressTabProps {
  data: StudentDashboardData;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* كروت الإحصائيات السريعة بنفس نسق الخطوط */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
          title="الدروس المكتملة"
          value={`${data.completedLessons} / ${data.totalLessons}`}
          bg="bg-emerald-50/60 border-emerald-200"
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
          title="نسبة الحضور"
          value={data.attendanceRate}
          bg="bg-blue-50/60 border-blue-200"
        />
        <StatCard
          icon={<Award className="w-6 h-6 text-amber-600" />}
          title="معدل الاختبارات"
          value={data.avgQuizScore}
          bg="bg-amber-50/60 border-amber-200"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-purple-600" />}
          title="ساعات الدراسة"
          value={data.studyHours}
          bg="bg-purple-50/60 border-purple-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* تقييم المهارات */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
            <TrendingUp className="w-5 h-5 text-brand-red" />
            تقييم المهارات اللغوية
          </h3>

          <div className="space-y-4">
            {data.skillsBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-sm font-semibold text-gray-700">
                  <span>{item.skill}</span>
                  <span className="text-brand-red font-bold">{item.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-gold to-brand-red rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* الأوسمة والإنجازات */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
            <Award className="w-5 h-5 text-brand-gold" />
            الأوسمة والإنجازات الأكاديمية
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <BadgeItem title="مواظب متميز" desc="حضور 95% من الدروس" active />
            <BadgeItem title="بطل الكانجي" desc="اجتياز 100 كلمة kanji" active />
            <BadgeItem title="متفوق N4" desc="إنهاء مستوى JLPT N4" active />
            <BadgeItem title="متحدث طليق" desc="إكمال 5 جلسات مباشرة" active={false} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function StatCard({ icon, title, value, bg }: { icon: React.ReactNode; title: string; value: string; bg: string }) {
  return (
    <div className={`p-4 rounded-2xl border ${bg} flex flex-col justify-between space-y-2 shadow-sm`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-600">{title}</span>
        {icon}
      </div>
      <div className="text-xl sm:text-2xl font-black text-gray-900">{value}</div>
    </div>
  );
}

function BadgeItem({ title, desc, active }: { title: string; desc: string; active: boolean }) {
  return (
    <div className={`p-3 rounded-xl border flex items-center gap-3 ${active ? "bg-amber-50/50 border-amber-200" : "bg-gray-50 border-gray-200 opacity-50"}`}>
      <div className={`p-2 rounded-lg ${active ? "bg-brand-gold text-white" : "bg-gray-300 text-gray-600"}`}>
        <Award className="w-5 h-5" />
      </div>
      <div>
        <h5 className="font-bold text-sm text-gray-900">{title}</h5>
        <p className="text-xs text-gray-500 font-medium">{desc}</p>
      </div>
    </div>
  );
}
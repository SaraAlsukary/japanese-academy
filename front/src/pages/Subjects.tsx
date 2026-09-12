import React from 'react';
import { motion, type Variants } from 'framer-motion';
import img_material from '../assets/Ai_img/_6f2f27d9-4995-4117-aa80-149abadfed41.jpg';

const Subjects: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const materials = [
    {
      title: "كتب إلكترونية تفاعلية",
      desc: "تحتوي على تدريبات واختبارات لكل مستوى، مع محتوى قابل للتنزيل والقراءة في أي وقت."
    },
    {
      title: "فيديوهات تعليمية مسجلة",
      desc: "تُتيح لك متابعة الدروس وفق جدولك الخاص."
    },
    {
      title: "جلسات مباشرة عبر الإنترنت",
      desc: "مع أساتذة متخصصين لطرح الأسئلة والحصول على توضيحات."
    }
  ];

  return (
    <section 
      dir="rtl" /* ضمان الاتجاه من اليمين لليسار */
      className="mx-[12px] xl:mx-[90px] mt-16 mb-12 overflow-hidden" 
      id="Study_materials"
    >
      {/* حاوية لضمان بقاء العنوان على اليمين */}
      <div className="text-right">
        <motion.h2 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-brand-red mb-10 text-2xl md:text-5xl border-b-2 border-brand-gold pb-4 inline-block"
        >
          تشمل موادنا الدراسية:
        </motion.h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col lg:flex-row gap-12 items-start"
      >
        {/* قسم الصورة (سيظهر على اليمين بفضل dir="rtl") */}
        <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative group">
          <div className="absolute -inset-3 bg-brand-gold rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition duration-500"></div>
          <img 
            className="relative w-full h-auto rounded-2xl shadow-xl border border-brand-gold/30 object-cover" 
            src={img_material} 
            alt="المواد الدراسية" 
          />
        </motion.div>

        {/* قسم القائمة (سيظهر على اليسار) */}
        <motion.div variants={itemVariants} className="w-full lg:w-1/2">
          <ul className="pl-0 space-y-6 m-0 list-none">
            {materials.map((item, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                className="relative p-5 md:p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-gold/50 transition-all duration-300"
              >
                {/* خط الزينة الجانبي على اليمين */}
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-brand-red rounded-r-xl"></div>
                
                {/* إبعاد النص قليلاً عن الخط الأحمر */}
                <div className="pr-4">
                  <h3 className="text-brand-black font-bold text-xl md:text-3xl mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-gold inline-block"></span>
                    {item.title}
                  </h3>
                  <p className="text-brand-black/80 text-justify leading-relaxed text-lg md:text-xl font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Subjects;
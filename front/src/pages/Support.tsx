import React from "react";
import { motion } from "framer-motion";
import img_Supports from "../assets/Ai_img/f43c3626-6c13-4a8d-82d5-697203e33105.webp";

export const Supports: React.FC = () => {
    return (
        <section
            className="w-full  mx-auto px-4  md:px-20 py-12 md:py-20 overflow-hidden"
            dir="rtl"
            id="Support"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* قسم النص والمعلومات */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col justify-center text-right space-y-4"
                >
                    <h2 className="text-2xl sm:text-5xl md:text-4xl font-bold text-brand-red leading-relaxed">
                        الدعم الفني:
                    </h2>

                    <div className="space-y-4 text-brand-black text-xl md:text-3xl leading-loose text-justify">
                        <p>
                            يتوفر لدينا فريق دعم فني متواجد على مدار الساعة لمساعدتك في حال
                            واجهت أي مشاكل فنية أثناء الدراسة أو التسجيل.
                        </p>
                        <p>
                            تم تحسين التفاصيل لتشمل مزيدًا من المعلومات حول البرامج الدراسية
                            والخدمات التي تقدمها الأكاديمية.
                        </p>
                    </div>
                </motion.div>

                {/* قسم الصورة */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="flex justify-center items-center"
                >
                    <img
                        className="w-full h-auto max-w-md lg:max-w-full rounded-2xl shadow-lg border border-brand-gold/20 object-cover"
                        src={img_Supports}
                        alt="الدعم الفني لأكاديمية اللغة اليابانية"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Supports;
import { motion } from "framer-motion";
import img_services from "../assets/imgheader/OIP.jpg";

export default function MoreServices() {
    // إعدادات الأنيميشن لتأثير الظهور المتسلسل
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    return (
        <section
            className="w-full mx-auto xl:px-[90px] py-16 overflow-hidden"
            dir="rtl"
            id="More_services"
        >
            <div className="grid grid-cols-1 px-4 md:px-10 md:pl-30 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* قسم النصوص */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-5xl font-bold text-brand-red mb-8 relative inline-block"
                    >
                        خدمات إضافية:
                    </motion.h2>

                    <ul className="space-y-8">
                        <motion.li variants={itemVariants} className="relative">
                            {/* خط جانبي يعطي لمسة جمالية للهوية الحمراء */}
                            <div className="absolute right-0 top-1.5 bottom-0 w-1 bg-brand-red rounded-full"></div>
                            <div className="pr-5">
                                <h5 className="text-xl md:text-3xl font-bold text-brand-black mb-3">
                                    ورش عمل حول الثقافة اليابانية:
                                </h5>
                                <p className="text-lg md:text-2xl text-gray-700 leading-loose">
                                    نقدم ورش عمل شهرية تغطي مواضيع متنوعة مثل الثقافة الشعبية،
                                    التقاليد اليابانية، وتاريخ اليابان.
                                </p>
                            </div>
                        </motion.li>

                        <motion.li variants={itemVariants} className="relative">
                            <div className="absolute right-0 top-1.5 bottom-0 w-1 bg-brand-red rounded-full"></div>
                            <div className="pr-5">
                                <h5 className="text-lg md:text-3xl font-bold text-brand-black mb-3">
                                    دورات اللغة اليابانية للأعمال:
                                </h5>
                                <p className="text-base md:text-2xl text-gray-700 leading-loose">
                                    موجهة لمن يرغبون في تحسين مهاراتهم اللغوية في بيئات العمل
                                    اليابانية.
                                </p>
                            </div>
                        </motion.li>
                    </ul>
                </motion.div>

                {/* قسم الصورة */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: -30 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative"
                >
                    {/* تأثير خلفي للصورة (مربع ديكور بلون الهوية) */}
                    <div className="absolute -inset-4 bg-brand-red/10 rounded-3xl -z-10 transform rotate-3 scale-105"></div>

                    <img
                        className="w-full h-auto object-cover rounded-2xl shadow-xl border border-gray-100"
                        src={img_services}
                        alt="خدمات إضافية لأكاديمية اللغة اليابانية"
                        loading="lazy"
                    />
                </motion.div>

            </div>
        </section>
    );
}
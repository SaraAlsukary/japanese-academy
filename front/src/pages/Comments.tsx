import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import comment_img from "../assets/_c41fd9c8-37b4-4ced-a109-30ba1dde9350.jpg";
import type { TComment } from "../types/user";

// بيانات تجريبية مؤقتة تعمل في حال تعثر الاتصال بالـ API
const mockComments: TComment[] = [
    {
        id: 1,
        name: "أحمد علي",
        country: "المملكة العربية السعودية",
        comment: "تجربة رائعة جداً! الاستفادة كانت مذهلة والمدرسون ممتازون في الشرح والتعامل وتبسيط قواعد اللغة اليابانية.",
    },
    {
        id: 2,
        name: "سارة محمد",
        country: "جمهورية مصر العربية",
        comment: "أفضل منصة لتعلم اللغة اليابانية للناطقين بالعربية. الشرح مبسط والأنشطة التفاعلية ممتازة جداً.",
    },
    {
        id: 3,
        name: "خالد العمر",
        country: "الإمارات العربية المتحدة",
        comment: "الدورة التمهيدية ساعدتني كثيراً في إتقان الحروف (الهيراغانا والكاتاكانا) بظرف أسبوعين فقط باحترافية.",
    },
    {
        id: 4,
        name: "فاطمة الزهراء",
        country: "المملكة المغربية",
        comment: "الاهتمام بالجانب الثقافي الياباني بجانب اللغة يجعل التعلم ممتعاً للغاية. أنصح الأكاديمية بشدة لكل شغوف!",
    },
];

export default function Comments() {
    const [comments, setComments] = useState<TComment[]>([]);

    // حالات السلايدر (Slider States)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [isPaused, setIsPaused] = useState(false);
    const [loading, setLoading] = useState(false)

    // جلب البيانات
    useEffect(() => {
        setLoading(true)
        axios
            .get("https://api.japaneseacademy.jp/allcomments")
            .then((response: any) => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setComments(response.data);
                } else {
                    setComments(mockComments);
                }
            })
            .catch((error: any) => {
                console.error("Error fetching comments, using fallback mock data:", error);
                setComments(mockComments);
            });
        setLoading(false)
    }, []);

    // تحديد عدد الكروت بناءً على حجم الشاشة (Responsive)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(3);
        };
        handleResize(); // استدعاء أولي
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // أقصى فهرس ممكن للوصول إليه بناءً على عدد التعليقات وحجم الشاشة
    const maxIndex = Math.max(0, comments.length - itemsPerPage);

    // معالجة خطأ الخروج عن النطاق عند تصغير أو تكبير الشاشة
    useEffect(() => {
        if (currentIndex > maxIndex && maxIndex >= 0) {
            setCurrentIndex(maxIndex);
        }
    }, [maxIndex, currentIndex]);

    // التشغيل التلقائي (Autoplay)
    useEffect(() => {
        if (isPaused || maxIndex <= 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [maxIndex, isPaused]);

    // دوال التنقل
    const handleNext = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    const handlePrev = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

    return (
        <section className="w-full mx-auto  px-4 md:px-30 py-12 overflow-hidden" dir="rtl" id="Comments">
            {/* العنوان الرئيسي مع أنيميشن الدخول */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
            >
                <h2 className="text-2xl md:text-5xl font-bold text-brand-red leading-relaxed">
                    من آراء الطلاب الكرام في أكاديمية اللغة اليابانية
                </h2>
            </motion.div>

            {/* الصورة التوضيحية */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-2xl mx-auto mb-10"
            >
                <img
                    className="w-full h-auto rounded-2xl shadow-md object-cover"
                    src={comment_img}
                    alt="آراء طلاب أكاديمية اللغة اليابانية"
                />
            </motion.div>

            {/* سلايدر الآراء (مبني بـ Framer Motion) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative w-full pb-14 pt-4 px-2"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* زر التنقل السابق (يمين في RTL) */}
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 z-10 text-brand-red hover:scale-110 transition-transform bg-white rounded-full shadow-lg p-2 border border-gray-100"
                    aria-label="السابق"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>

                {/* زر التنقل التالي (يسار في RTL) */}
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 z-10 text-brand-red hover:scale-110 transition-transform bg-white rounded-full shadow-lg p-2 border border-gray-100"
                    aria-label="التالي"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                {/* حاوية الكروت */}
                <div className="overflow-hidden w-full py-2">
                    <motion.div
                        className="flex gap-6 w-full"
                        // معادلة رياضية دقيقة لتحريك الـ Track بناءً على اتجاه RTL والمسافات
                        animate={{ x: `calc(${currentIndex} * (100% + 24px) / ${itemsPerPage})` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {loading?"جاري تحميل التعليقات...":comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="flex-shrink-0"
                                // حساب عرض الكرت بحيث يملأ المساحة مع الأخذ بالاعتبار الفراغات (gap)
                                style={{ width: `calc((100% - ${24 * (itemsPerPage - 1)}px) / ${itemsPerPage})` }}
                            >
                                <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-brand-red flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300">
                                    <p className="text-brand-black text-xl mdtext-4xl leading-relaxed mb-6 italic min-h-[90px]">
                                        "{comment.comment}"
                                    </p>
                                    <div className="border-t border-gray-100 pt-4 mt-auto">
                                        <p className="text-brand-red font-bold text-xl mb-1">
                                            {comment.name}
                                        </p>
                                        <p className="text-gray-500 text-lg font-medium">
                                            {comment.country}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* نقاط التنقل السفلية (Pagination) */}
                <div className="flex justify-center gap-2 mt-6 absolute bottom-0 left-0 right-0">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`انتقل إلى الشريحة ${index + 1}`}
                            className={`h-[10px] rounded-full transition-all duration-300 ${currentIndex === index
                                ? "bg-brand-red w-6"
                                : "bg-gray-300 w-[10px] hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
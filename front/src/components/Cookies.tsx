import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Cookies() {
    const [cookiesAccepted, setCookiesAccepted] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [cookiesSettings, setCookiesSettings] = useState({
        necessary: true,
        analytics: true,
        preferences: true,
    });

    useEffect(() => {
        // تحميل إعدادات ملفات تعريف الارتباط من اللوكال ستورج عند تحميل الصفحة
        const savedSettings = localStorage.getItem("cookiesSettings");
        if (savedSettings) {
            setCookiesSettings(JSON.parse(savedSettings));
            setCookiesAccepted(true);
        }
    }, []);

    const handleAcceptCookies = () => {
        setCookiesAccepted(true);
        document.cookie =
            "acceptCookies=true; path=/; max-age=" + 60 * 60 * 24 * 30;
        localStorage.setItem("cookiesSettings", JSON.stringify(cookiesSettings));
    };

    const handleRejectCookies = () => {
        setCookiesAccepted(true);
        document.cookie =
            "acceptCookies=false; path=/; max-age=" + 60 * 60 * 24 * 30;
    };

    const handleToggle = (type: keyof typeof cookiesSettings, isEnabled: boolean) => {
        setCookiesSettings((prevSettings) => ({
            ...prevSettings,
            [type]: isEnabled,
        }));
    };

    const handleSaveSettingsAndClose = () => {
        localStorage.setItem("cookiesSettings", JSON.stringify(cookiesSettings));
        document.cookie = `cookiesSettings=${JSON.stringify(
            cookiesSettings
        )}; path=/`;
        toast.success("تم حفظ إعدادات ملفات تعريف الارتباط بنجاح!");
        setCookiesAccepted(true);
        setShowSettingsModal(false);
    };

    return (
        <>
            <div>
                {/* شريط الإشعار السفلي (Banner) */}
                {!cookiesAccepted && (
                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-black text-white p-6 md:p-8 shadow-2xl border-t-4 border-brand-gold">
                        <p className="text-xl md:text-2xl text-center max-w-5xl mx-auto mb-6 leading-relaxed font-extrabold">
                            مرحبًا بكم في{" "}
                            <span className="text-brand-gold font-extrabold">
                                أكاديمية اللغة اليابانية
                            </span>{" "}
                            ! <br />
                            نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتكم. بالضغط على "قبول
                            جميع ملفات تعريف الارتباط"، فإنكم توافقون على استخدامها.
                            <br />
                            لمزيد من التفاصيل، يُرجى الاطلاع على{" "}
                            <a
                                className="text-brand-gold underline hover:text-white font-extrabold transition-colors duration-300"
                                href="/Privacy"
                            >
                                سياسة الخصوصية
                            </a>
                            .
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
                            <button
                                className="w-full md:w-auto px-8 py-3 bg-brand-red hover:bg-red-900 text-white text-xl md:text-2xl font-extrabold rounded-xl border-2 border-brand-red shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                onClick={handleAcceptCookies}
                            >
                                قبول جميع ملفات تعريف الارتباط
                            </button>

                            <button
                                className="w-full md:w-auto px-8 py-3 bg-brand-gold hover:bg-yellow-600 text-brand-black text-xl md:text-2xl font-extrabold rounded-xl border-2 border-brand-gold shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                onClick={() => setShowSettingsModal(true)}
                            >
                                إعدادات ملفات الارتباط
                            </button>

                            <button
                                className="w-full md:w-auto px-8 py-3 bg-transparent hover:bg-white/10 text-white text-xl md:text-2xl font-extrabold rounded-xl border-2 border-white/40 transition-all duration-300 cursor-pointer"
                                onClick={handleRejectCookies}
                            >
                                رفض
                            </button>
                        </div>
                    </div>
                )}

                {/* النافذة المنبثقة للإعدادات (Modal) */}
                {showSettingsModal && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <div className="bg-white text-brand-black rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 border-4 border-brand-gold max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-red mb-4 border-b-2 border-brand-gold/30 pb-3">
                                إعدادات ملفات تعريف الارتباط
                            </h2>
                            <p className="text-lg md:text-xl font-bold text-gray-700 mb-6 leading-relaxed">
                                قبل البدء بتصفح الموقع، يمكنك تعديل إعدادات ملفات تعريف الارتباط
                                حسب تفضيلاتك.
                            </p>

                            {/* الخيار الأول: الضرورية */}
                            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 mb-5 shadow-sm">
                                <h3 className="text-xl md:text-2xl font-extrabold text-brand-black mb-2">
                                    1. ملفات الارتباط الضرورية
                                </h3>
                                <p className="text-base md:text-lg font-bold text-gray-600">
                                    هذه الملفات ضرورية لتشغيل الموقع بشكل صحيح ولا يمكن تعطيلها.
                                </p>
                            </div>

                            {/* الخيار الثاني: التحليلية */}
                            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 mb-5 shadow-sm">
                                <h3 className="text-xl md:text-2xl font-extrabold text-brand-black mb-2">
                                    2. ملفات الارتباط التحليلية
                                </h3>
                                <p className="text-base md:text-lg font-bold text-gray-600 mb-4">
                                    تساعدنا في تحسين الأداء وتحليل سلوك المستخدم.
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        className={`px-6 py-2.5 rounded-xl font-extrabold text-lg transition-all duration-300 cursor-pointer border-2 ${cookiesSettings.analytics
                                                ? "bg-brand-red text-white border-brand-red shadow-md"
                                                : "bg-white text-brand-black border-gray-300 hover:border-brand-gold"
                                            }`}
                                        onClick={() => handleToggle("analytics", true)}
                                    >
                                        تفعيل
                                    </button>
                                    <button
                                        className={`px-6 py-2.5 rounded-xl font-extrabold text-lg transition-all duration-300 cursor-pointer border-2 ${!cookiesSettings.analytics
                                                ? "bg-brand-black text-white border-brand-black shadow-md"
                                                : "bg-white text-brand-black border-gray-300 hover:border-brand-gold"
                                            }`}
                                        onClick={() => handleToggle("analytics", false)}
                                    >
                                        تعطيل
                                    </button>
                                </div>
                            </div>

                            {/* الخيار الثالث: التفضيلات */}
                            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
                                <h3 className="text-xl md:text-2xl font-extrabold text-brand-black mb-2">
                                    3. ملفات الارتباط الخاصة بالتفضيلات
                                </h3>
                                <p className="text-base md:text-lg font-bold text-gray-600 mb-4">
                                    تسمح بحفظ تفضيلاتك لتوفير تجربة مخصصة عند العودة للموقع.
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        className={`px-6 py-2.5 rounded-xl font-extrabold text-lg transition-all duration-300 cursor-pointer border-2 ${cookiesSettings.preferences
                                                ? "bg-brand-red text-white border-brand-red shadow-md"
                                                : "bg-white text-brand-black border-gray-300 hover:border-brand-gold"
                                            }`}
                                        onClick={() => handleToggle("preferences", true)}
                                    >
                                        تفعيل
                                    </button>
                                    <button
                                        className={`px-6 py-2.5 rounded-xl font-extrabold text-lg transition-all duration-300 cursor-pointer border-2 ${!cookiesSettings.preferences
                                                ? "bg-brand-black text-white border-brand-black shadow-md"
                                                : "bg-white text-brand-black border-gray-300 hover:border-brand-gold"
                                            }`}
                                        onClick={() => handleToggle("preferences", false)}
                                    >
                                        تعطيل
                                    </button>
                                </div>
                            </div>

                            {/* إجراءات الحفظ */}
                            <div className="mt-8">
                                <button
                                    className="w-full py-3.5 bg-brand-red hover:bg-red-900 text-white text-xl md:text-2xl font-extrabold rounded-xl shadow-lg border-2 border-brand-red transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                    onClick={handleSaveSettingsAndClose}
                                >
                                    حفظ الإعدادات
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
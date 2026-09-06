
export default function ComingSoon() {


    return (
        <div dir="rtl" className="relative min-h-screen bg-brand-black text-white flex flex-col justify-between items-center px-4 py-8 overflow-hidden select-none">

            {/* 🌟 خلفيات إضاءة مموهة باللونين الأحمر والذهبي للهوية البصرية */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-red/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* الهيدر العلوي */}


            {/* المحتوى الرئيسي في المنتصف */}
            <main className="flex flex-col items-center text-center my-auto  z-10 max-w-4xl w-full py-8 pt-0">

                {/* 1. الشعار (Logo) في المنتصف أعلى الكتابة */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-brand-gold/30 rounded-full blur-xl group-hover:bg-brand-red/40 transition-all duration-500"></div>
                    <img
                        src="/logo.png"
                        alt="شعار الأكاديمية"
                        className="relative w-32 md:w-48 xl:w-56 bg-white p-2 rounded-full shadow-2xl border-4 border-brand-gold transition-transform duration-500 hover:scale-105"
                    />
                </div>
                <header className="w-full max-w-6xl my-10 z-10 text-center">
                    <span className="text-brand-gold font-extrabold text-4xl md:text-2xl border-b-2 border-brand-gold pb-1">
                        أكاديمية اللغة اليابانية
                    </span>
                </header>
                {/* 2. العنوان الرئيسي */}
                <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold text-white mb-4 leading-tight">
                    انتظرونا... <span className="text-brand-gold">قريباً جداً!</span>
                </h1>

                {/* 3. الوصف الفرعي */}
                <p className="text-xl md:text-3xl text-gray-200 font-extrabold max-w-2xl mb-10 leading-relaxed">
                    نعمل حالياً على تطوير تجربة تعليمية فريدة واستثنائية لنأخذكم في رحلة احترافية لتعلم اللغة اليابانية.
                </p>




            </main>

            {/* الفوتر السكلي */}
            <footer className="w-full max-w-6xl text-center z-10 pt-6 border-t border-white/10">
                <p className="text-md md:text-xl font-extrabold text-gray-400">
                    جميع الحقوق محفوظة © {new Date().getFullYear()} لأكاديمية اللغة اليابانية
                </p>
            </footer>

        </div>
    );
}
export default function Register_header() {
    const steps = [
        {
            id: 1,
            title: "إنشاء حساب مجاني:",
            desc: "قم بتعبئة نموذج التسجيل لإنشاء حساب في أكاديمية اللغة اليابانية، وستتلقى رسالة تأكيد على بريدك الإلكتروني لتفعيل الحساب.",
        },
        {
            id: 2,
            title: "اختبار تحديد المستوى:",
            desc: "خذ اختبار تحديد المستوى المجاني عبر الإنترنت لتحديد مستوى دراستك المناسب.",
        },
        {
            id: 3,
            title: "اختيار الدورة المناسبة:",
            desc: "بناءً على نتائج اختبار تحديد المستوى، يمكنك اختيار الدورة التعليمية الأنسب وبدء التسجيل.",
        },
        {
            id: 4,
            title: "إتمام عملية الدفع:",
            desc: "أتمم عملية الدفع من خلال وسائل الدفع الإلكترونية المتاحة (بطاقات ائتمان، PayPal، تحويل بنكي).",
        },
        {
            id: 5,
            title: "الوصول إلى الدروس:",
            desc: "بعد الدفع، ستحصل على وصول فوري إلى منصة الدروس حيث يمكنك البدء في التعلم على الفور.",
        },
    ];

    return (
        <div
            dir="rtl"

            className="w-full p-4 text-white ">
            {/* قسم العنوان */}
            <div className="flex flex-col items-start mb-6">
                <h2 className="text-2xl md:text-4xl font-bold mt-2 text-white">
                    طريقة التسجيل:
                </h2>
                <p className="mt-2 text-gray-100 text-xl md:text-2xl leading-relaxed">
                    عملية التسجيل في أكاديميتنا بسيطة ومرنة، تشمل الخطوات التالية:
                </p>
            </div>

            {/* قائمة الخطوات */}
            <ul className="mt-8 flex flex-col gap-8 p-0 list-none">
                {steps.map((step) => (
                    <li
                        key={step.id}
                        className="relative w-full p-4 md:p-5 rounded-[20px] border-2 border-[#C5A059] bg-[#8B151A] shadow-md transition-all hover:border-white"
                    >
                        {/* شارة رقم الخطوة باللون الذهبي والنص باللون الداكن وضوحًا وتبايناً */}
                        <div className="absolute -top-[15px] -right-[15px] w-10 h-10 rounded-full bg-[#C5A059] text-[#1A1A1A] font-bold text-xl flex items-center justify-center shadow-lg border border-white/20">
                            {step.id}
                        </div>

                        {/* عنوان الخطوة باللون الذهبي */}
                        <h2 className="text-[#C5A059] font-bold text-lg md:text-2xl mb-2">
                            {step.title}
                        </h2>

                        {/* تفاصيل الخطوة باللون الأبيض */}
                        <p className="text-white text-[var(--sec--size)] leading-relaxed text-lg md:text-xl">
                            {step.desc}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
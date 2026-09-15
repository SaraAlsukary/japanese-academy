import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import "flag-icons/css/flag-icons.min.css"; // استيراد مكتبة الأعلام
import Register_header from "../components/RegisterHeader";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { APIURL } from "../api/apiConfig";
import { toast } from "react-toastify"
// استخدام toast المعتاد

// قائمة الدول بترميز ISO 3166-1 alpha-2 لتوافقها مع مكتبة flag-icons
const countries = [
    // الدول العربية
    { code: "sa", name: "السعودية", dial: "+966" },
    { code: "eg", name: "مصر", dial: "+20" },
    { code: "ae", name: "الإمارات العربية المتحدة", dial: "+971" },
    { code: "kw", name: "الكويت", dial: "+965" },
    { code: "qa", name: "قطر", dial: "+974" },
    { code: "om", name: "عُمان", dial: "+968" },
    { code: "bh", name: "البحرين", dial: "+973" },
    { code: "jo", name: "الأردن", dial: "+962" },
    { code: "lb", name: "لبنان", dial: "+961" },
    { code: "sy", name: "سوريا", dial: "+963" },
    { code: "iq", name: "العراق", dial: "+964" },
    { code: "ps", name: "فلسطين", dial: "+970" },
    { code: "ye", name: "اليمن", dial: "+967" },
    { code: "dz", name: "الجزائر", dial: "+213" },
    { code: "ma", name: "المغرب", dial: "+212" },
    { code: "tn", name: "تونس", dial: "+216" },
    { code: "ly", name: "ليبيا", dial: "+218" },
    { code: "sd", name: "السودان", dial: "+249" },
    { code: "mr", name: "موريتانيا", dial: "+222" },
    { code: "so", name: "الصومال", dial: "+252" },
    { code: "dj", name: "جيبوتي", dial: "+253" },
    { code: "km", name: "جزر القمر", dial: "+269" },

    // باقي دول العالم
    { code: "jp", name: "اليابان", dial: "+81" },
    { code: "tr", name: "تركيا", dial: "+90" },
    { code: "us", name: "الولايات المتحدة", dial: "+1" },
    { code: "ca", name: "كندا", dial: "+1" },
    { code: "gb", name: "المملكة المتحدة", dial: "+44" },
    { code: "de", name: "ألمانيا", dial: "+49" },
    { code: "fr", name: "فرنسا", dial: "+33" },
    { code: "it", name: "إيطاليا", dial: "+39" },
    { code: "es", name: "إسبانيا", dial: "+34" },
    { code: "ru", name: "روسيا", dial: "+7" },
    { code: "cn", name: "الصين", dial: "+86" },
    { code: "in", name: "الهند", dial: "+91" },
    { code: "kr", name: "كوريا الجنوبية", dial: "+82" },
    { code: "my", name: "ماليزيا", dial: "+60" },
    { code: "id", name: "إندونيسيا", dial: "+62" },
    { code: "pk", name: "باكستان", dial: "+92" },
    { code: "bd", name: "بنغلاديش", dial: "+880" },
    { code: "au", name: "أستراليا", dial: "+61" },
    { code: "nz", name: "نيوزيلندا", dial: "+64" },
    { code: "br", name: "البرازيل", dial: "+55" },
    { code: "ar", name: "الأرجنتين", dial: "+54" },
    { code: "mx", name: "المكسيك", dial: "+52" },
    { code: "nl", name: "هولندا", dial: "+31" },
    { code: "be", name: "بلجيكا", dial: "+32" },
    { code: "ch", name: "سويسرا", dial: "+41" },
    { code: "se", name: "السويد", dial: "+46" },
    { code: "no", name: "النرويج", dial: "+47" },
    { code: "dk", name: "الدنمارك", dial: "+45" },
    { code: "fi", name: "فنلندا", dial: "+358" },
    { code: "at", name: "النمسا", dial: "+43" },
    { code: "gr", name: "اليونان", dial: "+30" },
    { code: "pt", name: "البرتغال", dial: "+351" },
    { code: "ir", name: "إيران", dial: "+98" },
    { code: "sg", name: "سنغافورة", dial: "+65" },
    { code: "th", name: "تايلاند", dial: "+66" },
    { code: "vn", name: "فيتنام", dial: "+84" },
    { code: "ph", name: "الفلبين", dial: "+63" },
    { code: "za", name: "جنوب إفريقيا", dial: "+27" },
    { code: "ng", name: "نيجيريا", dial: "+234" },
    { code: "ke", name: "كينيا", dial: "+254" },
];

export default function Register_account() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: "",
        age: "",
        gender: "",
        dial: "",
        educationLevel: "",
        japaneseLevel: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [verificationCode, setVerificationCode] = useState("");
    const [showVerificationField, setShowVerificationField] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const [isRegistering, setIsRegistering] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [, setDirection] = useState("ltr");

    const ageSelectRef = useRef<HTMLSelectElement | null>(null);
    const countrySelectRef = useRef<HTMLSelectElement | null>(null);
    const countrySelectDialRef = useRef<HTMLSelectElement | null>(null);
    const genderSelectRef = useRef<HTMLSelectElement | null>(null);
    const educationSelectRef = useRef<HTMLSelectElement | null>(null);
    const japaneseLevelSelectRef = useRef<HTMLSelectElement | null>(null);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCountryDial, setSelectedCountryDial] = useState("");
    const [errorCountry, setErrorCountry] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [, setError] = useState("");

    const navigate = useNavigate();

    const handleCountryChange = (countryCode: string) => {
        const country = countries.find((c) => c.code === countryCode.toLowerCase());
        const countryName = country?.name || "";
        setSelectedCountry(countryCode);
        setErrorCountry(false);
        setFormData((prev) => ({ ...prev, country: countryName }));
    };

    const handleCountryDial = (countryDial: string) => {
        const country = countries.find((c) => c.dial === countryDial);
        if (country) {
            setSelectedCountryDial(country.dial);
            setErrorCountry(false);
            setFormData((prev) => ({ ...prev, dial: country.dial }));
        }
    };

    useEffect(() => {
        const instances: Choices[] = [];
        const cleanups: (() => void)[] = [];

        const setupChoice = (
            ref: React.RefObject<HTMLSelectElement | null>,
            onSelectChange?: (val: string) => void,
            searchEnabled = false
        ) => {
            if (ref.current) {
                const instance = new Choices(ref.current, {
                    searchEnabled,
                    removeItemButton: true,
                    allowHTML: true, // تفعيل عرض عناصر HTML والأعلام
                });
                instances.push(instance);

                if (onSelectChange) {
                    const handleDOMChange = (e: Event) => {
                        const target = e.target as HTMLSelectElement;
                        onSelectChange(target.value);
                    };
                    ref.current.addEventListener("change", handleDOMChange);
                    cleanups.push(() => ref.current?.removeEventListener("change", handleDOMChange));
                }
            }
        };

        setupChoice(countrySelectRef, handleCountryChange, true);
        setupChoice(countrySelectDialRef, handleCountryDial, true);
        setupChoice(ageSelectRef, (val) => setFormData((prev) => ({ ...prev, age: val })), true);
        setupChoice(genderSelectRef, (val) => setFormData((prev) => ({ ...prev, gender: val })), false);
        setupChoice(educationSelectRef, (val) => setFormData((prev) => ({ ...prev, educationLevel: val })), false);
        setupChoice(japaneseLevelSelectRef, (val) => setFormData((prev) => ({ ...prev, japaneseLevel: val })), false);

        return () => {
            cleanups.forEach((cleanup) => cleanup());
            instances.forEach((instance) => instance.destroy());
        };
    }, []);

    useEffect(() => {
        const lang = navigator.language;
        const isArabic = lang.startsWith("ar");

        const selectElements = document.querySelectorAll("select");
        selectElements.forEach((selectElement) => {
            selectElement.style.direction = isArabic ? "rtl" : "ltr";
            selectElement.style.textAlign = isArabic ? "right" : "left";
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "password") validatePassword(value);
    };

    const validatePassword = (password: string) => {
        setPasswordCriteria({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*~\-_.]/.test(password),
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/[\u0600-\u06FF]/.test(value)) {
            setDirection("rtl");
        } else {
            setDirection("ltr");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = {
            first_name: formData.firstName,
            age: Number(formData.age),
            password_confirmation: formData.confirmPassword,
            country: formData.country,
            phone: formData.dial + formData.phone,
            education_level: formData.educationLevel,
            gender: formData.gender,
            email: formData.email,
            password: formData.password,
            japanese_level: formData.japaneseLevel,
            last_name: formData.lastName,
        };

        if (formData.email !== confirmEmail) {
            setErrorEmail("يجب أن يكون البريد الإلكتروني صحيحًا ومتطابقًا.");
            return;
        } else {
            setErrorEmail("");
        }

        if (!selectedCountry) {
            setErrorCountry(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.warning("كلمات السر غير متطابقة");
            return;
        }

        if (!Object.values(passwordCriteria).every(Boolean)) {
            setPasswordError("يجب أن تحتوي كلمة السر على ٨ أحرف على الأقل، حرف كبير واحد، حرف صغير واحد، رقم واحد، ورمز خاص.");
            return;
        } else {
            setPasswordError("");
        }

        setIsRegistering(true);

        try {
            const response = await fetch(`${APIURL}/register`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
                toast.error(`حدث خطأ: ${data.error}`);
            } else {
                toast.success("تم التسجيل بنجاح، تحقق من بريدك الإلكتروني لتفعيل الحساب");
                setShowVerificationField(true);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("تعذر الاتصال بالسيرفر");
        } finally {
            setIsRegistering(false);
        }
    };

    const handleVerification = (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        fetch(`${APIURL}/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email, otp: verificationCode }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    toast.error("رمز التحقق غير صحيح");
                } else {
                    toast.success("تم التحقق من البريد الإلكتروني بنجاح");
                    navigate("/Login_users/");
                }
            })
            .catch((error) => console.error("Error:", error))
            .finally(() => setIsVerifying(false));
    };

    const handleResetVerification = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${APIURL}/resend-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) toast.error("حصل خطأ في إعادة الإرسال");
                else toast.success("تم إعادة إرسال كود التحقق");
            })
            .catch((error) => console.error("Error:", error));
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        toast.warning("لا يُسمح بلصق النص هنا.");
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

    const inputClasses =
        "w-full p-2 h-[45px] box-border bg-white border-2 border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#8B151A] focus:border-[#8B151A] rounded-[5px] max-md:text-[20px]";
    const labelClasses = "block mb-2 font-bold text-xl md:text-2xl";
    const requiredStar = <span className="text-[#8B151A]">*</span>;

    return (
        <div className="my-3 mb-5 mx-[12px] xl:mx-[90px] [&_.choices__inner]:bg-[#f5f7f7] [&_.choices__inner]:border-[#C5A059] [&_.choices__inner]:border-2 [&_.choices__inner]:rounded-[5px] [&_.choices__inner]:text-[18px] [&_.choices__inner]:text-[#8B151A] [&_.choices__item]:text-[#8B151A] [&_.choices__list--single_.choices__item.choices__placeholder]:text-[#8B151A]">
            <div className="flex flex-col lg:flex-row-reverse">
                {/* القسم الأيسر / Header */}
                <div className="w-full lg:w-1/2 bg-[#8B151A] p-[5px] max-[600px]:p-[5px] max-lg:flex max-lg:items-center max-lg:justify-center max-lg:flex-wrap">
                    <Register_header />
                </div>

                {/* القسم الأيمن / Form */}
                <div className="w-full lg:w-1/2">
                    {!showVerificationField ? (
                        <form dir="rtl" className="max-w-[600px] mx-auto p-2.5 md:p-5" onSubmit={handleSubmit}>
                            <h1 className="font-bold text-[#8B151A] text-center mb-4 mt-4 text-2xl md:text-4xl">
                                إنشاء حساب
                            </h1>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} الاسم الشخصي:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleInputChange(e);
                                    }}
                                    className={inputClasses}
                                    style={{ direction: "rtl" }}
                                />
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} اسم العائلة:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleInputChange(e);
                                    }}
                                    className={inputClasses}
                                    style={{ direction: "rtl" }}
                                />
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} دولة الإقامة:</label>
                                <select
                                    dir="rtl"
                                    ref={countrySelectRef}
                                    value={selectedCountry}
                                    onChange={(e) => handleCountryChange(e.target.value)}
                                    className="w-full rounded-[5px]"
                                >
                                    <option value="" disabled>
                                        اختر دولة
                                    </option>
                                    {countries.map((country) => (
                                        <option
                                            key={country.code}
                                            value={country.code}
                                            dangerouslySetInnerHTML={{
                                                __html: `<span class="fi fi-${country.code} ms-2"></span> ${country.name}`,
                                            }}
                                        />
                                    ))}
                                </select>
                                {errorCountry && <span className="text-[#8B151A] text-[16px]">يرجى اختيار دولة.</span>}
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} العمر:</label>
                                <select dir="rtl" ref={ageSelectRef} name="age" required onChange={handleChange} className="w-full rounded-[5px]">
                                    <option value="">اختر العمر</option>
                                    {Array.from({ length: 100 }, (_, i) => i + 1).map((value) => (
                                        <option key={value} value={value} className="text-start text-[25px]">
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} الجنس:</label>
                                <select dir="rtl" ref={genderSelectRef} name="gender" required onChange={handleChange} className="w-full rounded-[5px]">
                                    <option value="">اختر الجنس</option>
                                    <option value="ذكر" className="text-start text-[25px]">
                                        ذكر
                                    </option>
                                    <option value="أنثى" className="text-start text-[25px]">
                                        أنثى
                                    </option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} المستوى التعليمي:</label>
                                <select dir="rtl" ref={educationSelectRef} name="educationLevel" required onChange={handleChange} className="w-full rounded-[5px]">
                                    <option value="">اختر المستوى التعليمي</option>
                                    <option value="المرحلة الابتدائية" className="text-start text-[25px]">
                                        المرحلة الابتدائية
                                    </option>
                                    <option value="المرحلة الإعدادية" className="text-start text-[25px]">
                                        المرحلة الإعدادية
                                    </option>
                                    <option value="المرحلة الثانوية" className="text-start text-[25px]">
                                        المرحلة الثانوية
                                    </option>
                                    <option value="مرحلة التعليم الجامعي" className="text-start text-[25px]">
                                        مرحلة التعليم الجامعي
                                    </option>
                                    <option value="مرحلة المعاهد المتوسطة" className="text-start text-[25px]">
                                        مرحلة المعاهد المتوسطة
                                    </option>
                                    <option value="مرحلة الدراسات العليا (ماجستير)" className="text-start text-[25px]">
                                        مرحلة الدراسات العليا (ماجستير)
                                    </option>
                                    <option value="مرحلة الدراسات العليا (دكتوراه)" className="text-start text-[25px]">
                                        مرحلة الدراسات العليا (دكتوراه)
                                    </option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} مستوى اللغة اليابانية:</label>
                                <select dir="rtl" ref={japaneseLevelSelectRef} name="japaneseLevel" required onChange={handleChange} className="w-full rounded-[5px]">
                                    <option value="">اختر مستوى اللغة اليابانية</option>
                                    {Array.from({ length: 16 }, (_, index) => `J${index + 1}`).map((value) => (
                                        <option key={value} value={value} className="text-start text-[25px]">
                                            {value}
                                        </option>
                                    ))}
                                </select>
                                <h5 className="mt-2 text-[15px] sm:text-base">
                                    يُرجى الضغط{" "}
                                    <Link to="/Level_division" className="text-[#8B151A] font-bold hover:underline">
                                        هنا
                                    </Link>{" "}
                                    للاطلاع على تفاصيل المستويات الدراسية.
                                </h5>
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>رقم الهاتف:</label>
                                <div className="flex gap-2 w-full">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`${inputClasses} flex-grow`}
                                        style={{ direction: "rtl" }}
                                    />
                                    <div className="w-1/3 min-w-[150px]">
                                        <select
                                            dir="rtl"
                                            ref={countrySelectDialRef}
                                            value={selectedCountryDial}
                                            onChange={(e) => handleCountryDial(e.target.value)}
                                            className="w-full rounded-[5px]"
                                        >
                                            <option value="" disabled>
                                                رمز الدولة
                                            </option>
                                            {countries.map((country) => (
                                                <option
                                                    key={`${country.code}-${country.dial}`}
                                                    value={country.dial}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `<span class="fi fi-${country.code} ms-2"></span> ${country.name} (${country.dial})`,
                                                    }}
                                                />
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} البريد الإلكتروني:</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    style={{ direction: "ltr" }}
                                />
                                {errorEmail && (
                                    <span className="block text-[#8B151A] text-[16px] mt-1" style={{ direction: "ltr" }}>
                                        {errorEmail}
                                    </span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} تأكيد البريد الإلكتروني:</label>
                                <input
                                    type="email"
                                    required
                                    value={confirmEmail}
                                    onPaste={handlePaste}
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                    className={inputClasses}
                                    style={{ direction: "ltr" }}
                                />
                                {errorEmail && (
                                    <span className="block text-[#8B151A] text-[16px] mt-1" style={{ direction: "ltr" }}>
                                        {errorEmail}
                                    </span>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} كلمة السر:</label>
                                <div className="relative">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleInputChange(e);
                                        }}
                                        onPaste={handlePaste}
                                        className={`${inputClasses} pr-[30px]`}
                                        style={{ direction: "ltr" }}
                                    />
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="absolute top-1/2 right-[10px] -translate-y-1/2 cursor-pointer text-[#C5A059] hover:text-[#8B151A] transition-colors"
                                    >
                                        {passwordVisible ? <FaEyeSlash size={20} /> : <IoEyeSharp size={20} />}
                                    </span>
                                </div>
                                {passwordError && <p className="text-[#8B151A] mt-1">{passwordError}</p>}

                                <ul className="mt-2.5">
                                    <li className={`text-xl mb-2.5 ${passwordCriteria.length ? "text-green-600" : "text-[#8B151A]"}`}>
                                        {passwordCriteria.length ? "- تحتوي على 8 أحرف على الأقل." : "- يجب أن تحتوي على 8 أحرف على الأقل."}
                                    </li>
                                    <li className={`text-xl mb-2.5 ${passwordCriteria.uppercase ? "text-green-600" : "text-[#8B151A]"}`}>
                                        {passwordCriteria.uppercase
                                            ? "- تحتوي على حرف كبير واحد على الأقل."
                                            : "- يجب أن تحتوي على حرف كبير واحد على الأقل."}
                                    </li>
                                    <li className={`text-xl mb-2.5 ${passwordCriteria.lowercase ? "text-green-600" : "text-[#8B151A]"}`}>
                                        {passwordCriteria.lowercase
                                            ? "- تحتوي على حرف صغير واحد على الأقل."
                                            : "- يجب أن تحتوي على حرف صغير واحد على الأقل."}
                                    </li>
                                    <li className={`text-xl mb-2.5 ${passwordCriteria.number ? "text-green-600" : "text-[#8B151A]"}`}>
                                        {passwordCriteria.number ? "- تحتوي على رقم واحد على الأقل." : "- يجب أن تحتوي على رقم واحد على الأقل."}
                                    </li>
                                    <li className={`text-xl mb-2.5 ${passwordCriteria.specialChar ? "text-green-600" : "text-[#8B151A]"}`}>
                                        {passwordCriteria.specialChar
                                            ? "- تحتوي على رمز واحد على الأقل (!@#$%^&*~-_.)."
                                            : "- يجب أن تحتوي على رمز واحد على الأقل (!@#$%^&*~-_.)."}
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} تأكيد كلمة السر:</label>
                                <div className="relative">
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleInputChange(e);
                                        }}
                                        onPaste={handlePaste}
                                        className={`${inputClasses} pr-[30px]`}
                                        style={{ direction: "ltr" }}
                                    />
                                    <span
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute top-1/2 right-[10px] -translate-y-1/2 cursor-pointer text-[#C5A059] hover:text-[#8B151A] transition-colors"
                                    >
                                        {confirmPasswordVisible ? <FaEyeSlash size={20} /> : <IoEyeSharp size={20} />}
                                    </span>
                                </div>
                            </div>

                            <button
                                className="w-full mt-4 p-2.5 bg-[#8B151A] text-white border-none rounded-[5px] cursor-pointer hover:bg-[#6c1014] transition-colors text-xl md:text-2xl font-bold"
                                type="submit"
                                disabled={isRegistering}
                            >
                                {isRegistering ? "جاري التسجيل..." : "سجل الآن"}
                            </button>
                        </form>
                    ) : (
                        /* نموذج تفعيل البريد الإلكتروني (OTP) */
                        <form dir="rtl" className="max-w-[600px] mx-auto p-2.5 md:p-5" onSubmit={handleVerification}>
                            <h2 className="font-bold text-[#8B151A] text-center mb-4 mt-4 text-2xl md:text-3xl">
                                التحقق من البريد الإلكتروني
                            </h2>
                            <p className="text-center text-gray-700 mb-6 text-lg">
                                تم إرسال رمز التحقق (OTP) إلى بريدك الإلكتروني: <br />
                                <span className="font-bold text-[#8B151A]">{formData.email}</span>
                            </p>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} رمز التحقق:</label>
                                <input
                                    type="text"
                                    required
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="أدخل الرمز هنا"
                                    className={`${inputClasses} text-center font-mono text-xl tracking-widest`}
                                    style={{ direction: "ltr" }}
                                />
                            </div>

                            <button
                                className="w-full mt-4 p-2.5 bg-[#8B151A] text-white border-none rounded-[5px] cursor-pointer hover:bg-[#6c1014] transition-colors text-xl md:text-2xl font-bold"
                                type="submit"
                                disabled={isVerifying}
                            >
                                {isVerifying ? "جاري التحقق..." : "تأكيد الرمز"}
                            </button>

                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    onClick={handleResetVerification}
                                    className="text-[#8B151A] font-bold hover:underline text-lg bg-transparent border-none cursor-pointer"
                                >
                                    إعادة إرسال رمز التحقق
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
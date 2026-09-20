import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import "flag-icons/css/flag-icons.min.css";
import Register_header from "../components/RegisterHeader";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

import { useRegister, useVerifyOtp, useResendOtp } from "../hooks/useAuthQueries"; // عدل المسار حسب مجلدك
import { parseApiError } from "../utils/handleApiError";
import { useAuth } from "../context/AuthContext";
import { countries } from "../utils/PhoneCode";

export default function Register_account() {

    // داخل المكون الخاص بك:
    const registerMutation = useRegister();
    const verifyOtpMutation = useVerifyOtp();
    const resendOtpMutation = useResendOtp();
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
    const [phoneError, setPhoneError] = useState("");
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    ;
    // حالة لحفظ أخطاء الحقول فردياً
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
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

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    console.log(fieldErrors)
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

        // 1. تهيئة اختيار الدولة مع الأعلام برمجياً
        if (countrySelectRef.current) {
            const countryInstance = new Choices(countrySelectRef.current, {
                searchEnabled: true,
                removeItemButton: true,
                allowHTML: true,
                placeholder: true,
                placeholderValue: "اختر دولة",
                itemSelectText: '',
                shouldSort: false,
            });

            countryInstance.setChoices(
                countries.map((c) => ({
                    value: c.code,
                    label: `<span class="fi fi-${c.code} ms-2 text-xl md:text-[20px]"></span> ${c.name}`,
                    selected: c.code === selectedCountry,
                })),
                "value",
                "label",
                true
            );

            const handleDOMChange = (e: Event) => {
                const target = e.target as HTMLSelectElement;
                handleCountryChange(target.value);
            };

            countrySelectRef.current.addEventListener("change", handleDOMChange);
            cleanups.push(() => countrySelectRef.current?.removeEventListener("change", handleDOMChange));
            instances.push(countryInstance);
        }

        // 2. تهيئة اختيار رمز الدولة مع الأعلام برمجياً
        if (countrySelectDialRef.current) {
            const dialInstance = new Choices(countrySelectDialRef.current, {
                searchEnabled: true,
                removeItemButton: true,
                allowHTML: true,
                placeholder: true,
                placeholderValue: "رمز الدولة",
                itemSelectText: '',
                shouldSort: false,
            });

            dialInstance.setChoices(
                countries.map((c) => ({
                    value: c.dial,
                    // تم جعل محتوى العنصر بحجم text-base بدلاً من text-xl مع ضبط اتجاه النص LTR
                    label: `<div dir="ltr" class="flex items-center gap-1.5 text-base font-medium">
                        <span class="fi fi-${c.code}"></span> 
                        <span>${c.name}</span> 
                        <span class="text-gray-500">(${c.dial})</span>
                    </div>`,
                    selected: c.dial === selectedCountryDial,
                })),
                "value",
                "label",
                true
            );

            const handleDOMChange = (e: Event) => {
                const target = e.target as HTMLSelectElement;
                handleCountryDial(target.value);
            };

            countrySelectDialRef.current.addEventListener("change", handleDOMChange);
            cleanups.push(() => countrySelectDialRef.current?.removeEventListener("change", handleDOMChange));
            instances.push(dialInstance);
        }
        // باقي عناصر الاختيار (العمر، الجنس، المستوى...)
        const setupChoice = (
            ref: React.RefObject<HTMLSelectElement | null>,
            onSelectChange?: (val: string) => void,
            searchEnabled = false
        ) => {
            if (ref.current) {
                const instance = new Choices(ref.current, {
                    searchEnabled,
                    removeItemButton: true,
                    allowHTML: true,
                    shouldSort: false,

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

        setupChoice(ageSelectRef, (val) => setFormData((prev) => ({ ...prev, age: val })), true);
        setupChoice(genderSelectRef, (val) => setFormData((prev) => ({ ...prev, gender: val })), false);
        setupChoice(educationSelectRef, (val) => setFormData((prev) => ({ ...prev, educationLevel: val })), false);
        setupChoice(japaneseLevelSelectRef, (val) => setFormData((prev) => ({ ...prev, japaneseLevel: val })), false);

        return () => {
            cleanups.forEach((cleanup) => cleanup());
            instances.forEach((instance) => instance.destroy());
        };
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

    // 1. دالة التحقق من الكود OTP
    const handleVerification = (e: React.FormEvent) => {
        e.preventDefault();

        verifyOtpMutation.mutate(
            { email: formData.email, otp: verificationCode },
            {
                onSuccess: (data) => {
                    toast.success("تم التحقق من البريد الإلكتروني بنجاح");

                    if (data?.token) localStorage.setItem('token', data.token);
                    if (setIsAuthenticated) setIsAuthenticated(true);

                    navigate('/home');
                },
                onError: (error) => {
                    const parsed = parseApiError(error);

                    if (parsed.isValidation) {
                        // تخزين الأخطاء لتظهر تحت كل حقل
                        setFieldErrors(parsed.errors);
                        toast.error(parsed.message);
                    } else {
                        // عرض إشعار بالخطأ العام
                        toast.error(parsed.message);
                    }
                },
            }
        );
    };

    // 2. دالة إعادة إرسال الكود OTP
    const handleResetVerification = (e: React.FormEvent) => {
        e.preventDefault();

        resendOtpMutation.mutate(
            { email: formData.email },
            {
                onSuccess: () => {
                    toast.success("تم إعادة إرسال كود التحقق");
                },
                onError: (error) => {
                    const parsed = parseApiError(error);

                    if (parsed.isValidation) {
                        // تخزين الأخطاء لتظهر تحت كل حقل
                        setFieldErrors(parsed.errors);
                        toast.error(parsed.message);
                    } else {
                        // عرض إشعار بالخطأ العام
                        toast.error(parsed.message);
                    }
                },
            }
        );
    };

    // 3. دالة إرسال نموذج التسجيل
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // التحققات الأولية (Validations)
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

        if (formData.phone && selectedCountry) {
            const fullPhoneNumber = `${formData.dial}${formData.phone}`;
            const valid = isValidPhoneNumber(fullPhoneNumber, selectedCountry.toUpperCase() as CountryCode);
            if (!valid) {
                setPhoneError("رقم الهاتف غير صحيح للدولة المحددة.");
                return;
            }
        }
        setPhoneError("");

        if (formData.password !== formData.confirmPassword) {
            toast.warning("كلمات السر غير متطابقة");
            return;
        }

        if (!Object.values(passwordCriteria).every(Boolean)) {
            setPasswordError("يجب أن تحتوي كلمة السر على جميع الشروط الموضحة بالأسفل.");
            return;
        } else {
            setPasswordError("");
        }

        const payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            age: Number(formData.age),
            country: formData.country,
            gender: formData.gender,
            education_level: formData.educationLevel,
            japanese_level: formData.japaneseLevel,
            phone: `${formData.dial}${formData.phone}`,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
        };

        // تنفيذ الـ Mutation
        registerMutation.mutate(payload, {
            onSuccess: () => {
                toast.success("تم التسجيل بنجاح، تحقق من بريدك الإلكتروني لتفعيل الحساب");
                setShowVerificationField(true);
            },
            onError: (error) => {
                const parsed = parseApiError(error);

                if (parsed.isValidation) {
                    // تخزين الأخطاء لتظهر تحت كل حقل
                    setFieldErrors(parsed.errors);
                    toast.error(parsed.message);
                } else {
                    // عرض إشعار بالخطأ العام
                    toast.error(parsed.message);
                }
            },
        });
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        toast.warning("لا يُسمح بلصق النص هنا.");
    };

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

    const inputClasses =
        "w-full p-2 h-[45px] box-border bg-white border-2 border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#8B151A] focus:border-[#8B151A] rounded-[5px] text-xl md:text-[25px]";
    const labelClasses = "block mb-2 font-bold text-xl md:text-2xl";
    const requiredStar = <span className="text-[#8B151A]">*</span>;
    useEffect(() => {
        if (showVerificationField === true) {
            // قفز ناعم (Smooth) لأعلى الصفحة
            window.scrollTo({
                top: 0,
                behavior: "smooth", // يجعل الحركة سلسة وليست قفزة مفاجئة
            });
        }
    }, [showVerificationField]);
    return (
        <div className="my-3 mb-5 mx-[12px] xl:mx-[90px] [&_.choices__inner]:bg-[#f5f7f7] [&_.choices__inner]:border-[#C5A059] [&_.choices__inner]:border-2 [&_.choices__inner]:rounded-[5px] [&_.choices__inner]:text-[20px] [&_.choices__inner]:text-[#8B151A] [&_.choices__item]:text-[#8B151A] [&_.choices__list--single_.choices__item.choices__placeholder]:text-[#8B151A]">
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    className={inputClasses}
                                    style={{ direction: "rtl" }}
                                />
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} دولة الإقامة:</label>
                                <select
                                    ref={countrySelectRef}
                                    className={`${inputClasses} w-full rounded-[5px] text-xl`}
                                ></select>
                                {errorCountry && <span className="text-[#8B151A] text-[16px]">يرجى اختيار دولة.</span>}
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} العمر:</label>
                                <select
                                    dir="rtl"
                                    ref={ageSelectRef}
                                    name="age"
                                    required
                                    onChange={handleChange}
                                    className={`${inputClasses} w-full rounded-[5px] text-xl`}
                                >
                                    <option value="" disabled selected hidden className="text-xl">اختر العمر</option>
                                    {Array.from({ length: 100 }, (_, i) => i + 1).map((value) => (
                                        <option key={value} value={value} className="text-start text-xl">
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} الجنس:</label>
                                <select
                                    dir="rtl"
                                    ref={genderSelectRef}
                                    name="gender"
                                    required
                                    onChange={handleChange}
                                    className={`${inputClasses} w-full rounded-[5px] text-xl`}
                                >
                                    <option value="" disabled selected hidden className="text-xl">اختر الجنس</option>
                                    <option value="ذكر" className="text-start text-xl">ذكر</option>
                                    <option value="أنثى" className="text-start text-xl">أنثى</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} المستوى التعليمي:</label>
                                <select
                                    dir="rtl"
                                    ref={educationSelectRef}
                                    name="educationLevel"
                                    required
                                    onChange={handleChange}
                                    className={`${inputClasses} w-full rounded-[5px] text-xl`}
                                >
                                    <option value="" disabled selected hidden className="text-xl">اختر المستوى التعليمي</option>
                                    <option value="المرحلة الابتدائية" className="text-start text-xl">المرحلة الابتدائية</option>
                                    <option value="المرحلة الإعدادية" className="text-start text-xl">المرحلة الإعدادية</option>
                                    <option value="المرحلة الثانوية" className="text-start text-xl">المرحلة الثانوية</option>
                                    <option value="مرحلة التعليم الجامعي" className="text-start text-xl">مرحلة التعليم الجامعي</option>
                                    <option value="مرحلة المعاهد المتوسطة" className="text-start text-xl">مرحلة المعاهد المتوسطة</option>
                                    <option value="مرحلة الدراسات العليا (ماجستير)" className="text-start text-xl">مرحلة الدراسات العليا (ماجستير)</option>
                                    <option value="مرحلة الدراسات العليا (دكتوراه)" className="text-start text-xl">مرحلة الدراسات العليا (دكتوراه)</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className={labelClasses}>{requiredStar} مستوى اللغة اليابانية:</label>
                                <select
                                    dir="rtl"
                                    ref={japaneseLevelSelectRef}
                                    name="japaneseLevel"
                                    required
                                    onChange={handleChange}
                                    className={`${inputClasses} w-full rounded-[5px] text-xl`}
                                >
                                    <option value="" disabled selected hidden className="text-xl">اختر مستوى اللغة اليابانية</option>
                                    {Array.from({ length: 16 }, (_, index) => `J${index + 1}`).map((value) => (
                                        <option key={value} value={value} className="text-start text-xl">
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
                                    {/* حقل ادخال رقم الهاتف */}
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`${inputClasses} flex-grow h-[52px]`}
                                        style={{ direction: "ltr" }}
                                    />

                                    {/* حقل رمز الدولة (مصغر وباتجاه LTR) */}
                                    <div className="w-1/3 min-w-[180px] dir-ltr-dial [&_.choices__inner]:!text-base [&_.choices__item]:!text-base [&_.choices__list--dropdown_.choices__item]:!text-base">
                                        <select
                                            ref={countrySelectDialRef}
                                            dir="ltr"
                                            className={`${inputClasses} w-full rounded-[5px] text-base`}
                                        ></select>
                                    </div>
                                </div>
                                {phoneError && <span className="text-[#8B151A] text-[16px] mt-1 block">{phoneError}</span>}
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
                                    <span className="block text-[#8B151A] text-[16px] mt-1" style={{ direction: "rtl" }}>
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
                                        onChange={handleChange}
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

                                <ul className="mt-2.5 text-xl md:text-2xl">
                                    <li className={passwordCriteria.length ? "text-green-600" : "text-[#8B151A]"}>
                                        {passwordCriteria.length ? "✓ تحتوي على 8 أحرف على الأقل." : "• يجب أن تحتوي على 8 أحرف على الأقل."}
                                    </li>
                                    <li className={passwordCriteria.uppercase ? "text-green-600" : "text-[#8B151A]"}>
                                        {passwordCriteria.uppercase ? "✓ تحتوي على حرف كبير واحد على الأقل." : "• يجب أن تحتوي على حرف كبير واحد على الأقل."}
                                    </li>
                                    <li className={passwordCriteria.lowercase ? "text-green-600" : "text-[#8B151A]"}>
                                        {passwordCriteria.lowercase ? "✓ تحتوي على حرف صغير واحد على الأقل." : "• يجب أن تحتوي على حرف صغير واحد على الأقل."}
                                    </li>
                                    <li className={passwordCriteria.number ? "text-green-600" : "text-[#8B151A]"}>
                                        {passwordCriteria.number ? "✓ تحتوي على رقم واحد على الأقل." : "• يجب أن تحتوي على رقم واحد على الأقل."}
                                    </li>
                                    <li className={passwordCriteria.specialChar ? "text-green-600" : "text-[#8B151A]"}>
                                        {passwordCriteria.specialChar ? "✓ تحتوي على رمز خاص واحد على الأقل." : "• يجب أن تحتوي على رمز خاص واحد على الأقل (!@#$%^&*~-_.)."}
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
                                        onChange={handleChange}
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
                                type="submit"
                                disabled={registerMutation.isPending}
                                className="w-full h-[50px] bg-[#8B151A] text-white font-bold text-xl rounded-[5px] mt-4 hover:bg-[#6e1014] transition-colors disabled:bg-gray-400"
                            >
                                {registerMutation.isPending ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                            </button>
                        </form>
                    ) : (
                        <form dir="rtl" className="max-w-[500px] mx-auto p-5 mt-10" onSubmit={handleVerification}>
                            <h2 className="font-bold text-[#8B151A] text-center mb-4 text-2xl md:text-3xl">
                                تأكيد البريد الإلكتروني
                            </h2>
                            <p className="text-center mb-6 text-lg text-gray-700">
                                تم إرسال رمز التحقق إلى: <strong className="text-[#8B151A]">{formData.email}</strong>
                            </p>

                            <div className="mb-4">
                                <label className={labelClasses}>رمز التحقق (OTP):</label>
                                <input
                                    type="text"
                                    required
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className={`${inputClasses} text-center tracking-widest text-2xl`}
                                    maxLength={6}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={registerMutation.isPending}
                                className="w-full h-[50px] bg-[#8B151A] text-white font-bold text-xl rounded-[5px] mt-2 hover:bg-[#6e1014] transition-colors disabled:bg-gray-400"
                            >
                                {registerMutation.isPending ? "جاري التحقق..." : "تأكيد الحساب"}
                            </button>

                            <button
                                type="button"
                                disabled={resendOtpMutation.isPending}
                                onClick={handleResetVerification}
                                className="w-full text-center text-[#8B151A] font-bold mt-4 hover:underline block disabled:bg-gray-400"
                            >
                                {resendOtpMutation.isPending ? "جاري إعادة إرسال الرمز..." : "إعادة إرسال رمز التحقق"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
import { RiHomeOfficeLine } from "react-icons/ri";
import { FaMobileAlt, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaHandshake, FaHome, FaCommentAlt, FaQuestionCircle } from "react-icons/fa";
import { MdEmail, MdPrivacyTip, MdLibraryBooks } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { FaCashRegister, FaBook, FaUserGroup, FaMicrophoneLines } from "react-icons/fa6";
import { GrMoreVertical } from "react-icons/gr";
import { Link } from "react-router-dom";
// import DesktopViewButton from "./DesktopViewButton";

export default function Footer() {
  // متغيرات مجمعة لتسهيل قراءة الكود وتقليل التكرار
  const linkClass = "flex items-center text-black text-[20px] font-bold leading-[2.5] hover:text-[#2a0303] transition-colors";
  const iconClass = "ml-2.5 text-red-600 text-[20px]";
  const contactListClass = "mb-2 text-black font-bold text-[20px] hover:opacity-80 transition-opacity flex items-center gap-2";

  return (
    <footer className="bg-[#f0d7d1]" dir="rtl">
      <div className="text-white text-center lg:text-right">
        <div className="max-w-[1170px] mx-auto p-3 relative">
          <div className="mt-5 max-[877px]:mt-0">
            {/* المحتوى الرئيسي للفوتر */}
            <div className="flex flex-wrap min-[878px]:flex-row max-[877px]:flex-col-reverse justify-between text-start gap-[30px]">

              <div className="flex flex-col md:flex-row flex-wrap justify-between flex-1 w-full">

                {/* قسم التواصل */}
                <div className="pl-[30px] max-[877px]:pl-0">
                  <ul className="list-none leading-loose text-start m-0 p-0">
                    <li>
                      <a href="tel:+81050-6866-1791" className={contactListClass}>
                        <RiHomeOfficeLine className="text-[20px]" /> رقم الهاتف: 1791-6866-050
                      </a>
                    </li>
                    <li>
                      <a href="tel:+81090-1840-9625" className={contactListClass}>
                        <FaMobileAlt className="text-[20px]" /> رقم المحمول: 819018409625+
                      </a>
                    </li>
                    <li>
                      <a href="https://wa.link/3zzbvj" className={contactListClass}>
                        <FaWhatsapp className="text-[20px]" /> واتساب: 819018409625+
                      </a>
                    </li>
                    <li>
                      <a href="https://line.me/ti/p/IuAqVt59QV" className={contactListClass}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0M5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.15.15 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157m.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832l-.013-.015v-.001l-.01-.01-.003-.003-.011-.009h-.001L7.88 4.79l-.003-.002-.005-.003-.008-.005h-.002l-.003-.002-.01-.004-.004-.002-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.2.2 0 0 0 .039.038l.001.001.01.006.004.002.008.004.007.003.005.002.01.003h.003a.2.2 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.16.16 0 0 0-.108.044h-.001l-.001.002-.002.003a.16.16 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.16.16 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z" />
                        </svg>
                        لاين: 819018409625+
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@japaneseacademy.jp" className={contactListClass}>
                        <MdEmail className="text-[20px]" /> info@japaneseacademy.jp
                      </a>
                    </li>
                  </ul>

                  {/* أيقونات التواصل الاجتماعي */}
                  <div className="flex items-center gap-4 mt-4">
                    <a href="" className="text-[#2a0303] hover:opacity-80"><FaFacebook className="text-2xl" /></a>
                    <a href="" className="text-[#2a0303] hover:opacity-80"><FaWhatsapp className="text-2xl" /></a>
                    <a href="" className="text-[#2a0303] hover:opacity-80"><FaTwitter className="text-2xl" /></a>
                    <a href="" className="text-[#2a0303] hover:opacity-80"><FaInstagram className="text-2xl" /></a>
                  </div>
                </div>

                {/* قسم الروابط مقسم لـ 3 مجموعات */}
                <div className="flex flex-wrap justify-between gap-[30px] max-[877px]:border-t-2 max-[877px]:border-[#2a0303] max-[877px]:mt-5 max-[877px]:pt-5 max-[551px]:gap-x-0.5 max-[551px]:gap-y-0 w-full min-[878px]:w-auto flex-1 min-[878px]:mr-8">

                  <ul className="list-none p-0 m-0">
                    <li><Link className={linkClass} to="/"><FaHome className={iconClass} /> الصفحة الرئيسية</Link></li>
                    <li><Link className={linkClass} to="/Level_division"><MdLibraryBooks className={iconClass} /> المستويات الدراسية</Link></li>
                    <li><Link className={linkClass} to="/Fees"><BsCashCoin className={iconClass} /> الرسوم الدراسية</Link></li>
                    <li><Link className={linkClass} to="/Teachers"><FaUserGroup className={iconClass} /> الهيئة التدريسية</Link></li>
                    <li><Link className={linkClass} to="/Register"><FaCashRegister className={iconClass} /> طريقة التسجيل</Link></li>
                  </ul>

                  <ul className="list-none p-0 m-0">
                    <li><Link className={linkClass} to="/Study_materials"><FaBook className={iconClass} /> المواد الدراسية</Link></li>
                    <li><Link className={linkClass} to="/Questions"><FaQuestionCircle className={iconClass} /> الأسئلة الشائعة</Link></li>
                    <li><Link className={linkClass} to="/Comments"><FaCommentAlt className={iconClass} /> آراء الطلاب</Link></li>
                    <li><Link className={linkClass} to="/More_services"><GrMoreVertical className={iconClass} /> خدمات إضافية</Link></li>
                    <li><Link className={linkClass} to="/Support"><FaMicrophoneLines className={iconClass} /> الدعم الفني</Link></li>
                  </ul>

                  <ul className="list-none p-0 m-0">
                    <li><Link className={linkClass} to="/Privacy"><MdPrivacyTip className={iconClass} /> سياسة الخصوصية</Link></li>
                    <li><Link className={linkClass} to="/Terms"><FaHandshake className={iconClass} /> شروط الاستخدام</Link></li>
                  </ul>

                </div>
              </div>

              {/* قسم الشعار */}
              <div className="max-[877px]:mx-auto flex-shrink-0">
                <img className="w-[15rem] object-contain" src={'/logo.png'} alt="Logo" />
              </div>

            </div>
          </div>
        </div>

        {/* الشريط السفلي للحقول */}
        <div className="bg-[#2a0303] p-3 text-center">
          <ul className="p-0 m-0 flex flex-wrap justify-center items-center gap-4 max-[650px]:justify-evenly list-none">
            <li>
              <span className="text-white text-[15px]">
                جميع الحقوق محفوظة © {new Date().getFullYear()} لأكاديمية اللغة اليابانية
              </span>
            </li>
            <li className="hidden max-[650px]:block">
              {/* <DesktopViewButton /> */}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
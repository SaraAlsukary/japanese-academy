import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

// استيراد الصور
import img_fees from "../assets/Ai_img/73a4c5e5-2e9c-40f3-8260-f94d1fb42248.webp";
import pay1 from "../assets/pay/bank-icon-removebg-preview.png";
import pay2 from "../assets/pay/R-removebg-preview.png";
import pay3 from "../assets/pay/R.png";
import pay4 from "../assets/pay/R (1).png";
import pay5 from "../assets/pay/R (3).png";

export default function Fees_material() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Dash_users/:userId");
    } else {
      navigate("/Login_users");
    }
  };

  const paymentMethods = [pay1, pay2, pay3, pay4, pay5];

  return (
    <div className="container mx-auto px-4 py-10 font-sans text-right" dir="rtl">
      
      {/* ================= قسم المقدمة والتعريف بالرسوم ================= */}
      <div className="mb-12 rounded-3xl p-6 md:p-10 shadow-2xl border border-amber-500/30 text-white" id="Fees">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-red border-b-2 border-rand-red pb-3 inline-block">
              الرسوم:
            </h2>
            <p className="text-black text-3xl leading-relaxed">
              في <span className="text-brand-red font-bold">أكاديمية اللغة اليابانية،</span>{" "}
              نؤمن بأن فرصة تعلم اللغة اليابانية يجب أن تكون متاحة للجميع، بغض النظر عن الظروف المالية أو المعيشية. لذلك، لا تسعى الأكاديمية لتحقيق أي ربح مادي، بل تهدف إلى تمكين الطلاب من تعلم اللغة اليابانية بأعلى مستوى من الجودة والإتقان. وتضع أكاديمية اللغة اليابانية أولوياتها في توفير الفرصة لأولئك الذين يجدون صعوبة في الوصول إلى المراكز التعليمية أو الجامعات التي تقوم بتقديم برامج تعليمية متخصصة في اللغة اليابانية حول العالم.
            </p>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group w-full">
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-red-600 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500"></div> */}
              <img className="relative rounded-2xl shadow-xl w-full max-h-[600px] object-cover border-2 border-amber-500/50" src={img_fees} alt="أكاديمية اللغة اليابانية" />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4  text-black leading-relaxed border-t border-amber-500/20 pt-6 text-xl md:text-3xl">
          <p>
            وبناءً على هذه الرؤية، يتم تحديد الرسوم الدراسية في{" "}
            <span className="text-amber-400 font-bold">أكاديمية اللغة اليابانية</span>{" "}
            بشكل رمزي، بحيث تغطي فقط النفقات الإدارية الأساسية. حيث يعمل المدرسون بشكل شبه تطوعي رغبةً منهم في تعليم اللغة اليابانية لمن يرغب في تعلمها، مما يعكس التزام الأكاديمية بتقديم تعليم عالي الجودة دون أن يكون الهدف من ورائه تحقيق أرباح مادية.
          </p>
          <p>
            وإضافة إلى ذلك، تسعى{" "}
            <span className="text-amber-400 font-bold">أكاديمية اللغة اليابانية</span>{" "}
            إلى دعم الطلاب المتميزين من خلال تقديم منح دراسية خاصة. حيث يتم منح الطالب المتفوق في كل مستوى فرصة استكمال دراسته في المستوى الأعلى على نفقة الأكاديمية، ودون الحاجة إلى دفع أي رسوم دراسية إضافية.
          </p>
          <p>
            كما نولي في{" "}
            <span className="text-amber-400 font-bold">أكاديمية اللغة اليابانية</span>{" "}
            اهتمامًا خاصًا بالطلاب الذين يعيشون في مناطق النزاعات أو في ظروف صعبة قد تمنعهم من دفع الرسوم الدراسية. لذا فإن الأكاديمية تقوم بتقديم منح دراسية لهذه الفئة من الطلاب.
          </p>
          <p>
            ومن خلال هذه السياسات، تهدف{" "}
            <span className="text-amber-400 font-bold">أكاديمية اللغة اليابانية</span>{" "}
            إلى جعل فرصة تعلم اللغة اليابانية متاحةً لأكبر عدد ممكن من الطلاب حول العالم، وتقديم بيئة تعليمية عادلة ومتساوية.
          </p>
          <p>
            في <span className="text-amber-400 font-bold">أكاديمية اللغة اليابانية</span>{" "}
            يتم تحديد نفس الرسوم الدراسية لجميع المستويات، ونعمل على توفير برامج تعليمية متنوعة تلبي مختلف الاحتياجات، مع مراعاة توفير باقات مرنة للطلاب، بحيث يمكن الاختيار بين الاشتراك في كل مستوى على حدى، أو الاشتراك في باقة شاملة لكل المستويات برسوم مخفَّضة.
          </p>
        </div>
      </div>

      {/* ================= قائمة المستويات والباقات (Grid) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ---- المستوى J1 ---- */}
        <div className="bg-white rounded-2xl p-6 shadow-md border-r-4 border-r-amber-500 border border-red-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-4xl font-bold text-red-950 mb-3 border-b border-red-100 pb-2">
              المستوى المبتدئ الأساسي (J1)
            </h2>
            <p className="text-gray-700 leading-relaxed text-md md:text-2xl space-y-2">
              سيبدأ الطلاب في هذا المستوى بتعلم أساسيات اللغة اليابانية من الصفر. سيتعلمون الحروف اليابانية الأساسية مثل الهيراغانا والكاتاكانا، بالإضافة إلى النطق الصحيح للأصوات اليابانية. كما سيتمكنون من التعريف بأنفسهم، إلقاء التحيات، وتقديم المعلومات الشخصية البسيطة.

              <span className="block font-bold text-red-900 mt-4 mb-2  border-r-2 border-amber-500 pr-2 text-md md:text-2xl"> الأهداف: </span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> تعلم الحروف الأساسية (الهيراغانا والكاتاكانا)</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> تعلم كيفية التعريف بالنفس باستخدام جمل اسمية بسيطة</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> فهم القواعد النحوية الأساسية مثل تركيب الجمل الاسمية البسيطة</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> اكتساب مفردات أساسية تتعلق بالتحيات، العمل، الأنشطة اليومية</span>

              <span className="block mt-4">
                <strong className="text-red-900">عدد الساعات الدراسية:</strong> 30 ساعة دراسية، بمعدل حصتين أسبوعيًا، وساعة ونصف لكل حصة.
              </span>
              <span className="block">
                <strong className="text-red-900">عدد الطلاب في كل فصل دراسي:</strong> 4 طلاب كحد أدنى و10 طلاب كحد أقصى.
              </span>
              <span className="block">
                <strong className="text-red-900">الرسوم الدراسية:</strong> 30,000 ين ياباني أو ما يعادلها بعملة الدولة التي يقيم فيها الطالب.
              </span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-md md:text-2xl">
            <strong className="text-red-900">التسجيل في هذا المستوى:</strong>{" "}
            يُرجى الضغط <Link to="/Register_account" className="text-amber-600 hover:text-red-800 font-bold underline transition-colors">هنا</Link> للانتقال إلى صفحة التسجيل.
          </div>
        </div>

        {/* ---- المستوى J2 ---- */}
        <div className="bg-white rounded-2xl p-6 shadow-md border-r-4 border-r-amber-500 border border-red-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-4xl font-bold text-red-950 mb-3 border-b border-red-100 pb-2">
              المستوى المبتدئ المتوسط (J2)
            </h2>
            <p className="text-gray-700 leading-relaxed text-md md:text-2xl space-y-2">
              سيستمر الطلاب في هذا المستوى في تعلم المفردات والجمل الأكثر تعقيدًا. سيتعلمون كيفية طرح الأسئلة واستخدام الأفعال في الزمن الماضي والمستقبل. كما سيكتسبون القدرة على التفاعل بشكل أفضل في المواقف اليومية مثل التسوق أو طلب الطعام في المطاعم.

              <span className="block font-bold text-red-900 mt-4 mb-2 text-md md:text-2xl border-r-2 border-amber-500 pr-2"> الأهداف: </span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> تعلم صيغة الماضي والمستقبل للأفعال</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> تعلم كيفية طرح الأسئلة باستخدام أدوات الاستفهام</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> توسيع القدرة على فهم المحادثات اليومية البسيطة</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> تعلم 40 حرف كانجي قراءةً وكتابةً</span>

              <span className="block mt-4">
                <strong className="text-red-900">عدد الساعات الدراسية:</strong> 30 ساعة دراسية، بمعدل حصتين أسبوعيًا، وساعة ونصف لكل حصة.
              </span>
              <span className="block">
                <strong className="text-red-900">عدد الطلاب في كل فصل دراسي:</strong> 4 طلاب كحد أدنى و10 طلاب كحد أقصى.
              </span>
              <span className="block">
                <strong className="text-red-900">الرسوم الدراسية:</strong> 30,000 ين ياباني أو ما يعادلها بعملة الدولة التي يقيم فيها الطالب.
              </span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-md md:text-2xl">
            <strong className="text-red-900">التسجيل في هذا المستوى:</strong>{" "}
            يُرجى الضغط <Link to="/Register_account" className="text-amber-600 hover:text-red-800 font-bold underline transition-colors">هنا</Link> للانتقال إلى صفحة التسجيل.
          </div>
        </div>

        {/* ---- المستوى J16 ---- */}
        <div className="bg-white rounded-2xl p-6 shadow-md border-r-4 border-r-amber-500 border border-red-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-4xl font-bold text-red-950 mb-3 border-b border-red-100 pb-2">
              المستوى الاحترافي المتقدم (J16)
            </h2>
            <p className="text-gray-700 leading-relaxed text-md md:text-2xl space-y-2">
              هذا المستوى يركز على تطوير القدرة على استخدام اللغة اليابانية في البيئات الأكاديمية والمهنية المتقدمة. سيتعلم الطلاب كيفية التحدث عن القضايا المعقدة مثل السياسة أو الاقتصاد، وكيفية كتابة تقارير وتحليلات احترافية. 

              <span className="block font-bold text-red-900 mt-4 mb-2 text-md md:text-2xl border-r-2 border-amber-500 pr-2"> التركيز: </span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> التحدث عن القضايا السياسية والاقتصادية المتقدمة</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> كتابة تحليلات وتقارير احترافية</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> تعلم اللغة المتخصصة في الاقتصاد والسياسة</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-amber-500 shrink-0" /> تطوير المهارات البحثية باستخدام اللغة اليابانية</span>

              <span className="block mt-4">
                <strong className="text-red-900">عدد الساعات الدراسية:</strong> 30 ساعة دراسية، بمعدل حصتين أسبوعيًا، وساعة ونصف لكل حصة.
              </span>
              <span className="block">
                <strong className="text-red-900">عدد الطلاب في كل فصل:</strong> 4 طلاب كحد أدنى و10 طلاب كحد أقصى.
              </span>
              <span className="block">
                <strong className="text-red-900">الرسوم الدراسية:</strong> 30,000 ين ياباني أو ما يعادلها بعملة الدولة التي يقيم فيها الطالب.
              </span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-md md:text-2xl">
            <strong className="text-red-900">التسجيل في هذا المستوى:</strong>{" "}
            يُرجى الضغط <Link to="/Register_account" className="text-amber-600 hover:text-red-800 font-bold underline transition-colors">هنا</Link> للانتقال إلى صفحة التسجيل.
          </div>
        </div>

        {/* ---- باقة المستويات الاحترافية ---- */}
        <div className="bg-gradient-to-br from-white to-amber-50/40 rounded-2xl p-6 shadow-md border-r-4 border-r-red-900 border border-amber-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-4xl font-bold text-red-950 mb-3 border-b border-amber-200 pb-2 flex items-center gap-2">
              باقة المستويات الاحترافية
              <span className="bg-amber-100 text-amber-800 text-md xl:text-xl px-2 py-1 rounded-full font-bold">باقة شاملة</span>
            </h2>
            <p className="text-gray-700 leading-relaxed text-md md:text-2xl space-y-2">
              تغطي هذه الباقة جميع المستويات من J13 حتى J16، مما يسمح للطلاب بتطوير مهاراتهم في التفاعل مع المجتمع الياباني في بيئات أكاديمية ومهنية متقدمة. سيتعلم الطلاب كيفية التعامل مع موضوعات معقدة ومهام متخصصة في العمل والأبحاث الأكاديمية.

              <span className="block font-bold text-red-900 mt-4 mb-2 text-md md:text-2xl border-r-2 border-amber-500 pr-2"> التركيز: </span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-red-700 shrink-0" /> تحسين مهارات التفاوض والإدارة في البيئات الاحترافية</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-red-700 shrink-0" /> تعلم كتابة التقارير الأكاديمية والاحترافية</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-red-700 shrink-0" /> التعامل مع المواضيع المعقدة في السياسة والاقتصاد</span>
              <span className="flex items-center gap-2 text-gray-800"><FaCheck className="text-red-700 shrink-0" /> تحسين مهارات التواصل الأكاديمي مع المتحدثين الأصليين</span>

              <span className="block mt-4">
                <strong className="text-red-900">عدد الساعات الدراسية:</strong> 120 ساعة دراسية، بمعدل حصتين أسبوعيًا، وساعة ونصف لكل حصة.
              </span>
              <span className="block">
                <strong className="text-red-900">الرسوم الدراسية:</strong> 100,000 ين ياباني أو ما يعادلها بعملة الدولة التي يقيم فيها الطالب.
              </span>
            </p>
          </div>
          <div className="mt-4 pt-3 text-md md:text-2xl border-t border-amber-200/50 ">
            <strong className="text-red-900">التسجيل في هذه الباقة:</strong>{" "}
            يُرجى الضغط <Link to="/Register_account" className="text-red-700 hover:text-red-900 font-bold underline transition-colors">هنا</Link> للانتقال إلى صفحة التسجيل.
          </div>
        </div>

      </div> 
      {/* ================= نهاية شبكة المستويات ================= */}

      {/* ================= قسم وسائل الدفع ================= */}
      <div className="mt-16 mb-12 text-center">
        <h2 className="text-xl md:text-4xl font-extrabold text-red-950 mb-8 inline-block border-b-2 border-amber-500/40 pb-3">
          وسائل الدفع المتاحة:
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {paymentMethods.map((imgSrc, index) => (
            <div 
              key={index}
              onClick={handleRedirect}
              className="w-36 h-16 md:w-40 md:h-20 bg-white rounded-xl shadow-sm border border-gray-200 bg-contain bg-center bg-no-repeat cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-amber-400 transition-all duration-300"
              style={{ backgroundImage: `url('${imgSrc}')` }}
            ></div>
          ))}
        </div>
      </div>

      {/* ================= قسم الملاحظات ================= */}
      <div className="mt-10 bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
        <div className="bg-red-950 px-6 py-4 border-b border-amber-500/30">
          <h3 className="text-xl md:text-4xl font-bold text-amber-400 flex items-center gap-2">
            <span className="text-2xl">📌</span> ملاحظات هامة:
          </h3>
        </div>
        
        <ul className="p-6 space-y-4">
          <li className="flex items-start gap-3 bg-red-50/40 p-4 rounded-xl border border-red-100/50 text-gray-800 text-xl md:text-3xl leading-relaxed">
            <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
            عند وصول عدد الطلاب المسجلين في نفس المستوى إلى 11 طالبًا أو أكثر، يتم تقسيم الطلاب على فصلين دراسيين أو أكثر، وفقًا لعدد الطلاب المسجلين في نفس المستوى.
          </li>
          <li className="flex items-start gap-3 bg-red-50/40 p-4 rounded-xl border border-red-100/50 text-gray-800 text-xl md:text-3xl leading-relaxed">
            <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
            تتضمن جميع الرسوم الوصول إلى المواد الدراسية الرقمية، التمارين التفاعلية، والدعم المباشر مع الأساتذة.
          </li>
          <li className="flex items-start gap-3 bg-red-50/40 p-4 rounded-xl border border-red-100/50 text-gray-800 text-xl md:text-3xl leading-relaxed">
            <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
            لا يمكن استرجاع الرسوم الدراسية بعد بدء الدورة الدراسية.
          </li>
          <li className="flex items-start gap-3 bg-red-50/40 p-4 rounded-xl border border-red-100/50 text-gray-800 text-xl md:text-3xl leading-relaxed">
            <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
            يمكن استرجاع 25% من الرسوم الدراسية عند الاشتراك في إحدى باقات المستويات الشاملة.
          </li>
        </ul>
      </div>

    </div>
  );
}
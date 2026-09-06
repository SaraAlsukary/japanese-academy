import { motion, type Variants } from "framer-motion";
import img_header from "../assets/Ai_img/_c44c06cf-5421-4193-b9bb-cd39a86e679f.webp";
import img_what_we_do from "../assets/imgheader/_dcdcbe88-4c28-4699-bb82-1d2754efe109.webp";
import img_why_we_choos from "../assets/imgheader/_993a5416-0b18-4ddb-869a-a5b99532ffe5.webp";
import vision_img from "../assets/imgheader/_fa1d11a6-f7f0-49d6-8ba9-5ea0abd69afe.webp";
import letter_img from "../assets/imgheader/_9e9b0610-8fca-4c60-8d4d-d734e8182c46.webp";

export default function Header() {
  // تصميم البطاقات بحدود ذهبية خفيفة وخلفية زجاجية
  const cardStyle = "p-6 md:p-10 mt-6 mb-10 rounded-2xl bg-white/85 backdrop-blur-sm border border-brand-gold/30 shadow-lg text-right relative overflow-hidden z-10";

  // إعدادات الحركة المحددة بـ Variants لإصلاح خطأ TypeScript
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <>
      <div
        dir="rtl"
        className="w-full relative overflow-hidden bg-gradient-to-b from-brand-red/5 via-white to-brand-gold/10 text-brand-black text-lg md:text-xl lg:text-2xl leading-[2.2] text-right py-10"
      >

        {/* أشكال خلفية ضبابية بألوان الهوية */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 w-[30rem] h-[30rem] bg-brand-gold/15 rounded-full blur-3xl -z-10 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl -z-10 translate-y-1/2"></div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[90px]">

          {/* قسم التعريف بالأكاديمية */}
          <motion.div
            className={cardStyle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* items-start تجعل محاذاة النص والصورة تبدأ من الأعلى */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <motion.div variants={fadeInRight}>
                <div className="mb-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-red mb-6">
                    أكاديمية اللغة اليابانية
                  </h2>
                </div>
                <div className="text-brand-black text-lg md:text-xl lg:text-2xl leading-[2.2]">
                  مرحبًا بكم في{" "}
                  <span className="font-bold text-brand-gold">أكاديمية اللغة اليابانية</span>،
                  المنصة التعليمية الرائدة لتعليم اللغة اليابانية للناطقين بغيرها.
                  في <span className="font-bold text-brand-gold">أكاديمية اللغة اليابانية</span>{" "}
                  نقدم لكم تجربة تعليمية تفاعلية وفريدة، تمكنكم من تعلم اللغة اليابانية من خلال مجموعة متنوعة من الدروس والأنشطة، مدعومةً بأحدث التقنيات التعليمية وطرق التدريس المتقدمة. وما يميزنا في أكاديمية اللغة اليابانية هو فريق التدريس المتعدد الثقافات، والذي يضم ناطقين أصليين باللغتين اليابانية والعربية، مما يوفر لكم تعلمًا ممتعًا وسلسًا يجمع بين الدقة اللغوية والتواصل الثقافي، ونوفر لكم بيئة تعليمية متخصصة تساعدكم على تحقيق أهدافكم اللغوية والثقافية.
                </div>
              </motion.div>
              <motion.div variants={fadeInLeft}>
                <img loading="lazy" className="w-full rounded-xl shadow-lg border border-brand-gold/20 hover:scale-[1.02] transition-transform duration-500" src={img_header} alt="التعريف بالأكاديمية" />
              </motion.div>
            </div>
          </motion.div>

          {/* قسم رؤيتنا */}
          <motion.div
            className={cardStyle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <motion.div className="order-2 lg:order-1" variants={fadeInRight}>
                <img className="w-full rounded-xl shadow-lg border border-brand-gold/20 hover:scale-[1.02] transition-transform duration-500" src={vision_img} alt="رؤيتنا" loading="lazy" />
              </motion.div>
              <motion.div className="order-1 lg:order-2" variants={fadeInLeft}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-red mb-6">رؤيتنا:</h2>
                <div className="text-brand-black text-lg md:text-xl lg:text-2xl leading-[2.2]">
                  لقد تأسست{" "}
                  <span className="font-bold text-brand-gold"> أكاديمية اللغة اليابانية </span>
                  لتكون جسرًا يربط بين العالم العربي واليابان من خلال اللغة والثقافة. فنحن نؤمن أن تعلم اللغة ليس مجرد تعلم القواعد والمفردات واستخدامها للتواصل اللغوي، بل هو نافذة لفهم الثقافات والحضارات المختلفة. ومن هنا، جاءت رؤيتنا في تقديم تعليم شامل يمزج بين التعليم اللغوي والتواصل الثقافي، بحيث يصبح الطلاب قادرين على استخدام اللغة اليابانية بشكل فعال في حياتهم اليومية والعملية. وبناء جسر ثقافي بين العالم العربي واليابان من خلال تعليم اللغة اليابانية بطريقة مبتكرة، ومتدرجة، وشاملة. ونسعى إلى تمكين الطلاب من التواصل بثقة واحترافية باستخدام اللغة اليابانية في مختلف مجالات الحياة.
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* قسم رسالتنا */}
          <motion.div
            className={cardStyle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <motion.div variants={fadeInRight}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-red mb-6">رسالتنا:</h2>
                <div className="text-brand-black text-lg md:text-xl lg:text-2xl leading-[2.2]">
                  تتمثل رسالة
                  <span className="font-bold text-brand-gold"> أكاديمية اللغة اليابانية </span>
                  في توفير تعليم لغوي عالي الجودة، يمكِّن جميع المتعلمين من اكتساب اللغة اليابانية بفعالية، مع فهم عميق للثقافة اليابانية. ونهدف في أكاديميتنا إلى أن نصبح وجهة أساسية لكل من يسعى لتعلم اللغة اليابانية في العالم من الناطقين باللغة العربية بشكل خاص. ونحرص على أن يكون التعليم ليس فقط تفاعليًا وممتعًا، بل أيضًا مبنيًا على أسس علمية ولغوية مدروسة، تضمن الفهم العميق والتطبيق السليم للغة. وفي أكاديمية اللغة اليابانية، نؤمن أن إتقان اللغة اليابانية سيفتح أمامكم أبوابًا واسعة من الفرص.
                </div>
              </motion.div>
              <motion.div variants={fadeInLeft}>
                <img loading="lazy" className="w-full rounded-xl shadow-lg border border-brand-gold/20 hover:scale-[1.02] transition-transform duration-500" src={letter_img} alt="رسالتنا" />
              </motion.div>
            </div>
          </motion.div>

          {/* قسم ماذا نقدم */}
          <div className="mt-20 relative z-10">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-red text-right mb-8"
            >
              ماذا نقدم في أكاديمية اللغة اليابانية؟
            </motion.h2>

            <motion.img
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="w-full md:w-3/4 mx-auto flex mb-8 rounded-2xl shadow-md border-4 border-white/80"
              src={img_what_we_do}
              alt="ماذا نقدم"
              loading="lazy"
            />

            <motion.ul
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {[
                { title: "1. دورات تعليمية شاملة:", desc: "تقوم أكاديمية اللغة اليابانية بتقديم دورات تعليمية متنوعة تناسب جميع المستويات، بدءًا من المبتدئين وصولًا إلى المتعلمين المتقدمين. وتعتمد الدورات على منهجيات تدريس حديثة ومتطورة، تجمع بين التعلم الذاتي والتفاعل المباشر." },
                { title: "2. تدريس تفاعلي عبر الإنترنت:", desc: "نستخدم أحدث الأدوات والمنصات التعليمية لتقديم دروس تفاعلية عبر الإنترنت. حيث يمكن للطلاب الانضمام إلى الحصص الافتراضية من أي مكان في العالم، والمشاركة مع معلمين ناطقين أصليين." },
                { title: "3. برنامج متكامل للتعلم الثقافي:", desc: "إلى جانب تعليم اللغة اليابانية، نقوم بتقديم مواد وأنشطة تساعد على فهم الثقافة والعادات والتقاليد اليابانية مما يفتح آفاقًا أوسع لفهم المجتمع الياباني." },
                { title: "4. أساليب تدريس مبتكرة:", desc: "نحرص على استخدام أساليب تدريس حديثة تعتمد على التكنولوجيا المتقدمة مثل التعلم التكيُّفي، والألعاب التعليمية، والتطبيقات التفاعلية لجعل التعلم أكثر متعة." },
                { title: "5. دروس خصوصية وجماعية:", desc: "نوفر خيارات متعددة من الدروس، سواءً كنت تفضل التعلم ضمن مجموعة أو تحتاج إلى دروس خصوصية مع مدرس متخصص بما يتناسب مع احتياجات كل طالب." }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className={`${cardStyle} !my-0 hover:shadow-xl transition-shadow duration-300 border-r-4 border-r-brand-gold`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-red mb-4">{item.title}</h3>
                  <p className="text-brand-black text-lg md:text-xl lg:text-2xl leading-[2.2]">{item.desc}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* قسم لماذا تختارنا */}
          <div className="mt-20 mb-10 relative z-10">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-red text-right mb-8"
            >
              لماذا تختار أكاديمية اللغة اليابانية؟
            </motion.h2>

            <motion.img
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="w-full md:w-3/4 flex mb-8 rounded-2xl shadow-md border-4 border-white/80 mx-auto"
              src={img_why_we_choos}
              alt="لماذا تختارنا"
              loading="lazy"
            />

            <motion.ul
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {[
                { title: "1. فريق تدريس متخصص:", desc: "يضم فريق أكاديمية اللغة اليابانية مدرِّسين ناطقين أصليين باليابانية، بالإضافة إلى مدرِّسين ناطقين باللغة العربية ذوي خبرة في تعليم اللغة اليابانية." },
                { title: "2. مرونة في التعلم:", desc: "نفهم أن الطلاب لديهم جداول زمنية مختلفة، لذا نقدم مرونة في اختيار مواعيد الدروس بما يتناسب مع ظروفهم. فسواءً كنت تفضل التعلم في الصباح أو المساء." },
                { title: "3. موارد تعليمية شاملة:", desc: "بالإضافة إلى الدروس المباشرة، يحصل الطلاب على مجموعة واسعة من المواد التعليمية مثل الكتب الإلكترونية، والملفات الصوتية، والفيديوهات التعليمية." },
                { title: "4. بيئة تعليمية داعمة:", desc: "نسعى إلى توفير بيئة تعليمية محفزة، تشجع الطلاب على المشاركة وطرح الأسئلة دون أي تردد. ونقوم بالاهتمام بكل طالب بشكل فردي لتحقيق النجاح." },
                { title: "5. شبكة تواصل مع المتعلمين والخبراء:", desc: "يتاح للطلاب التواصل مع متعلمين آخرين من مختلف أنحاء العالم العربي، بالإضافة إلى الخبراء والمدرسين، مما يساهم في بناء مجتمع تعليمي داعم." }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className={`${cardStyle} !my-0 hover:shadow-xl transition-shadow duration-300 border-r-4 border-r-brand-red`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-red mb-4">{item.title}</h3>
                  <p className="text-brand-black text-lg md:text-xl lg:text-2xl leading-[2.2]">{item.desc}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

        </div>
      </div>
    </>
  );
}
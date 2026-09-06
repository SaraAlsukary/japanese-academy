
export default function Loading() {
    return (
        // خلفية بيضاء تغطي كامل الشاشة وتظل فوق كل شيء (z-index عالي)
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden select-none">

            {/* تضمين حركة النبض (Heartbeat) المخصصة */}
            <style>
                {`
          @keyframes heartbeat {
            0%, 100% { 
              transform: scale(1); 
              filter: drop-shadow(0 0 10px rgba(197, 160, 89, 0.2));
            }
            50% { 
              transform: scale(1.15); 
              filter: drop-shadow(0 0 25px rgba(139, 21, 26, 0.5));
            }
          }
          .animate-heartbeat {
            animation: heartbeat 1.5s ease-in-out infinite;
          }
        `}
            </style>

            {/* الشعار مع تأثير النبض */}
            <img
                src="/logo.png"
                alt="جاري التحميل..."
                className="w-32 md:w-48 xl:w-56 animate-heartbeat rounded-full"
                draggable="false"
            />
        </div>
    );
}
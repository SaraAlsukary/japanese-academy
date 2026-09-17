import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // اضبط المسار بحسب مشروعك
import { Loader2 } from "lucide-react";

type Props = {
    children: ReactNode;
    redirectTo?: string;
};

export default function ProtectedRoute({
    children,
    redirectTo = "/home/Login_users"
}: Props) {
    const { isAuthenticated, isLoading } = useAuth();
    // 1. التوقف هنا حتى تنتهي عملية جلب بيانات المستخدم من السيرفر
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A1A1A] text-[#C5A059]">
                <Loader2 className="w-10 h-10 animate-spin mb-3" />
                <p>جارٍ التحقق من الجلسة...</p>
            </div>
        );
    }

    // 2. إذا انتهى التحميل وكان المستخدم غير مسجل، قم بالتوجيه
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
}
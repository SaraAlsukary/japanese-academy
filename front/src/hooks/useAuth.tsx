import  { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// تحديد شكل البيانات
interface AuthContextType {
    user: any | null;
    role: string | null;
    login: ( token: string, role: string, userId: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [role, setRole] = useState<string | null>(null);

    // تحميل البيانات عند أول تشغيل للتطبيق فقط
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token, id: localStorage.getItem("userId") });
            setRole(localStorage.getItem('userRole'));
        }
    }, []);

    const login = ( token: string, role: string, userId: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", role);
        setUser({ token, id: userId });
        setRole(role);
    };

    const logout = () => {
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook مخصص لسهولة الاستخدام
export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("useAuth must be used within an AuthProvider");
    return authContext;
};
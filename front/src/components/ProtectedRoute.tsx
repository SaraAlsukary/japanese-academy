import  { useState, type ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const [auth, setAuth] = useState<boolean>(() => {
        return sessionStorage.getItem("auth") === "true";
    });

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = () => {
        if (username === "Sawa" && password === "Sawa_2424") {
            sessionStorage.setItem("auth", "true");
            setAuth(true);
        } else {
            alert("Wrong credentials");
        }
    };

    if (!auth) {
        return (
            <div 
                dir="ltr" 
                className="flex h-screen items-center justify-center bg-[#111] text-white"
            >
                <div className="flex w-[350px] flex-col gap-2.5 rounded-[10px] bg-[#222] p-[30px]">
                    <h2 className="text-xl font-bold">Restricted Area 🔐</h2>

                    <input
                        className="rounded-[5px] border-none bg-white p-2.5 text-black outline-none"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className="rounded-[5px] border-none bg-white p-2.5 text-black outline-none"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button 
                        className="cursor-pointer rounded-[5px] border-none bg-white p-2.5 text-black font-semibold hover:bg-gray-200 transition-colors" 
                        onClick={login}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
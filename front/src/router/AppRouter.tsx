import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

// import { useAuth } from "../hooks/useAuth.tsx";
// const About = lazy(() => import("../pages/About/About.tsx"));
// const Dash = lazy(() => import("../pages/Dash/Dash.tsx"));
// const Date_lisson = lazy(() => import("../pages/Date_lisson/Date_lisson.tsx"));
const Home = lazy(() => import("../pages/Home.tsx")); // تم رفع التعليق هنا لأنك تستخدمه في الأسفل
const ComingSoon = lazy(() => import("../pages/ComingSoon.tsx")); // تم رفع التعليق هنا لأنك تستخدمه في الأسفل
// const Login = lazy(() => import("../pages/Login/Login.tsx"));
// const Questions = lazy(() => import("../pages/Questions/Questions.tsx"));
// const Articles = lazy(() => import("../pages/Articles/Articles.tsx"));
// const Level_division = lazy(() => import("../pages/Level_division/Level_division.tsx"));
// const Register = lazy(() => import("../pages/Register/Register.tsx"));
// const Teachers = lazy(() => import("../pages/Teachers/Teachers.tsx"));
// const Study_materials = lazy(() => import("../pages/Study_materials/Study_materials.tsx"));
// const More_services = lazy(() => import("../pages/More_services/More_services.tsx"));
// const Support = lazy(() => import("../pages/Support/Support.tsx"));
// const Fees = lazy(() => import("../pages/Fees/Fees.tsx"));
// const Login_users = lazy(() => import("../pages/Login_users/Login_users.tsx"));
// const Register_accounts = lazy(() => import("../pages/Register_accounts/Register_accounts.tsx"));
// const Dash_users = lazy(() => import("../pages/Dash_users/Dash_users.tsx"));
// const Privacy = lazy(() => import("../pages/Privacy/Privacy.tsx"));
// const CommetS = lazy(() => import("../pages/CommetS/CommetS.tsx"));
// const Term = lazy(() => import("../pages/Term/Term.tsx"));
// const Dash_Teachers = lazy(() => import("../pages/Dash_Teachers/Dash_Teachers.tsx"));
// const Reset_Password = lazy(() => import("../pages/Reset_Password/Reset_Password.tsx"));

/* Sections */
// const LevelTest = lazy(() => import("../sections/Level_Determination/LevelTest.tsx"));

/* Components */
// const ProtectedRoute = lazy(() => import("../components/ProtectedRoute.tsx"));
const UserLayout = lazy(() => import("../layout/UserLayout.tsx"));

/* =========================
   App Router Component
========================= */

export default function AppRouter() {

    /* =========================
       Helpers
    ========================= */
    // const { user } = useAuth()

    // const isAuth = () => !!user;
    // const hasAccess = () =>
    //     !!(localStorage.getItem("token"));

    /* =========================
       Router
    ========================= */

    const router = createBrowserRouter([
        {
            path: "/",
            element: <ComingSoon />
        },
        /* ================= PUBLIC ================= */
        {
            path: "/home",
            element: <UserLayout />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                // { path: "About", element: <About /> },
                // { path: "Date", element: <Date_lisson /> },
                // { path: "Articles", element: <Articles /> },
                // { path: "Level_division", element: <Level_division /> },
                // { path: "Teachers", element: <Teachers /> },
                // { path: "Study_materials", element: <Study_materials /> },
                // { path: "More_services", element: <More_services /> },
                // { path: "Support", element: <Support /> },
                // { path: "Fees", element: <Fees /> },
                // { path: "Comments", element: <CommetS /> },
                // { path: "Questions", element: <Questions /> },
                // { path: "Privacy", element: <Privacy /> },
                // { path: "Terms", element: <Term /> },
                // { path: "Level-test", element: <LevelTest /> },
                // { path: "Reset_Password", element: <Reset_Password /> },

                /* ================= AUTH ================= */
                // {
                //     path: "Login",
                //     element: hasAccess() ? <Navigate to="/" /> : <Login />,
                // },
                // {
                //     path: "Register",
                //     element: hasAccess() ? <Navigate to="/" /> : <Register />,
                // },
                // {
                //     path: "Login_users",
                //     element: hasAccess() ? <Navigate to="/" /> : <Login_users />,
                // },
                // {
                //     path: "Register_account",
                //     element: hasAccess() ? <Navigate to="/" /> : <Register_accounts />,
                // },
                // {
                //     path: "Dash_Teachers",
                //     element: (
                //         <ProtectedRoute isAuthenticated={isAuth()}>
                //             <Dash_Teachers />
                //         </ProtectedRoute>
                //     ),
                // },
                // {
                //     path: "Dash_users/:userId",
                //     element: (
                //         <ProtectedRoute isAuthenticated={isAuth()}>
                //             <Dash_users />
                //         </ProtectedRoute>
                //     ),
                // },
            ] // تم إغلاق مصفوفة الـ children هنا
        }, // تم إغلاق مسار / هنا

        /* ================= DASHBOARD ================= */
        // {
        //     path: "/Dash",
        //     element: (
        //         <ProtectedRoute isAuthenticated={isAuth()}>
        //             <Dash />
        //         </ProtectedRoute>
        //     ),
        // },

        /* ================= FALLBACK ================= */
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ]); // إغلاق مصفوفة الـ router

    return <RouterProvider router={router} />;
}
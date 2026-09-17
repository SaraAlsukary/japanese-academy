import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
// import { useAuth } from "../context/AuthContext.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";

// import { useAuth } from "../hooks/useAuth.tsx";
// const About = lazy(() => import("../pages/About/About.tsx"));
// const Dash = lazy(() => import("../pages/Dash/Dash.tsx"));
// const Date_lisson = lazy(() => import("../pages/Date_lisson/Date_lisson.tsx"));
const Home = lazy(() => import("../pages/Home.tsx")); // تم رفع التعليق هنا لأنك تستخدمه في الأسفل
const ComingSoon = lazy(() => import("../pages/ComingSoon.tsx")); // تم رفع التعليق هنا لأنك تستخدمه في الأسفل
// const Login = lazy(() => import("../pages/Login/Login.tsx"));
const Questions = lazy(() => import("../pages/Questions.tsx"));
// const Articles = lazy(() => import("../pages/Articles/Articles.tsx"));
const Level = lazy(() => import("../pages/Levels.tsx"));
// const Register = lazy(() => import("../pages/Register/Register.tsx"));
const Teachers = lazy(() => import("../pages/Teachers.tsx"));
const Subjects = lazy(() => import("../pages/Subjects.tsx"));
const Fees = lazy(() => import("../pages/Fees.tsx"));
// const Study_materials = lazy(() => import("../pages/Study_materials/Study_materials.tsx"));
const MoreServices = lazy(() => import("../pages/MoreServices.tsx"));
const Support = lazy(() => import("../pages/Support.tsx"));
// const Fees = lazy(() => import("../pages/Fees/Fees.tsx"));
const Login = lazy(() => import("../pages/Login.tsx"));
const Register = lazy(() => import("../pages/Register.tsx"));
const UserDashboard = lazy(() => import("../pages/UserDashboard.tsx"));
// const Privacy = lazy(() => import("../pages/Privacy/Privacy.tsx"));
const Comments = lazy(() => import("../pages/Comments.tsx"));
// const Term = lazy(() => import("../pages/Term/Term.tsx"));
// const Dash_Teachers = lazy(() => import("../pages/Dash_Teachers/Dash_Teachers.tsx"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.tsx"));

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
                { path: "Levels", element: <Level /> },
                { path: "Subjects", element: <Subjects /> },
                { path: "Teachers", element: <Teachers /> },
                // { path: "Study_materials", element: <Study_materials /> },
                { path: "More_services", element: <MoreServices /> },
                { path: "Support", element: <Support /> },
                { path: "Fees", element: <Fees /> },
                { path: "Comments", element: <Comments /> },
                { path: "Questions", element: <Questions /> },
                // { path: "Privacy", element: <Privacy /> },
                // { path: "Terms", element: <Term /> },
                // { path: "Level-test", element: <LevelTest /> },
                { path: "Reset_Password", element: <ForgotPassword /> },

                /* ================= AUTH ================= */
                // {
                //     path: "Login",
                //     element: hasAccess() ? <Navigate to="/" /> : <Login />,
                // },
                // {
                //     path: "Register",
                //     element: hasAccess() ? <Navigate to="/" /> : <Register />,
                // },
                {
                    path: "Login_users",
                    // element: hasAccess() ? <Navigate to="/" /> : <Login_users />,
                    element: <Login />,
                },
                {
                    path: "Register_account",
                    // element: hasAccess() ? <Navigate to="/" /> : <Register />,
                    element: <Register />,
                },
                // {
                //     path: "Dash_Teachers",
                //     element: (
                //         <ProtectedRoute isAuthenticated={isAuth()}>
                //             <Dash_Teachers />
                //         </ProtectedRoute>
                //     ),
                // },
                {
                    path: "user-panel",
                    element: (
                        <ProtectedRoute >
                            <UserDashboard />
                        </ProtectedRoute>
                    ),
                },
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
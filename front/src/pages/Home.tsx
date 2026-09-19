import { useEffect } from "react";
import Header from "../components/Header";

export default function Home() {
  useEffect(() => {
    document.title = "academy";
  }, []);

  useEffect(() => {
    // قفز ناعم (Smooth) لأعلى الصفحة
    window.scrollTo({
      top: 0,
      behavior: "smooth", // يجعل الحركة سلسة وليست قفزة مفاجئة
    });
  }, []);
  return (
    <Header />
  );
}

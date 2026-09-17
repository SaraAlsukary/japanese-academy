import { useEffect } from 'react';
import { Suspense } from "react";
import './App.css'
import AppRouter from "./router/AppRouter";
import Loading from "./pages/Loading";
import { AuthProvider } from "./context/AuthContext";

function App() {

  useEffect(() => {
    const loadResources = async () => {
      await document.fonts.ready; // انتظر تحميل الخطوط
      setTimeout(() => {
        // setLoading(false);
      }, 500); // تأخير بسيط لإعطاء إحساس بالسلاسة
    };

    loadResources();
  }, []);
  return (
    <AuthProvider>

      <Suspense fallback={<Loading />}>
        <AppRouter />
      </Suspense>


    </AuthProvider>
  );
}


export default App

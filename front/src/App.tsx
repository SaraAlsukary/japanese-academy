import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from 'react';
import { Suspense } from "react";
import './App.css'
import AppRouter from "./router/AppRouter";
import Loading from "./pages/Loading";
const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <AppRouter />
      </Suspense>
    </QueryClientProvider >
  );
}


export default App

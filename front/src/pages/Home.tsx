import { useEffect } from "react";
import Header from "../components/Header";

export default function Home() {
  useEffect(() => {
    document.title = "academy";
  }, []);
  return (
    <Header />
  );
}

import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import Cookies from "../components/Cookies"
import { AuthProvider } from "../context/AuthContext"


const UserLayout = () => {
    return (
        <><AuthProvider>
            <Navbar />
            <FloatingButtons />
            <Cookies />

            <Outlet />
            <Footer />
        </AuthProvider>
        </>
    )
}

export default UserLayout
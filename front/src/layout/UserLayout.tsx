import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"
import Cookies from "../components/Cookies"


const UserLayout = () => {
    return (
        <>
            <Navbar />
            <FloatingButtons />
            <Cookies />

            <Outlet />
            <Footer />
        </>
    )
}

export default UserLayout
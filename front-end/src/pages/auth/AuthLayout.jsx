import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AuthLayout() {


    
    return (
        <div className="bg-[#f5f5f5]">
            <Navbar />
            <Outlet />
        </div>
    )
}
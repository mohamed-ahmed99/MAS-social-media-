import { Outlet, useLocation, Link } from "react-router-dom"
import Navbar from "../Navbar/Navbar";
import Topbar from "../Navbar/Topbar";


export default function PagesLayout() {

  return (
    <div>
        <Topbar/>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

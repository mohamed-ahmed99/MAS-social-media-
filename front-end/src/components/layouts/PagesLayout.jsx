import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"
export default function PagesLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

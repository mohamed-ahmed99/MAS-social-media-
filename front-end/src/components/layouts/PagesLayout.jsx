import { Outlet, useLocation, Link } from "react-router-dom"
import Navbar from "../Navbar"



import { FaFacebookMessenger } from "react-icons/fa";

import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";






export default function PagesLayout() {
  const location = useLocation()

const Topbar = () => {


    if(location.pathname == "/") return (
       <div className='lmd:hidden flex px-1 items-center justify-between '>
          <div className='font-bold text-[26px]'>MAS</div>

          <div className='flex'>
              <button className='p-2 '>
                  <div className='border-2 rounded-lg border-black'><FaPlus fontSize={25}/></div>
              </button>
              <button className='p-2 rounded-full border-2 border-transparent'>
                  <IoSearchOutline fontSize={25}/>
              </button>
              <Link className='p-2 rounded-full border-2 border-transparent'>
                  <FaFacebookMessenger fontSize={25}/>
              </Link>
          </div>
      </div>
    )
  }





  return (
    <div>
        <Topbar/>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

// hooks
import { useLocation, Link } from "react-router-dom"


// components
import Logo from "./Logo";


// icons
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline, IoSettingsSharp } from "react-icons/io5";



export default function Topbar() {
    const location = useLocation()

    if(location.pathname == "/") return (
       <div className='lmd:hidden flex px-2 items-center justify-between bg-white'>
          <Logo/>

          <div className='flex'>
            {/* create post */}
              <button className='p-2 '>
                  <div className='border-2 rounded-lg border-black'>
                    <FaPlus fontSize={25}/>
                  </div>
              </button>

              {/* search */}
              <button 
                onClick={() => {}}
                className='p-2 rounded-full border-2 border-transparent'>
                  <IoSearchOutline fontSize={25}/>
              </button>

              {/* settings */}
              <Link 
                to="/settings" 
                className='p-2 rounded-full border-2 border-transparent'>

                  <IoSettingsSharp fontSize={25}/>
              </Link>
          </div>
      </div>
    )
  }


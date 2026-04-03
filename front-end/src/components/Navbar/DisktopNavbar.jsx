import { Link, NavLink } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import Dropdown from '../../pages/notifications/Dropdown';

// components
import SearchInput from "./SearchInput";
import Logo from "./Logo";


export default function DisktopNavbar({ notRef, notificationList, openNot, setOpenNot, desktopLinks }) {
  return (
     <div className='sticky top-0 z-[888] shadow shadow-gray-300/40 bg-white' >
            <nav className=' bg-white w-full h-[60px] flex  md:px-2 lg:px-4 items-center justify-between 2xl:container'>

                {/* ///////////////// logo & input ///////////////// */}
                <div className='flex items-center gap-1'>
                    {/* logo */}
                    <Logo />
                    
                    {/* input */}
                    <SearchInput/>
                </div>

                
                {/* links */}
                <div className='navResLG flex items-center justify-between h-full  gap-3  -translate-x-16'>
                    {desktopLinks.map((link, index) => {
                        return (
                            <NavLink
                                to={link.href}
                                key={index}
                                className={({isActive}) => `hover:opacity-85 transition-colors py-2 md:px-6 lg:px-8 xl:px-10  h-full flex items-center  border-b-2 
                                            ${isActive ? "border-black text-black" : "border-transparent text-black/85"}`}
                                >
                                {link.icon}
                                
                            </NavLink>
                        )
                    })}
                    
                </div>


                {/* some linkes like notifications, massenges, settings */}
                <div className='flex items-center justify-between md:gap-3 lg:gap-5'>

                    <button onClick={() => setOpenNot(prev => !prev)} ref={notRef}
                        className={`p-2 rounded-full hover:bg-opacity-80 ${openNot ? "bg-black text-white" : "bg-gray-200 text-black"}`}> 
                        <IoNotifications fontSize={20}/> 
                    </button>

                    {/* user */}
                    <NavLink 
                        to="/settings"
                        className={({isActive}) => `p-2 rounded-full hover:bg-opacity-80 ${isActive ? "bg-black text-white" : "bg-gray-200 text-black"}`}
                      >
                        <MdOutlineSettings fontSize={20}/> 
                    </NavLink>
                </div>
            </nav>

            <div ref={notificationList}>
                {openNot && <Dropdown /> }
            </div>
            
        </div>
  )
}
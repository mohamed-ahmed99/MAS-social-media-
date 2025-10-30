import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsImages } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";



export default function Navbar() {
  return (
    <div className=''>
        <nav className='flex py-1 px-4 items-center justify-between 2xl:container'>
            {/* logo & input */}
            <div className='flex items-center gap-1'>
                {/* logo */}
                <div className='w-14 h-14 overflow-hidden'>
                  <img  className='w-full h-full'
                     src="./logo.png" alt="" />
                </div>
                
                {/* input */}
                <div 
                  className='flex bg-gray-200 rounded-full px-2 py-[6px]  items-center gap-2 border h-fit hover:opacity-70 '>

                    <IoMdSearch
                       fontSize={20} className='cursor-pointer'
                    />
                    <input type="text" 
                        className='outline-none bg-transparent'
                    />
                </div>
            </div>

            

            {/* links */}
            <div className='flex items-center justify-between gap-7 -translate-x-16'>

                <NavLink to={'/'}
                    className={({isActive}) => `hover:bg-gray-200 transition-colors py-2 px-10 rounded-full text-black/85
                                                ${isActive && "bg-gray-200/65"}`}> 
                    <IoHomeOutline fontSize={25} /> 
                </NavLink>

                <NavLink to={'/'}
                    className={({isActive}) => `hover:bg-gray-200 transition-colors py-2 px-10 rounded-full text-black/85
                                                ${isActive && "bg-gray-200/65"}`}> 
                    <MdOutlinePeopleAlt fontSize={25} /> 
                </NavLink>

                <NavLink to={'/'}
                    className={({isActive}) => `hover:bg-gray-200 transition-colors py-2 px-10 rounded-full text-black/85
                                                ${isActive && "bg-gray-200/65"}`}> 
                    <BsImages fontSize={25} /> 
                </NavLink>

                <NavLink to={'/profile'}
                    className={({isActive}) => `hover:bg-gray-200 transition-colors py-2 px-10 rounded-full text-black/85
                                                ${isActive && "bg-gray-200/65"}`}> 
                    <FaRegUserCircle fontSize={25} /> 
                </NavLink>
            </div>



            {/* some linkes like notifications, massenges, settings */}
            <div className='flex items-center justify-between gap-4'>
                <Link
                    className='p-2 rounded-full bg-gray-200 hover:bg-opacity-80'> 
                    <FaFacebookMessenger fontSize={20}/> 
                </Link>

                <Link 
                    className='p-2 rounded-full bg-gray-200 hover:bg-opacity-80'> 
                    <IoNotifications fontSize={20}/> 
                </Link>

                <Link 
                    className='p-2 rounded-full bg-gray-200 hover:bg-opacity-80'> 
                    <IoSettingsSharp fontSize={20}/> 
                </Link>
                <div></div>
            </div>
        </nav>
    </div>
  )
}

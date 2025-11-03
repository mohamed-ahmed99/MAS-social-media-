import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsImages } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect } from 'react';
import { useState } from 'react';




export default function Navbar() {
    
    const [screenWidth, setScreenWidth] = useState()
    const location = useLocation()

    useEffect(() => {setScreenWidth(window.innerWidth)},[])
    useEffect(() => {
        const onResize = () =>  setScreenWidth(window.innerWidth)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    })






if(screenWidth >= 900)
    return (
        <div className='sticky top-0 z-[888] shadow-md' >
            <nav className=' bg-white w-full flex py-1 md:px-2 lg:px-4 items-center justify-between 2xl:container'>
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
                <div className='navResLG flex items-center justify-between  gap-3  -translate-x-16'>
                    <NavLink to={'/'}
                        className={({isActive}) => `hover:bg-gray-200 transition-colors py-2 md:px-6 lg:px-8 xl:px-10 rounded-full text-black/85
                                                    ${isActive && "bg-gray-200/65"}`}> 
                        <IoHomeOutline fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/'}
                        className={({isActive}) => `hover:bg-gray-200 transition-colors py-2 md:px-6 lg:px-8 xl:px-10 rounded-full text-black/85
                                                    ${isActive && "bg-gray-200/65"}`}> 
                        <MdOutlinePeopleAlt fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/'}
                        className={({isActive}) => `hover:bg-gray-200 transition-colors py-2 md:px-6 lg:px-8 xl:px-10 rounded-full text-black/85
                                                    ${isActive && "bg-gray-200/65"}`}> 
                        <BsImages fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/profile'}
                        className={({isActive}) => `hover:bg-gray-200 transition-colors py-2 md:px-6 lg:px-8 xl:px-10 rounded-full text-black/85
                                                    ${isActive && "bg-gray-200/65"}`}> 
                        <FaRegUserCircle fontSize={25} /> 
                    </NavLink>
             </div>


                {/* some linkes like notifications, massenges, settings */}
                <div className='flex items-center justify-between md:gap-3 lg:gap-5'>
                    <Link
                        className='p-2 rounded-full bg-gray-200 hover:bg-opacity-80'> 
                        <FaFacebookMessenger fontSize={20}/> 
                    </Link>

                    <Link 
                        className='p-2 rounded-full bg-gray-200 hover:bg-opacity-80'> 
                        <IoNotifications fontSize={20}/> 
                    </Link>

                    {/* user */}
                    <div className='w-[35px] h-[35px] rounded-full overflow-hidden -ml-2 cursor-pointer'>
                        <img className='w-full h-full' src="/user.jpg" alt="" />
                    </div>
                </div>
            </nav>
        </div>
    )


else{
    return(
        <>
            <nav className='sticky top-0 z-[888] bg-white border-b-[1.5px] h-[50px]'>

                {/* navbar */}
                <div  className='sticky top-0 w-full flex z-[888] bg-white  items-center justify-between h-full px-2'>
                    <NavLink to={'/'}
                         className={({isActive}) => `text-black/85 border-b-2  px-2  py-3  ${isActive ? "border-blue-600 text-blue-600" : "border-transparen text-black/85t"}`}> 
                        <IoHomeOutline fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/friends'}
                        className={({isActive}) => `text-black/85 border-b-2  px-2  py-3 ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-black/85"}`}> 
                        <MdOutlinePeopleAlt fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/photos'}
                        className={({isActive}) => `text-black/85 border-b-2  px-2  py-3 ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-black/85"}`}> 
                        <BsImages fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/profile'}
                        className={({isActive}) => `text-black/85 border-b-2  px-2  py-3 ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-black/85"}`}> 
                        <FaRegUserCircle fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/notifications'}
                        className={({isActive}) => `text-black/85 border-b-2  px-2  py-3 ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-black/85"}`}> 
                        <IoNotifications fontSize={25} /> 
                    </NavLink>
  
                    <NavLink to={'/settings'} className={({isActive}) => `border-b-2  px-2  pb-2 translate-y-[3px]
                                                                ${isActive ? "border-blue-600" : "border-transparent"}` }>
                        <div className={`w-[35px] h-[35px] overflow-hidden border-[1.5px] rounded-full ${location.pathname == "/settings" ? "border-blue-600":"border-black/85"}`}>
                            <img className='w-full h-full' src="./user.jpg" alt="" />
                        </div>
                    </NavLink>
                </div>
            </nav>
        </>
    )
}
}

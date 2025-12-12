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
import { useRef } from 'react';
import { HiBars3BottomRight } from "react-icons/hi2";
import { HiMiniBars3BottomRight } from "react-icons/hi2";




export default function Navbar() {

    const chatRef = useRef(null)
    const notRef = useRef(null)
    const settingRef = useRef(null)
    
    const [screenWidth, setScreenWidth] = useState()
    const location = useLocation()

    useEffect(() => {setScreenWidth(window.innerWidth)},[])
    useEffect(() => {
        const onResize = () =>  setScreenWidth(window.innerWidth)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    })

    const [openChat, setOpenChat] = useState(false)
    const [openNot, setOpenNot] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)


    useEffect((e) => {

        const handleClickOutside = (e) => {
            if (chatRef.current && !chatRef.current.contains(e.target)) {
                setOpenChat(false);
            }
            if (notRef.current && !notRef.current.contains(e.target)) {
                setOpenNot(false);
            }
            if (settingRef.current && !settingRef.current.contains(e.target)) {
                setOpenSettings(false);
            }

        }
        window.addEventListener("mousedown", handleClickOutside)
        return () => window.removeEventListener("mousedown", handleClickOutside)

    }, [])



if(screenWidth >= 900)
    return (
        <div className='sticky top-0 z-[888] shadow shadow-gray-300/40 bg-white' >
            <nav className=' bg-white w-full h-[60px] flex  md:px-2 lg:px-4 items-center justify-between 2xl:container'>
                {/* logo & input */}
                <div className='flex items-center gap-1'>
                    {/* logo */}
                    <div className='w-14 h-14 overflow-hidden'>
                    <img  className='w-full h-full'
                        src="/logo.png" alt="" />
                    </div>
                    
                    {/* input */}
                    <div 
                        className='flex bg-gray-200 rounded-full px-2 py-[6px]  items-center gap-2 border h-fit hover:opacity-70 '>

                        <IoMdSearch
                        fontSize={20} className='cursor-pointer'
                        />
                        <input type="text" 
                            placeholder='Search'
                            className='outline-none bg-transparent'
                        />
                    </div>
                </div>

                
                {/* links */}
                <div className='navResLG flex items-center justify-between h-full  gap-3  -translate-x-16'>
                    <NavLink to={'/'}
                        className={({isActive}) => `hover:opacity-85 transition-colors py-2 md:px-6 lg:px-8 xl:px-10  h-full flex items-center  border-b-2  
                                                    ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-black/85"}`}> 
                        <IoHomeOutline fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/friends'}
                        className={({isActive}) => `hover:opacity-85 transition-colors py-2 md:px-6 lg:px-8 xl:px-10  h-full flex items-center  border-b-2 
                                                    ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-black/85"}`}> 
                        <MdOutlinePeopleAlt fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/photos'}
                        className={({isActive}) => `hover:opacity-85 transition-colors py-2 md:px-6 lg:px-8 xl:px-10  h-full flex items-center  border-b-2 
                                                    ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-black/85"}`}> 
                        <BsImages fontSize={25} /> 
                    </NavLink>

                    <NavLink to={'/profile'}
                        className={({isActive}) => `hover:opacity-85 transition-colors py-2 md:px-6 lg:px-8 xl:px-10  h-full flex items-center  border-b-2 
                                                    ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-black/85"}`}> 
                        <FaRegUserCircle fontSize={25} /> 
                    </NavLink>
             </div>


                {/* some linkes like notifications, massenges, settings */}
                <div className='flex items-center justify-between md:gap-3 lg:gap-5'>

                    <button onClick={() => setOpenChat(prev => !prev)} ref={chatRef}
                        className={`p-2 rounded-full hover:bg-opacity-80 ${openChat ? "bg-blue-200" : "bg-gray-200"}`}> 
                        <FaFacebookMessenger fontSize={20}/> 
                    </button>

                    <button onClick={() => setOpenNot(prev => !prev)} ref={notRef}
                        className={`p-2 rounded-full hover:bg-opacity-80 ${openNot ? "bg-blue-200" : "bg-gray-200"}`}> 
                        <IoNotifications fontSize={20}/> 
                    </button>

                    {/* user */}
                    <button onClick={() => setOpenSettings(prev => !prev)} ref={settingRef}
                        className='w-[35px] h-[35px] rounded-full overflow-hidden -ml-2 cursor-pointer'>
                        <img className='w-full h-full' src="/user.jpg" alt="" />
                    </button>
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
                    <NavLink to={'/settings'}
                        className={({isActive}) => `text-black/85 border-b-2  px-2  py-3 ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-black/85"}`}> 
                        <HiMiniBars3BottomRight fontSize={25} /> 
                    </NavLink>
                </div>
            </nav>
        </>
    )
}
}

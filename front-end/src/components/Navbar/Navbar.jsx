import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { href, Link, NavLink, useLocation } from 'react-router-dom';
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsImages } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { HiMiniBars3BottomRight } from "react-icons/hi2";

// notification
import Dropdown from '../../pages/notifications/Dropdown';
import DisktopNavbar from './DisktopNavbar';
import MobileNavbar from './MobileNavbar';




export default function Navbar() {

    const chatRef = useRef(null)
    const notRef = useRef(null)
    const settingRef = useRef(null)
    const notificationList = useRef(null)
    
    const [screenWidth, setScreenWidth] = useState()
    const location = useLocation()

    useEffect(() => {setScreenWidth(window.innerWidth)},[])
    useEffect(() => {
        const onResize = () =>  setScreenWidth(window.innerWidth)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    },[])

    const [openChat, setOpenChat] = useState(false)
    const [openNot, setOpenNot] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)


    useEffect((e) => {

        const handleClickOutside = (e) => {
            if (chatRef.current && !chatRef.current.contains(e.target)) {
                setOpenChat(false);
            }
            if (notRef.current && notificationList.current && 
                !notRef.current.contains(e.target) && !notificationList.current.contains(e.target)
            ) {
                setOpenNot(false);
            }
            if (settingRef.current && !settingRef.current.contains(e.target)) {
                setOpenSettings(false);
            }

        }
        window.addEventListener("mousedown", handleClickOutside)
        return () => window.removeEventListener("mousedown", handleClickOutside)

    }, [])

    const handleOpenNotifications = () => {
        setOpenSettings(prev => !prev)
    }


    const middleLinks = [
        {href:"/", icon: <IoHomeOutline fontSize={25} /> },
        {href:"/friends", icon: <MdOutlinePeopleAlt fontSize={25} /> },
        {href:"/profile", icon: <FaRegUserCircle fontSize={25} /> },
        {href:"/chat", icon: <FaFacebookMessenger fontSize={25} /> },
    ]




if(screenWidth >= 900)
    return (
       <DisktopNavbar
        chatRef={chatRef}
        notRef={notRef}
        settingRef={settingRef}
        notificationList={notificationList}
        openChat={openChat}
        openNot={openNot}
        openSettings={openSettings}
        setOpenChat={setOpenChat}
        setOpenNot={setOpenNot}
        setOpenSettings={setOpenSettings}
        handleOpenNotifications={handleOpenNotifications}
        middleLinks={middleLinks}
       />
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

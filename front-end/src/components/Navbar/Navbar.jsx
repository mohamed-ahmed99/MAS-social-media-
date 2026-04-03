import React from 'react'
import { useEffect, useState, useRef } from 'react';

// components
import DisktopNavbar from './DisktopNavbar';
import MobileNavbar from './MobileNavbar';

// icons
import { FaFacebookMessenger, FaRegUserCircle } from "react-icons/fa";
import { IoNotifications, IoHomeOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";


export default function Navbar() {

    // refs
    const notRef = useRef(null)
    const notificationList = useRef(null)

    // states
    const [openNot, setOpenNot] = useState(false)
    
    // screen width
    const [screenWidth, setScreenWidth] = useState()
    useEffect(() => {setScreenWidth(window.innerWidth)},[])

    // handle screen width
    useEffect(() => {
        const onResize = () =>  setScreenWidth(window.innerWidth)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    },[])



    // handle click outside
    useEffect((e) => {
        const handleClickOutside = (e) => {
            if (notRef.current && notificationList.current && 
                !notRef.current.contains(e.target) && !notificationList.current.contains(e.target)
            ) {
                setOpenNot(false);
            }
        }
        // add event listener
        window.addEventListener("mousedown", handleClickOutside)
        // clean event listener
        return () => window.removeEventListener("mousedown", handleClickOutside)

    }, [])


    const desktopLinks = [
        {href:"/", icon: <IoHomeOutline fontSize={25} /> },
        {href:"/friends", icon: <MdOutlinePeopleAlt fontSize={25} /> },
        {href:"/profile", icon: <FaRegUserCircle fontSize={25} /> },
        {href:"/chat", icon: <FaFacebookMessenger fontSize={25} /> },
    ]

    const mobileLinks = [
        ...desktopLinks,
        {href:"/notifications", icon: <IoNotifications fontSize={25} /> },
    ]




if(screenWidth >= 900)
    return (
       <DisktopNavbar
        notRef={notRef}
        notificationList={notificationList}
        openNot={openNot}
        setOpenNot={setOpenNot}
        desktopLinks={desktopLinks}
       />
    )


else{   
    return(
        <MobileNavbar mobileLinks={mobileLinks}/>
    )
}
}

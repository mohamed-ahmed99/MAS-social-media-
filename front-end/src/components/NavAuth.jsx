import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// from react-icons
import { FaArrowLeft } from "react-icons/fa6";

const AuthNav = () => {
    const navigate = useNavigate();
    const location = useLocation()

    const [linkComponents, setLinkComponents] = useState({text:"", href:""})

    useEffect(() => {
        if(location.pathname == "/signin") setLinkComponents({text:"sign up", href:"signup"})
        else if (location.pathname == "/signup")setLinkComponents({text:"sign in", href:"signin"}) 
        else setLinkComponents({text:"", href:""})
    }, [location.pathname])

    console.log(location.pathname)

    return (
        <div className='fixed w-full top-0 left-0'>
            <nav className='2xl:container flex items-center justify-between py-4 px-8' >
                <button onClick={() => navigate(-1)} 
                    className='p-3 shadow-sm bg-slate-200 rounded-full hover:shadow-xl'> <FaArrowLeft/> </button>
                <Link to={linkComponents.href}
                    className='bg-black text-white py-2 px-3 hover:opacity-80 rounded-full font-semibold'>{linkComponents.text}</Link>
            </nav>
        </div>
    );
}

export default AuthNav;

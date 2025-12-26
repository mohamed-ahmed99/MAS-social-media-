import React, { useEffect } from 'react'
import {NavLink, Link } from "react-router-dom"
import { IoMdSearch } from "react-icons/io";
import { useLocation } from 'react-router-dom';

export default function TopBar() {

    const location = useLocation();
    const lastPathSegment = location.pathname.split('/').slice(-1)[0];
    console.log("Last path segment:", lastPathSegment);

    // Links components
    const links = [
        {text:"friends", to:"/friends"},
        {text:"Friends requests", to:"friends_requests"},
        {text:"Suggestions", to:"friends_suggestions"},
    ]



  return (
    <div className='flex items-stretch justify-between bg-white px-2 py-1'>
        <div className='flex lg:hidden items-center gap-2   w-full'>
            {/* Top bar content goes here */}

            {links.map((link, index) => (
                <NavLink
                    key={index}
                    to={link.to}
                    className={({ isActive }) => `px-4 py-2  text-sm font-medium rounded-lg 
                        ${isActive && lastPathSegment === link.to.split('/').pop() ? 
                            "bg-blue-600 text-white" : "text-gray-700 bg-gray-200 hover:bg-gray-300"}`}

                >
                    {link.text}
                </NavLink>
            ))}
        </div>

        <Link 
            to={'search'}
            className='flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
            <IoMdSearch fontSize={20} />
        </Link>
    </div>
  )
}

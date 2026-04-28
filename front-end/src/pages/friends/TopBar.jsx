import React, { useEffect } from 'react'
import {NavLink, Link } from "react-router-dom"
import { IoMdSearch } from "react-icons/io";
import { useLocation } from 'react-router-dom';

export default function TopBar() {

    // pathname
    const location = useLocation();
    const lastPathSegment = location.pathname.split('/').slice(-1)[0];

    // friends links
    const links = [
        {text:"friends", to:"/friends"},
        {text:"requests", to:"friends_requests"},
        {text:"Suggestions", to:"friends_suggestions"},
        {text:"pendings", to:"pendings"},
    ]

    

  return (
    <div className='flex md:hidden items-stretch justify-between bg-white px-2 py-1 gap-3'>
        <div className='flex items-center gap-2 w-full overflow-x-auto whitespace-nowrap scrollbar-hide'>
            
            {/* navigation links */}
            {links.map((link, index) => (
                <NavLink
                    key={index}
                    to={link.to}
                    className={({ isActive }) => `inline-block px-4 py-2 text-sm font-medium rounded-lg transition-all
                        ${isActive && lastPathSegment === link.to.split('/').pop() ? 
                            "bg-black text-white" : "text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-black"}`}
                >
                    {link.text}
                </NavLink>
            ))}
        </div>

        {/* search page link */}
        <Link 
            to={'search'}
            className='flex items-center justify-center p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black transition-colors'>
            <IoMdSearch fontSize={20} />
        </Link>
    </div>
  )
}

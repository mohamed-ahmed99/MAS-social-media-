import React from 'react'
import { Link } from 'react-router-dom'
import { FiMoreHorizontal } from "react-icons/fi";


/*
    top "information about who has post this post"
    Name, Profile Picture, Date
    
*/ 

export default function PostTop({route, authorUsername, createdAt}) {
  return (
    
    <div className='flex items-center justify-between px-2 sm:px-3'>

        {/* Name, Profile Picture, Date */}
        <div className="flex items-center gap-3 sm:gap-4">
            <Link to={route}
                className="h-[40px] w-[40px] rounded-full overflow-hidden block">
                <img className="h-full w-full object-cover" src="/user.jpg" alt="user" />
            </Link>

            <div className="leading-tight">
                <Link 
                    to={route}
                    className="font-semibold text-[15px]"> 
                    {authorUsername}
                </Link>
                <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>
            </div>
        </div>

        {/* more button */}
        <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <FiMoreHorizontal size={20}/>
            </button>
        </div>
    </div>
  )
}
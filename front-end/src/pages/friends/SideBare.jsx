import React from 'react'
import { Link, NavLink } from "react-router-dom"
import { IoMdSettings } from "react-icons/io";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function SideBare() {

    const location = useLocation();
    const lastPathSegment = location.pathname.split('/').slice(-1)[0];

    // Links components
    const links = [
        {text:"friends", to:"/friends"},
        {text:"Friends requests", to:"friends_requests"},
        {text:"Suggestions", to:"friends_suggestions"},
    ]



  return (
    <div className='hidden md:block bg-white py-2 px-4 w-full max-w-[260px] lg:max-w-[350px]'>

        {/* Settings button */}
        <div className='flex items-center justify-between '>
            <h3 className='text-2xl font-semibold'>Friends</h3>

            <Link className='p-2 rounded-full hover:bg-gray-200'>
                <IoMdSettings fontSize={23}/>
            </Link>
        </div>

        {/* Links */}

        <div className='mt-4 flex flex-col gap-2'>
            {links.map((link, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg font-medium 
                            ${isActive && lastPathSegment == link.to.split('/').pop() ? 
                                'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`
                        }
                    >
                        {link.text}
                    </NavLink>
                </motion.div>
            ))}
        </div>
    </div>
  )
}
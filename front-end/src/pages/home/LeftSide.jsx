import { Link, Links } from 'react-router-dom'
import { FaUserFriends } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import {motion} from 'framer-motion'
import { useEffect, useState } from 'react';
import CircularImage from '../../components/CircularImage';


export default function LeftSide() {
  const [scroll, setScroll] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    if(window.scrollY > 10) setScroll(true)
    else setScroll(false)
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  const linkComponents = [
    {icon:<CircularImage src="./user.jpg" alt="user" size={36} firstName="M" lastName="A" />, text:"user name", href:"/profile"},
    {icon:<FaUserFriends fontSize={25}/>, text:"best friends", href:"/friends"},
    {icon:<FaBookmark fontSize={25}/>, text:"saved", href:"/saved"},
    {icon:<MdAccessTimeFilled fontSize={25}/>, text:"memories", href:"/memories"},
  ]


  return (
    <div className={`hidden md:block bg-white px-3 py-4 md:w-[250px] lg:w-[300px] h-screen fixed top-0 md:
          ${scroll ? "md:pt-[60px]" :"md:pt-[100px]"} lmd:pt-[75px] left-0 space-y-1 `}
    >
        {/*  */}
        {linkComponents.map((link, index) => {
            return(
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={link.href}
                  className='flex items-center gap-4 capitalize px-2 py-2 rounded-xl hover:bg-black/80 transition-all duration-200 group'
                >

                  <div className='flex items-center justify-center w-9 h-9 text-black group-hover:text-white'>
                    {link.icon}
                  </div>

                  <p className='font-medium text-black group-hover:text-white'>
                    {link.text}
                  </p>
                </Link>
              </motion.div>
            )
        })}
    </div>
  )
}



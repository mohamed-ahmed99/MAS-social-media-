import React from 'react'
import {motion} from 'framer-motion'
import { IoIosCamera } from "react-icons/io";

export default function CoverPhoto({img}) {
  return (
    <div className="relative">

        <img 
            src={img} alt="Cover"
            className="w-full h-52 sm:h-64 object-cover  lg:rounded-b-xl "
        />

        <motion.button 
            whileHover={{scale: .95}}
            className='absolute right-4 bottom-4 bg-white p-2 sm:px-4 py-2 rounded-lg flex items-center gap-2 '
        >

            <IoIosCamera fontSize={25}/>
            <p className='hidden sm:block -translate-y-[1px] capitalize'>Edit cover photo</p>
        </motion.button>
    </div>
  )
}

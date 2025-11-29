import React from 'react'
import {motion} from 'framer-motion'
import { IoIosCamera } from "react-icons/io";

export default function CoverPhoto({img}) {
  return (
    <div className="relative">

        <img 
            src={img} alt="Cover"
            className="w-full h-72 object-cover  lg:rounded-b-xl "
        />

        <motion.button 
            whileHover={{scale: 1.05}}
            className='absolute right-4 bottom-4 bg-white px-4 py-2 rounded-lg flex items-center gap-2 '
        >

            <IoIosCamera fontSize={25}/>
            <p className='-translate-y-[1px] capitalize'>Edit cover photo</p>
        </motion.button>
    </div>
  )
}

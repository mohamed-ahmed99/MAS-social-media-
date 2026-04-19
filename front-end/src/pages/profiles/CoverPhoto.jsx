import React from 'react'
import {motion} from 'framer-motion'
import { IoIosCamera } from "react-icons/io";

export default function CoverPhoto({img, edit=false, loading=false}) {

    // loading state
    if(loading){
        return (
           <div className="w-full h-52 sm:h-64 bg-gray-500/40 lg:rounded-b-xl ">
                <div className="w-full h-full bg-gray-300 animate-pulse lg:rounded-b-xl"></div>
            </div>
        )
    }


  return (
    <div className="relative">
        {img ? (
            <img 
                src={img} alt="Cover"
                className="w-full h-52 sm:h-64 object-cover  lg:rounded-b-xl "
            />
        ) : (
            <div className="w-full h-52 sm:h-64 bg-gray-700/40 flex items-center justify-center lg:rounded-b-xl ">
                <p className="text-gray-500">No cover photo</p>
            </div>
        )}
        
        {edit &&
            <motion.button 
                whileHover={{scale: .95}}
                className='absolute right-4 bottom-4 bg-white p-2 sm:px-4 py-2 rounded-lg flex items-center gap-2 '
            >

                <IoIosCamera fontSize={25}/>
                <p className='hidden sm:block -translate-y-[1px] capitalize'>Edit cover photo</p>
            </motion.button>
        }
        
    </div>
  )
}

import { useState } from 'react'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";

export default function ReactionButtons_XL({setOpenComments, handleLikeBTN}) {

    
  return (
    <div className="hidden xl:flex items-center justify-between px-10 ">
        <button 
            onClick={() => {}}
            className="hover:bg-gray-200 px-10 py-1 rounded-md">
            <AiOutlineLike fontSize={22}/>
        </button>
                
        <button 
            onClick={() => setOpenComments(prev => !prev)}
            className="hover:bg-gray-200 px-10 py-1 rounded-md"> <FaRegComment fontSize={19}/> 
        </button>
        <button className="hover:bg-gray-200 px-10 py-1 rounded-md"> <PiShareFat fontSize={22}/> </button>
    </div>
  )
}
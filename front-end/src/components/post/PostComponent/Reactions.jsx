// hooks
import { useState } from "react";

// icons
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";


export default function Reactions({reactionCounts, setOpenComments, TextToIcon, reactionsData}) {


    return (
    <div className="flex xl:hidden justify-between pt-1 px-1 sm:px-4"> 
        <div className="flex items-center gap-3">
                    
            {/* like */}
            <div className="flex items-center"> 
                <button 
                    onClick={() => {}}
                    className="hover:bg-gray-200 px-2 py-1 rounded-md"> 
                    <AiOutlineLike fontSize={22}/> 
                </button>
                <p>{reactionCounts?.reactions || 0}</p>
            </div>

            {/* comment */}
            <div 
                onClick={() => setOpenComments(prev => !prev)}
                className="flex items-center"
            > 
                <button className="hover:bg-gray-200 px-2 py-1 rounded-md"> <FaRegComment fontSize={19}/> </button>
                <p>{reactionCounts?.comments || 0}</p>
            </div>
            <div className="flex items-center">
                <button className="hover:bg-gray-200 px-2 py-1 rounded-md"> <PiShareFat fontSize={22}/> </button>
                <p>{reactionCounts?.shares || 0}</p>
            </div>
        </div>


        {/* most used reactions*/}
        <div className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-200 px-3 py-2">
            {reactionsData.mostUsedReactions && 
            <div className="flex items-center justify-between">
                {reactionsData.mostUsedReactions.map((icon, index) => {
                    return(
                        <div key={index}>{TextToIcon[icon]}</div>
                    )
                })}
            </div> }
        </div>
    </div>
  )
}
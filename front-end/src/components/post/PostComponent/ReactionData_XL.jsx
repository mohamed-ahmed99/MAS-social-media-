import React from 'react'
import { FaComment } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";
import GeneralBtn from "../../btns/GeneralBtn"

export default function ReactionData_XL({reactionsData, TextToIcon, setOpenComments, reactionCounts}) {
  
  
    return (
    <div className="hidden xl:flex items-center justify-between px-3"> 

        {/* reactions data */}
        <div className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-200 px-3 py-2">
           
            {/* most used reactions*/}
            {reactionsData?.mostUsedReactions?.length > 0 && 

                // map on most used reactions
                <div className="flex items-center justify-between">
                    {reactionsData?.mostUsedReactions?.map((icon, index) => {
                        return <div key={index}>{TextToIcon[icon]}</div>
                    })}
                </div> 
            }

            {/* count of reactions */}
            <p className="text-gray-600 font-semibold ">{reactionCounts?.reactions || 0}</p>
        </div>


        {/* comment and share */}
        <div className="flex items-center justify-between gap-3 text-gray-600 px-3 ">

            {/* comment */}
            <button 
                onClick={() => setOpenComments(prev => !prev)}
                className="flex items-center justify-between gap-1 cursor-pointer px-3 py-2"
            >
                <div>{reactionCounts?.comments || 0}</div>
                <div className=""><FaComment/></div>
            </button>

            {/* share */}
            <button 
                className="flex items-center justify-between gap-1 cursor-pointer"
            >
                <div>{reactionCounts?.shares || 0}</div>
                <div><PiShareFatFill/></div>
            </button>
        </div>
    </div>  
  )
}
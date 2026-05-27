import React from 'react'
import { FaComment } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";
import { reactionsData } from './reactionsData.jsx'

export default function ReactionData_XL({setOpenComments, postReactions}) {

    // filter reactions 
    const reactionTypes = postReactions?.topReactions?.map(reaction => reaction.reaction)

    return (
    <div className="hidden xl:flex items-center justify-between px-3"> 

        {/* reactions data */}
        <div className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-200 px-3 py-2">
           
            {/* most used reactions*/}
            {reactionTypes?.length > 0 && 
                // map on most used reactions
                <div className="flex items-center justify-between">
                    {reactionTypes?.map((reaction, index) => {
                        return <div key={index}>{reactionsData.find((r) => r.id === reaction)?.icon}</div>
                    })}
                </div> 
            }

            {/* count of reactions */}
            <p className="text-gray-600 font-semibold ">{postReactions?.totalCount || 0}</p>
        </div>


        {/* comment and share */}
        <div className="flex items-center justify-between gap-3 text-gray-600 px-3 ">

            {/* comment */}
            <button 
                onClick={() => setOpenComments(prev => !prev)}
                className="flex items-center justify-between gap-1 cursor-pointer px-3 py-2"
            >
                <div>{ 0}</div>
                <div className=""><FaComment/></div>
            </button>

            {/* share */}
            <button 
                className="flex items-center justify-between gap-1 cursor-pointer"
            >
                <div>{ 0}</div>
                <div><PiShareFatFill/></div>
            </button>
        </div>
    </div>  
  )
}
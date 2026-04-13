import React from 'react'


/*
   
*/

export default function Text({text}) {
  return (
    <div className="px-3 mt-3 mb-2">
        <p className="text-[15px] leading-relaxed whitespace-pre-line text-black/90">
            {text}
        </p>
    </div>
  )
}
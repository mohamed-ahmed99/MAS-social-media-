import React from 'react'

export default function UI_Message({icon, text, iconColor}) {
  return (
    <div className={`h-full w-full flex flex-col items-center justify-center`}>
        {icon && <span className={`${iconColor}`}>{icon}</span>}

        <p className='text-lg  text-gray-600 sm:text-2xl sm:tracking-wider'>{text}</p>
    </div>
  )
}

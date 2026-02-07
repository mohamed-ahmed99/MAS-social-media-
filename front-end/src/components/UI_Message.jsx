import React from 'react'

export default function UI_Message({icon, text, iconColor}) {
  return (
    <div className={`h-full w-full flex flex-col items-center `}>
        {icon && <span className={`${iconColor}`}>{icon}</span>}

        <p className='text-gray-600 text-2xl tracking-wider'>{text}</p>
    </div>
  )
}

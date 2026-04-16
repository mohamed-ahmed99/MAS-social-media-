import React from 'react'

export default function SystemPost({text, icon}) {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100/50 p-4'>
        <div className='flex items-center justify-center gap-2'>
            {icon}
            <p className='text-center text-gray-500 italic'>{text}</p>
        </div>
    </div>
  )
}
import React from 'react'

export default function FriendCardLoading() {
  return (
    <div className='w-full flex items-center gap-2 px-2'>
        <div className='h-10 w-10 rounded-full bg-gray-400/70 animate-pulse'></div>
        <div className=''>
            <div className='h-3 w-40 bg-gray-400/70 rounded animate-pulse mb-1'></div>
            <div className='h-3 w-28 bg-gray-400/70 rounded animate-pulse'></div>
        </div>
    </div>
  )
}

import React from 'react'

export default function FriendCardLoading() {
  if(window.innerWidth > 900){
    return(
        <div className='max-w-[250px]  grow overflow-hidden flex flex-col gap-2 bg-white rounded-md '>
            {/* img */}
            <div className='h-[200px] bg-gray-400/75 animate-pulse'></div>
            {/* content */}
            <div className='space-y-2 px-1 pb-2'>
                <div className='bg-gray-400/75 animate-pulse h-5 rounded-md w-2/3'></div>
                <div className='bg-gray-400/75 animate-pulse h-3 rounded-md w-full'></div>
                <div className='bg-gray-400/75 animate-pulse h-3 rounded-md w-4/5'></div>
                <div className='bg-gray-400/75 animate-pulse h-4 rounded-md w-full'></div>
            </div>
        </div>
    )
  }
  else{
    return(
        <div className='col-span-3 flex items-center gap-2 px-2 bg-white rounded-xl shadow p-1'>
            <div className='h-24 w-24 shrink-0 rounded-full bg-gray-400/75 animate-pulse'></div>
            <div className='w-full space-y-2'>
                <div className='bg-gray-400/75 h-5 w-2/3 animate-pulse rounded-lg'></div>
                <div className='bg-gray-400/75 h-5 w-full animate-pulse rounded-lg'></div>
                
                <div className='w-full flex items-center justify-between gap-2'>
                    <div className='bg-gray-400/75 h-4 w-2/3 animate-pulse rounded-lg'></div>
                    <div className='bg-gray-400/75 h-4 w-full animate-pulse rounded-lg'></div>
                </div>
            </div>
            
        </div>
    )
  }
}

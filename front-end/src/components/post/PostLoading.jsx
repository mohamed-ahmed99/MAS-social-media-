import React from 'react'

export default function PostLoading() {
  return (
    <div className="bg-white lg:rounded-lg p-4 shadow-md space-y-4 w-full"> 
        <div className='flex gap-4'>
            <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div>
                <p className="h-4 w-52 bg-gray-300 rounded mb-2 animate-pulse"></p>
                <p className="h-3 w-36 bg-gray-300 rounded animate-pulse"></p>
            </div>
        </div>

        <div>
            <p className="h-4 w-1/3 bg-gray-300 rounded mb-2 animate-pulse"></p>
            <p className="h-4 w-4/5 bg-gray-300 rounded mb-2 animate-pulse"></p>
            <p className="h-4 w-1/2 bg-gray-300 rounded mb-2 animate-pulse"></p>
            <p className="h-4 w-full bg-gray-300 rounded mb-2 animate-pulse"></p>
            <p className="h-4 w-4/5 bg-gray-300 rounded mb-2 animate-pulse"></p>
        </div>
    </div>
  )
}

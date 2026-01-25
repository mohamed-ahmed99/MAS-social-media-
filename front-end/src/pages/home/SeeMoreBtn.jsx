import React from 'react'

export default function SeeMoreBtn({setQuery}) {

    const handleClick = () => {
        setQuery(prev => ({...prev, page: prev.page + 1,}))
    }


  return (
    <button
        onClick={handleClick}
        className='w-full flex justify-center py-2 border-t hover:bg-gray-100 group'
    >
        <span className='text-blue-600 font-medium cursor-pointer group-hover:underline'>See more</span>
    </button>
  )
}

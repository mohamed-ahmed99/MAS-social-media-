import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function SeeMoreBtn({setQuery, loading}) {
    console.log(loading, "see more btn loading")

    const handleClick = () => {
        setQuery(prev => ({...prev, page: prev.page + 1,}))
    }


  return (
    <button
        onClick={handleClick}
        disabled={loading}
        className={`w-full flex justify-center py-2 border-t
            ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-100'}
        `}
    >
        <span className='text-blue-600 font-medium cursor-pointer group-hover:underline'>See more</span>
        {
            loading && <ClipLoader size={20} color="#000" className='ml-2'/>
        }
    </button>
  )
}

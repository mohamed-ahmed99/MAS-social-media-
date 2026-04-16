import React from 'react'

export default function NoPostsYet({edit, setCreatePost}) {
  return (
    <div className="bg-white p-12 lg:rounded-xl shadow-sm text-center border border-gray-100/50 flex flex-col items-center justify-center space-y-3">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v4a2 2 0 002 2h4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12h10M7 16h10" />
            </svg>
        </div>
        <p className="text-gray-400 font-medium text-lg">No posts yet</p>
        {edit && (
            <button 
                onClick={() => setCreatePost(true)}
                className="text-black hover:underline font-semibold"
            >
                Share your first post
            </button>
        )}
    </div>
  )
}
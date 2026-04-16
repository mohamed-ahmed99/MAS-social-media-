import React from 'react';
import PersonalDetails from './PersonalDetails';
import Friends from './Friends';
import PostEditor from './PostEditor';
import Post from '../../components/post/Post';

/*
  - 
*/ 

export default function ProfileContent({ userData, posts, edit, setCreatePost }) {
  return (
    <div className="w-full lg:max-w-[1000px] mx-auto px-0 sm:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 pb-8">
        
        {/* Left Column: Intro & Friends */}
        <div className="order-1 lg:order-1 lg:col-span-5 space-y-4 lg:sticky lg:top-[80px] h-fit">
          <div className="bg-white lg:rounded-xl shadow-sm overflow-hidden border border-gray-100/50">
            <PersonalDetails edit={edit} userData={userData} />
          </div>
          
          <div className="bg-white lg:rounded-xl shadow-sm overflow-hidden border border-gray-100/50">
            <Friends />
          </div>
        </div>

        {/* Right Column: Post Composer & Feed */}
        <div className="order-2 lg:order-2 lg:col-span-7 space-y-4">
          {/* Post Editor - only if it's my profile */}
          {edit && (
            <div className="bg-white lg:rounded-xl shadow-sm border border-gray-100/50">
              <PostEditor 
                me={edit} 
                placeholder={`What's on your mind, ${userData?.personalInfo?.firstName}?`}
                onClick={() => setCreatePost(true)} 
              />
            </div>
          )}

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="bg-white lg:rounded-xl shadow-sm overflow-hidden border border-gray-100/50">
                   <Post data={post} />
                </div>
              ))
            ) : ( 
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
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
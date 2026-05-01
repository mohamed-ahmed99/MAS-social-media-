import React from 'react';
import PersonalDetails from './PersonalDetails';
import Friends from './Friends';
import PostEditor from './PostEditor';
import Posts from './Posts';

/*
  - 
*/ 

export default function ProfileContent({ userData, edit, setCreatePost, loading }) {



  return (
    <div className="w-full lg:max-w-[1000px] mx-auto px-0 sm:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">
        
        {/* Left Column: Intro & Friends */}
        <div className="order-1 lg:order-1 lg:col-span-5 lg:space-y-4 lg:sticky lg:top-[80px] h-fit">
          <div className="bg-white lg:rounded-xl shadow-sm overflow-hidden border border-gray-100/50">
            <PersonalDetails 
              edit={edit} 
              loading={loading}
              userData={{
                address: userData?.personalInfo?.address,
                gender: userData?.personalInfo?.gender,
                dateOfBirth: userData?.personalInfo?.dateOfBirth,
              }} 
            />
          </div>
          
          <div className="bg-white lg:rounded-xl shadow-sm overflow-hidden border border-gray-100/50">
            <Friends />
          </div>
        </div>

        {/* Right Column: Post Composer & Feed */}
        <div className="order-2 lg:order-2 lg:col-span-7 lg:space-y-4">
          {/* Post Editor - only if it's my profile */}
          {edit && (
            <div className="bg-white lg:rounded-xl shadow-sm border border-gray-100/50">
              <PostEditor 
                edit={edit} 
                placeholder={`What's on your mind, ${userData?.personalInfo?.firstName}?`}
                createPost={setCreatePost}
                profilePicture={userData?.personalInfo?.profilePicture}
                firstName={userData?.personalInfo?.firstName}
              />
            </div>
          )}

          {/* Posts Feed */}
          <div className="">
            <Posts 
              author={{
                _id: userData?._id,
                personalInfo: {
                  firstName: userData?.personalInfo?.firstName,
                  lastName: userData?.personalInfo?.lastName,
                  profilePicture: userData?.personalInfo?.profilePicture
                }
              }}
              joinDate={userData?.createdAt} 
              setCreatePost={setCreatePost} 
              edit={edit}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
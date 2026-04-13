import React from 'react'

import PersonalDetails from "./PersonalDetails";
import PostEditor from "./PostEditor";
import PostView from "./PostView";
import Friends from "./Friends";
import Posts from "./Posts";
import { useUserContext } from '../../hooks/useUserContext';

export default function All() {

  const {userData, setUserData} = useUserContext()
  console.log("userData in profile all page:", userData);

  return (
    <>
     <div className="hidden lg:block w-full lg:max-w-[900px] m-auto gap-4">
              <div className="grid grid-cols-10 gap-4">

                <div className="col-span-6 flex flex-col justify-between">
                      <PersonalDetails me={true}/>
                      <div className="col-span-10 lg:col-span-6 lg:rounded-xl space-y-4">
                        <PostEditor me={true}/>
                        <PostView/>
                      </div>
                  </div>

                  <div className="col-span-4">
                    <Friends/>
                  </div>

              </div>

              <div className="mt-4">
                  <Posts />
              </div>

          </div>


        <div className="lg:hidden w-full lg:max-w-[900px] m-auto grid grid-cols-10 lg:gap-4">
          {/* personal details */}
          <PersonalDetails me={true}/>

          {/* post manager */}
          <div className="col-span-10 lg:col-span-6 lg:rounded-xl space-y-4">
              <PostEditor me={true}/>
              <PostView/>
          </div>


          <Friends/>
          <Posts />
        </div>
    
    
    </>
  )
}

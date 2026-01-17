import React from 'react'

import PersonalDetails from "../profile/PersonalDetails";
import PostEditor from "../profile/PostEditor";
import PostView from "../profile/PostView";
import Friends from "../profile/Friends";
import Posts from "../profile/Posts";

// my hooks 
import {useUserContext} from '../../hooks/useUserContext'
import {pageTop} from '../../hooks/someFunctions'

export default function AllUserPage() {

  pageTop('user - MAS Social Media ')

  return (
    <>
     <div className="hidden lg:block w-full lg:max-w-[900px] m-auto gap-4">
              <div className="grid grid-cols-10 gap-4">

                <div className="col-span-6 flex flex-col justify-between">
                      <PersonalDetails me={false}/>
                      <div className="col-span-10 lg:col-span-6 lg:rounded-xl space-y-4">
                        <PostEditor placeholder={`write a post to user `} me={false} />
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
          <PersonalDetails/>

          {/* post manager */}
          <div className="col-span-10 lg:col-span-6 lg:rounded-xl space-y-4">
              <PostEditor/>
              <PostView/>
          </div>


          <Friends/>
          <Posts/>
        </div>
    
    
    </>
  )
}

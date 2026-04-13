import React from 'react'

// import PersonalDetails from "../profile/PersonalDetails";
import PersonalDetails from "../oldProfile/PersonalDetails";
import PostEditor from "../oldProfile/PostEditor";
import PostView from "../oldProfile/PostView";
import Friends from "../oldProfile/Friends";
import Posts from "../oldProfile/Posts";
import {useLocation} from 'react-router-dom';

// my hooks 
import {pageTop} from '../../hooks/someFunctions'


export default function AllUserPage() {
  
  const location = useLocation();
  const userId = location.pathname.split('-').pop();


  

  pageTop('user - MAS Social Media ')

  // 

  return (
    <>
     <div className="hidden lg:block w-full lg:max-w-[900px] m-auto gap-4">
              <div className="grid grid-cols-10 gap-4">

                <div className="col-span-6 flex flex-col justify-between">
                      <PersonalDetails me={false} />
                      <div className="col-span-10 lg:col-span-6 lg:rounded-xl space-y-4">
                        <PostEditor placeholder={`write a post to user `} me={false} />
                      </div>
                  </div>

                  <div className="col-span-4">
                    <Friends/>
                  </div>

              </div>

              <div className="mt-4">
                  <Posts memberId={userId}/>
              </div>

          </div>


        <div className="lg:hidden w-full lg:max-w-[900px] m-auto grid grid-cols-10 lg:gap-4">
          {/* personal details */}
          <PersonalDetails me={false}/>

          {/* post manager */}
          <div className="col-span-10 lg:col-span-6 lg:rounded-xl space-y-4">
              <PostEditor me={false}/>
              <PostView/>
          </div>


          <Friends/>
          <Posts memberId={userId}/>
        </div>
    
    
    </>
  )
}

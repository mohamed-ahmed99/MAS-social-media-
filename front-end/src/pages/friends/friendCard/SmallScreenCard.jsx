import React from 'react'
import { Link } from 'react-router-dom';


export default function SmallScreenCard({ 
  userName, 
  userData, 
  grayBtn, 
  HandleBlueBtn, 
  HandleGrayBtn,
  status_d,
}) {
  return (
    <div className='col-span-3 shadow w-full flex items-center gap-4 bg-white rounded-md p-2 max-w-full overflow-hidden'
      to={`/user/${(userName.replaceAll(" ", "_")).replaceAll("-", "_")}-${userData?._id}`}>

      {/* img */}
      <div className='w-[100px] h-[100px] rounded-full overflow-hidden bg-black shrink-0'>
        <img src={`/user.jpg`} alt="friend-img" />
      </div>

      <div className='w-full'>
        {/* info */}
        <div>
          <h2 className='font-semibold text-stone-800'>{userName}</h2>
          <p className='text-sm text-gray-700'>{0} mutual friends</p>
        </div>

        {/* btns */}
        <div className="flex gap-2 mt-2 w-full">
          {status_d !== "success" && <HandleBlueBtn />}

          {grayBtn &&
            <HandleGrayBtn />
          }
        </div>
      </div>

    </div>
  )
}
import React from 'react'
import { Link } from 'react-router-dom';
import CircularImage from '../../../components/CircularImage.jsx'
import GeneralBtn from '../../../components/btns/GeneralBtn.jsx'


export default function SmallScreenCard({ 
  userName, 
  userData,
  blackBtn,
  grayBtn,
}) {
  return (
    <Link className='col-span-3 shadow w-full flex items-center gap-4 bg-white rounded-md p-2 max-w-full overflow-hidden'
      to={`/user/${(userName.replaceAll(" ", "_")).replaceAll("-", "_")}-${userData?._id}`}>

      {/* img */}
      <div className='w-[100px] h-[100px] rounded-full overflow-hidden shrink-0'>
        <CircularImage
          src={userData?.profilePicture}
          alt=""
          size={100}
          firstName={userData?.personalInfo?.firstName}
          lastName={userData?.personalInfo?.lastName}
          className="rounded-full border-none"
        />
      </div>

      <div className='w-full'>
        {/* info */}
        <div>
          <h2 className='font-semibold text-stone-800'>{userName}</h2>
          <p className='text-sm text-gray-700'>{0} mutual friends</p>
        </div>

        {/* btns */}
        <div className="flex gap-2 mt-2 w-full">
          {blackBtn?.isExist && (
            <GeneralBtn
              variant="black"
              loading={blackBtn.loading}
              disabled={blackBtn.disabled}
              onClick={blackBtn.onClick}
            >
              {blackBtn.text}
            </GeneralBtn>
          )}
          {grayBtn?.isExist && (
            <GeneralBtn
              variant="primary"
              loading={grayBtn.loading}
              disabled={grayBtn.disabled}
              onClick={grayBtn.onClick}
            >
              {grayBtn.text}
            </GeneralBtn>
          )}
        </div>
      </div>

    </Link>
  )
}
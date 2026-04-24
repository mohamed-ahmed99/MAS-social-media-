import React from 'react'

import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom';

import { usePostMethod } from '../../../hooks/usePostMethod';
import { usePathMethod } from '../../../hooks/usePatchMethod';
import { useDeleteMethod } from '../../../hooks/useDeleteMethod';
import { useState } from 'react';

// components
import BigScreenCard from './BigScreenCard.jsx';
import SmallScreenCard from './SmallScreenCard.jsx';

export default function FriendCards({ userData, blueBtn, grayBtn }) {

  // my hooks "server actions"
  const { postData, status_p, message_p, data_p, loading_p } = usePostMethod()
  const { editData, status_e, message_e, data_e, loading_e } = usePathMethod()
  const { deleteData, status_d, message_d, data_d, loading_d } = useDeleteMethod()

  // states
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth); // screen width

  // user name
  const userName = userData?.personalInfo ? `${userData.personalInfo.firstName} ${userData.personalInfo.lastName}` : "Unknown User"


  // resize event
  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  // handle comessage button
  const handleMessage = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }


  // handle confirm button
  const handleConfirm = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = e.target.innerHTML

    // accept friend request
    const endPoint = `/api/relationship/accept-friend?from=${userData?._id}`
    if (text == "confirmed") {
      e.target.style.background = '#6B7280'
      return null
    }
    await editData(endPoint, null)
  }


  // handle add friend button
  const handleAddFriend = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = e.target.innerHTML

    const endPoint = `/api/relationship?type=friend`
    if (text === "pending") {
      e.target.style.background = '#6B7280'
      return null
    }
    const body = { to: userData?._id }
    await postData(endPoint, { headers: { authorization: `Bearer ${token}` } }, body)
  }


  // handle delete button
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.innerText.endsWith('ed')) {
      e.target.style.background = '#6B7280'
      return null
    }

    const text = e.target.innerText || undefined
    let endPoint

    if (text.toLowerCase() === "delete") {
      endPoint = `/api/relationship/me/${userData?._id}?type=friend&status=accepted`
    }
    else if (text.toLowerCase() === "cancel" || text.toLowerCase() === "reject") {
      endPoint = `/api/relationship/me/${userData?._id}?type=friend&status=pending`
    }

    await deleteData(endPoint)
  }





  // handle blue button
  const HandleBlueBtn = () => {
    const style = `${status_p === "success" || status_e === "success" ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} grow text-white px-4 py-[6px] rounded-md capitalize`
    // message
    if (blueBtn === "message") {
      return (
        <button onClick={(e) => handleMessage(e)} className={style}>{blueBtn}</button>
      )
    }

    // confirm
    else if (blueBtn === "confirm") {
      return <button
        onClick={(e) => handleConfirm(e)}
        disabled={loading_e}
        className={style}>
        {loading_e ?
          (<span className='flex gap-1 items-center justify-around text-[16px]'>{blueBtn}
            <ClipLoader size={20} color='white' /></span>)
          : status_e === "success" ? "confirmed" : blueBtn
        }
      </button>
    }
    // add
    else if (blueBtn === "add friend") {

      return <button
        onClick={(e) => handleAddFriend(e)}
        disabled={loading_p}
        className={style}>
        {loading_p ?
          (<span className='flex gap-1 items-center justify-around text-[16px]'>{blueBtn}
            <ClipLoader size={20} color='white' /></span>)
          : status_p === "success" ? "pending" : blueBtn
        }
      </button>
    }
  }


  const HandleGrayBtn = () => {

    let grayBtnText;

    if (loading_d) {
      grayBtnText =
        <span className='flex gap-1 items-center justify-around text-[16px]'>
          {grayBtn}
          <ClipLoader size={20} color='white' />
        </span>
    } else {
      grayBtnText = grayBtn
    }

    return (
      <button
        onClick={(e) => handleDelete(e)}
        disabled={loading_d}
        className={`capitalize ${status_d === 'success' ? "bg-[#6B7280]" : "bg-gray-300 hover:bg-gray-400"} grow  block px-4 py-[6px] rounded-md `}
      >{
          status_d === 'success' ?
            (grayBtnText.endsWith('e') ? grayBtnText + 'd' : grayBtnText + 'ed') : grayBtnText
        }
      </button>
    )
  }


  // ---------------------
  // return
  // ---------------------

  console.log(userData);
  

  if (screenWidth > 900) {
    return (
      <BigScreenCard 
        userName={userName}
        userData={userData}
        blueBtn={blueBtn}
        grayBtn={grayBtn}
        HandleBlueBtn={HandleBlueBtn}
        HandleGrayBtn={HandleGrayBtn}
        status_p={status_p}
        status_d={status_d}
        status_e={status_e}
      />
    )
  } else {
    return (
      <SmallScreenCard
        userName={userName}
        userData={userData}
        blueBtn={blueBtn}
        grayBtn={grayBtn}
        HandleBlueBtn={HandleBlueBtn}
        HandleGrayBtn={HandleGrayBtn}
        status_p={status_p}
        status_d={status_d}
        status_e={status_e}
      />
    )
  }
}
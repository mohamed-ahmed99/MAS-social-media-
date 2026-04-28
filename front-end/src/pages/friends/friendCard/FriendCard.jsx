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

import {addFriend} from './blackBtnFunctions.js' 

export default function FriendCards({ userData, blackBtn, grayBtn }) {

  // my hooks "server actions"
  const { postData, status_p, message_p, data_p, loading_p } = usePostMethod()
  const { editData, status_e, message_e, data_e, loading_e } = usePathMethod()
  const { deleteData, status_d, message_d, data_d, loading_d } = useDeleteMethod()

  // states
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth); // screen width
  


  // user name
  const userName = userData.firstName && userData.lastName
    ? `${userData.firstName} ${userData.lastName}`
    : "Unknown User"


  // resize event
  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const handleAddFriend = async (e) => {
    await addFriend(e, userData._id, {type: "friend"}, postData);
  }

  const getBlackBtnProps = () => {
    if (blackBtn === "ADD_FRIEND") {
      return {
        text: status_p === "success" ? "Request sent" : "Add Friend",
        loading: loading_p,
        disabled: status_p === "success",
        onClick: handleAddFriend,
        isExist: true
      };
    }
    return { isExist: false };
  };

  const getGrayBtnProps = () => {
    if (grayBtn === "REMOVE_FRIEND") {
      return {
        text: "Remove",
        loading: false, // Handle dynamic loading later
        disabled: false,
        onClick: (e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
        }, // Handle click later
        isExist: true
      };
    }
    return { isExist: false };
  };


  if (screenWidth > 900) {
    return (
      <BigScreenCard 
        userName={userName}
        userData={userData}
        blackBtn={getBlackBtnProps()}
        grayBtn={getGrayBtnProps()}
      />
    )
  } else {
    return (
      <SmallScreenCard
        userName={userName}
        userData={userData}
        blackBtn={getBlackBtnProps()}
        grayBtn={getGrayBtnProps()}
      />
    )
  }
}
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
  const { postData, status_p, loading_p } = usePostMethod()
  const { editData, status_e, message_e, data_e, loading_e } = usePathMethod()
  const { deleteData, status_d, message_d, data_d, loading_d } = useDeleteMethod()

  // states
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth); // screen width
  const [activeAction, setActiveAction] = useState(null); // track which button was clicked
  


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
        disabled: status_p === "success" || loading_p,
        onClick: handleAddFriend,
        isExist: true
      };
    }
    else if (blackBtn === "CANCEL_REQUEST") {
      return {
        text: status_d === "success" ? "Cancelled" : "Cancel Request",
        loading: loading_d,
        disabled: status_d === "success" || loading_d,
        onClick: (e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
          deleteData(`/api/relationship/delete/${userData?._id}?type=friend`,{})
        },
        isExist: true
      };
    }
    else if (blackBtn === "CONFIRM") {
      // Hide this button if the other action succeeded
      if (activeAction === "reject" && status_e === "success") {
        return { isExist: false };
      }

      return {
        text: activeAction === "confirm" && status_e === "success" ? "Confirmed" : "Confirm",
        loading: activeAction === "confirm" && loading_e,
        disabled: (activeAction === "confirm" && status_e === "success") || loading_e,
        onClick: (e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
          setActiveAction("confirm");
          // /api/relationship/accept-friend-request/69e192e70c037cbd79b4518d
          editData(`/api/relationship/accept-friend-request/${userData?._id}`,{})
        },
        isExist: true
      };
    }
    return { isExist: false };
  };

  const getGrayBtnProps = () => {
    
    if (grayBtn === "REJECT") {
      // Hide this button if the other action succeeded
      if (activeAction === "confirm" && status_e === "success") {
        return { isExist: false };
      }

      return {
        text: activeAction === "reject" && status_e === "success" ? "Rejected" : "Reject",
        loading: activeAction === "reject" && loading_e,
        disabled: (activeAction === "reject" && status_e === "success") || loading_e,
        onClick: (e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
          setActiveAction("reject");
          // api/relationship/update-status/:targetUserId?new_status=rejected
          editData(`/api/relationship/update-status/${userData?._id}?new_status=rejected`,{})
        },
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
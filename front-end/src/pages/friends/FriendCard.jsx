import React from 'react'

import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom';

import { usePostMethod } from '../../hooks/usePostMethod';
import { usePathMethod } from '../../hooks/usePatchMethod';
import { useDeleteMethod } from '../../hooks/useDeleteMethod';
import { useState } from 'react';

export default function FriendCards({userData,  blueBtn, grayBtn}) {
  console.log(userData)

  const {postData, status_p, message_p, data_p, loading_p} = usePostMethod()
  const {editData, status_e, message_e, data_e, loading_e} = usePathMethod()
  const {deleteData, status_d, message_d, data_d, loading_d} = useDeleteMethod()

  const userName = userData?.personalInfo ? `${userData.personalInfo.firstName} ${userData.personalInfo.lastName}` : "userName"
  
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

    React.useEffect(() => { 
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const token = localStorage.getItem("MASproAuth")



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

      // http://localhost:5150/api/relationship/accept-friend?from=${userData?._id}
      const url = `https://masproback.vercel.app/api/relationship/accept-friend?from=${userData?._id}`
      if(text == "confirmed"){
        e.target.style.background = '#6B7280'
        return null
      }
      await editData(url,null)
    }


    // handle add friend button
    const handleAddFriend = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = e.target.innerHTML

      const url = `https://masproback.vercel.app/api/relationship?type=friend`
      if(text === "pending"){
        e.target.style.background = '#6B7280'
        return null
      }
      const body = {to:userData?._id}
      await postData(url, {headers:{authorization:`Bearer ${token}`}}, body)
    }


    // handle delete button
    const handleDelete = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if(e.target.innerText.endsWith('ed')){
        e.target.style.background = '#6B7280'
        return null
      }

      const text = e.target.innerText || undefined
      console.log(text)
      let url

      if(text.toLowerCase() === "delete"){
        url = `https://masproback.vercel.app/api/relationship/me/${userData?._id}?type=friend&status=accepted`
      }
      else if (text.toLowerCase() === "cancel" || text.toLowerCase() === "reject"){
        url = `https://masproback.vercel.app/api/relationship/me/${userData?._id}?type=friend&status=pending`
      }

      await deleteData(url)
    }

    console.log({status_d, message_d, data_d, loading_d})





    // handle blue button
    const HandleBlueBtn = () => {
      const style = `${status_p === "success" || status_e === "success"  ? "bg-gray-500" :"bg-blue-500 hover:bg-blue-600"} grow text-white px-4 py-[6px] rounded-md capitalize`
      // message
      if(blueBtn === "message") {
        return (
          <button onClick={(e) => handleMessage(e)} className={style}>{blueBtn}</button>
        )
      }

      // confirm
      else if (blueBtn === "confirm"){
        return <button 
                  onClick={(e) => handleConfirm(e)} 
                  disabled={loading_e}
                  className={style}>
                    {loading_e ? 
                        (<span className='flex gap-1 items-center justify-around text-[16px]'>{blueBtn} 
                        <ClipLoader size={20} color='white'/></span>) 
                      : status_e === "success"  ? "confirmed" : blueBtn 
                    }
        </button>
      }
      // add
      else if (blueBtn === "add friend"){
        
        return <button 
                onClick={(e) => handleAddFriend(e)}
                disabled={loading_p}
                className={style}>
                  {loading_p ? 
                      (<span className='flex gap-1 items-center justify-around text-[16px]'>{blueBtn} 
                      <ClipLoader size={20} color='white'/></span>) 
                    : status_p === "success"  ? "pending" : blueBtn 
                  }
        </button>
      }
    }

    const HandleGrayBtn = () => {

      let grayBtnText;

      if(loading_d){
        grayBtnText = 
            <span className='flex gap-1 items-center justify-around text-[16px]'>
              {grayBtn} 
              <ClipLoader size={20} color='white'/> 
            </span>
      }else{
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
    

  if(screenWidth > 900) {   
    return (
      <Link to={`/user/${(userName.replaceAll(" ", "_")).replaceAll("-", "_")}-${userData?._id}`}
        className='max-w-[250px] grow overflow-hidden flex flex-col gap-2 bg-white rounded-md' >
        
          {/* img */}
          <div className='w-full h-[200px]'>
            <img 
              src={`/user.jpg`} 
              alt="friend-img" 
              className='w-full h-[200px] object-cover'
            />

          </div>


          {/* name and mutual friends */}
          <div className='px-2'>
            <h2 className='text-[15px] font-semibold text-stone-800'>{userName}</h2>
            <p className='text-sm text-gray-700'>{ 0} mutual friends</p>
          </div>

          {/* buttons */}
          <div className='flex gap-2 flex-col py-2 px-1'>
              {status_d !== "success" && <HandleBlueBtn/> }
              {grayBtn && 
                <HandleGrayBtn/>
              }
          </div>


      </Link>
    )
  }else{
    return (
      <Link 
        to={`/user/${(userName.replaceAll(" ", "_")).replaceAll("-", "_")}-${userData?._id}`}
        className='col-span-3 shadow w-full flex items-center gap-4 bg-white rounded-md p-2 max-w-full overflow-hidden' 
      >
        {/* img */}
        <div className='w-[100px] h-[100px] rounded-full overflow-hidden bg-black shrink-0'>
          <img src={`/user.jpg`}  alt="friend-img" />
        </div>

        <div className='w-full'>
          {/* info */}
          <div>
            <h2 className='font-semibold text-stone-800'>{userName}</h2>
            <p className='text-sm text-gray-700'>{0} mutual friends</p>
          </div>

          {/* btns */}
          <div className="flex gap-2 mt-2 w-full">
            {status_d !== "success" && <HandleBlueBtn/> }
            

            {grayBtn &&
              <HandleGrayBtn/>
            }
          </div>
        </div>

      </Link>
    )
  }
}
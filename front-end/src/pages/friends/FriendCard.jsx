import React from 'react'

import { IoMdSettings } from "react-icons/io";
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom';

import { usePostMethod } from '../../hooks/usePostMethod';

export default function FriendCards({userData,  blueBtn}) {

  const {postData, status_p, message_p, data_p, loading_p} = usePostMethod()

  const userName = userData?.personalInfo ? `${userData.personalInfo.firstName} ${userData.personalInfo.lastName}` : ""
  
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

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
    const handleConfirm = (e) => {
      e.preventDefault();
      e.stopPropagation();
    }
    // handle add friend button
    const handleAddFriend = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = e.target.innerHTML

      const url = `https://masproback.vercel.app/api/relationships?type=friend`
      if(text === "pending"){
        e.target.style.background = '#6B7280'
        return null
      }
      const token = localStorage.getItem("MASproAuth")
      const body = {to:userData?._id}
      await postData(url, {headers:{authorization:`Bearer ${token}`}}, body)
    }
    console.log({status_p, message_p, data_p, loading_p})


    // handle delete button
    const handleDelete = (e) => {
      e.preventDefault();
      e.stopPropagation();
    }




    // handle blue button
    const HandleBlueBtn = () => {
      const style = `${status_p === "success" ? "bg-gray-500" :"bg-blue-500 hover:bg-blue-600"} grow text-white px-4 py-[6px] rounded-md capitalize`
      // message
      if(blueBtn === "message") {
        return (
          <button onClick={(e) => handleMessage(e)} className={style}>{blueBtn}</button>
        )
      }
      // confirm
      else if (blueBtn === "confirm"){
        return <button onClick={(e) => handleConfirm(e)} className={style}>{blueBtn}</button>
      }
      // add
      else if (blueBtn === "add friend"){
        
        if(loading_p){
          
        }
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
    

  if(screenWidth > 900) {   
    return (
      <Link to={'/'}
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
              <HandleBlueBtn/>
              <button 
                onClick={(e) => handleDelete(e)}
                className='bg-gray-200 text-gray-700 px-4 py-[6px] rounded-md hover:bg-gray-300'
              >Delete</button>
          </div>


      </Link>
    )
  }else{
    return (
      <Link 
        to={'/'}
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
            <HandleBlueBtn/>
            <button  
                onClick={(e) => handleDelete(e)}
                className='bg-gray-200 grow  block px-4 py-[6px] rounded-md hover:bg-gray-300'
              >Delete
            </button>
          </div>
        </div>

      </Link>
    )
  }
}
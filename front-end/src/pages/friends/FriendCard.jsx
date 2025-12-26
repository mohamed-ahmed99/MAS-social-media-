import React from 'react'
import { IoMdSettings } from "react-icons/io";

import { Link } from 'react-router-dom';

export default function FriendCards({friendData,  blueBtn}) {

  
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

    React.useEffect(() => { 
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    // handele confirm button
    const handleConfirm = (e) => {
      e.preventDefault();
      e.stopPropagation();
    }


    // handle delete button
    const handleDelete = (e) => {
      e.preventDefault();
      e.stopPropagation();
    }




    // handle blue button
    const HandleBlueBtn = ({width="100%"}) => {
      if(blueBtn === "confirm") {
        const style = `bg-blue-500 w-${width} text-white px-4 py-[6px] rounded-md hover:bg-blue-600`
        return (
          <button onClick={(e) => handleConfirm(e)} className={style}>Confirm</button>
        )
      }
    }
    
  if(screenWidth > 900) {   
    return (
      <Link to={'/'}
        className='max-w-[250px] grow overflow-hidden flex flex-col gap-2 bg-white rounded-md' >
        
          {/* img */}
          <img src={friendData.img} alt="friend-img" />


          {/* name and mutual friends */}
          <div className='px-2'>
            <h2 className='text-[15px] font-semibold text-stone-800'>{friendData.name}</h2>
            <p className='text-sm text-gray-700'>{friendData.mutualFriends} mutual friends</p>
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
          <img src={friendData.img} alt="friend-img" />
        </div>

        <div className='w-full'>
          {/* info */}
          <div>
            <h2 className='font-semibold text-stone-800'>{friendData.name}</h2>
            <p className='text-sm text-gray-700'>{friendData.mutualFriends} mutual friends</p>
          </div>

          {/* btns */}
          <div className="flex gap-2 mt-2 w-full">
            <HandleBlueBtn width="1/2"/>
            <button  
                onClick={(e) => handleDelete(e)}
                className='bg-gray-200 w-1/2 block px-4 py-[6px] rounded-md hover:bg-gray-300'
              >Delete
            </button>
          </div>
        </div>

      </Link>
    )
  }
}
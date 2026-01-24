
import { RiArrowDownSLine } from "react-icons/ri";
import { FaGlobe } from "react-icons/fa";
import { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";


export default function ButtonList({setSelectionBtn}) {
    const [openList, setOpenList] = useState(false)
    const [btnIndex, setBtnIndex] = useState(0)


    const btnComponents = [
        {text:"public", icon:<FaGlobe className='inline-block mb-1 mr-1' fontSize={14}/>},
        {text:"friends", icon:<FaUserFriends className='inline-block mb-1 mr-1' fontSize={14}/>},
        {text:"only me", icon:<RiGitRepositoryPrivateFill className='inline-block mb-1 mr-[2px]' fontSize={14}/>},
    ]

    const handleSelection = (index, text) => {
        setBtnIndex(index)
        setOpenList(false)
        setSelectionBtn(text)
    }

  return(
    <div className="">
        <button
            onClick={() => setOpenList(prev => !prev)}
          className="text-sm text-gray-800 bg-gray-200 px-2 py-[3px] rounded-lg hover:bg-gray-300 transition-colors"
        >
          {btnComponents[btnIndex].icon} {btnComponents[btnIndex].text}
          <RiArrowDownSLine className='inline-block mb-1' fontSize={18}/>
        </button>

        {openList &&
            <div
                className="flex absolute flex-col translate-y-1 space-y-2 py-1 bg-gray-200 w-fit rounded-md"
            >
                {btnComponents.map((btn, index) => {
                    const text = btn.text
                    return(
                        <button 
                            key={index}
                            onClick={() => handleSelection(index, text)}
                            className="hover:bg-gray-300 rounded px-2 py-1"
                        >
                            {btn.icon}
                            {btn.text}
                        </button>
                    )
                })}
            </div>
        }      
        
    </div>
  )
}

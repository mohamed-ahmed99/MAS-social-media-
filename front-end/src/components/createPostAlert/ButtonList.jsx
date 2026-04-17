// hooks
import { useState, useRef, useEffect } from "react";

// components

// icons
import { RiArrowDownSLine } from "react-icons/ri";
import { FaGlobe } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";




export default function ButtonList({setSelectionBtn}) {
    // refs
    const btnRef = useRef(null)

    // states
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

    // close list when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (btnRef.current && !btnRef.current.contains(event.target)) {
                setOpenList(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

  return(
    <div className="" ref={btnRef}>
        <button
            onClick={() => setOpenList(prev => !prev)}
            className="text-sm w-[120px] space-x-2  text-zinc-800 bg-white border border-gray-200 shadow-sm shadow-black/5 px-2 py-[3px] rounded-lg hover:bg-gray-100 transition-colors"
        >
            {btnComponents[btnIndex].icon} {btnComponents[btnIndex].text}
            <RiArrowDownSLine className='inline-block mb-1' fontSize={18}/>
        </button>

        {openList &&
            <div
                className="flex w-[120px] px-1 absolute flex-col translate-y-1 space-y-2 py-1 bg-white border border-gray-200 shadow-sm shadow-black/5 rounded-md"
            >
                {btnComponents.map((btn, index) => {
                    const text = btn.text
                    return(
                        <button 
                            key={index}
                            onClick={() => handleSelection(index, text)}
                            className="hover:bg-gray-200 rounded px-2 py-1"
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

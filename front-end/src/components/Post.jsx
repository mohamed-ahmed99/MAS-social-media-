import { Link } from "react-router-dom"
import { useEffect } from "react";
import { FullScreenImage } from "./FullScreenImage";
import {motion, AnimatePresence} from "framer-motion"

import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { PiShareFatFill } from "react-icons/pi";
import { PiShareFat } from "react-icons/pi";
// import { FaLaughSquint } from "react-icons/fa"; //laugh
// import { RiEmotionSadFill } from "react-icons/ri"; // sad
// import { FaAngry } from "react-icons/fa"; // angry
// import { BsEmojiSurpriseFill } from "react-icons/bs"; // wow

import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";




export default function Post({img, profile=false}) {
    const [showPostImage, setShowPostImage] = useState(false)
    const [hiddenPost, setHiddenPost] = useState(false)

    const [openComments, setOpenComments] = useState(false)

    useEffect(() => {
        if (showPostImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
        }, [showPostImage]
    );

    // data about the reactions
    const reactionsData = {
        reactions:99,
        comments:20,
        shares:10,
        reactionsTypes:{
            like:50,
            love:30,
            haha:10,
            wow:5,
            sad:2,
            angry:2
        },
        mostUsedReactions:["like","love","wow"]
    }

    const TextToIcon = {
        like:<AiFillLike color="blue" fontSize={20}/>,
        love:<FaHeart color="red" fontSize={18}/>,
        haha: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f602.png" width="18" />,
        wow:<img src="https://twemoji.maxcdn.com/v/latest/72x72/1f62e.png" width="18" />,
        sad:<img src="https://twemoji.maxcdn.com/v/latest/72x72/1f622.png" width="18" />,
        angry:<img src="https://twemoji.maxcdn.com/v/latest/72x72/1f621.png" width="18" />,
    }


    const [liked, setLiked] = useState(false)

    const handleLikeBTN = (e) => {
        e.preventDefault()
        setLiked(!liked)
    }



  return (
    <>
        <FullScreenImage 
            img={img}
            showPostImage={showPostImage} 
            userName={`Mohamed Ahmed`}
            text={'uasi inventore te veritatis. Nemo natus autem rem molestias accusamus aperiam libero dolorum, numquam consequuntur, explicabo esse quas hic, reiciendis veritatis!'}
            setShowPostImage={setShowPostImage}
        />

    <div className="bg-white lg:rounded-lg pt-3 pb-1" style={hiddenPost ? {display: "none"} : {}}>

        {/* top "information about who has post this post" */}
        <div className="flex items-center justify-between px-4">
            {/* name. img, date */}
            <div className="flex items-center gap-4">
                <Link to={'/profile'}
                    className="h-[40px] w-[40px] rounded-full overflow-hidden block">
                    <img className="h-full w-full object-cover" src="./user.jpg" alt="user" />
                </Link>

                 <div className="leading-tight">
                    <h3 className="font-semibold text-[15px]">Mohamed Ahmed</h3>
                    <p className="text-xs text-gray-500">November 11 at 3:33 PM</p>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <FiMoreHorizontal size={20}/>
                </button>
                
                {/* x btn */}
                
                {profile ? null :
                <button 
                    onClick={() => setHiddenPost(true)}
                    className="p-2 rounded-full hover:bg-gray-100 transition">
                    <MdOutlineClose size={22}/>
                </button>}
            </div>
        </div>

        {/* text */}
        <div className="px-3 mt-3 mb-2">
            <p className="text-[15px] leading-relaxed whitespace-pre-line text-black/90">
               {` hello, I'm the one who built this website\n`}
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, ipsa?
            </p>
        </div>

        {/* img */}
        {img && (
        <div className="mt-2">
            <img 
            src={img} 
            alt="post" 
            onClick={() => setShowPostImage(true)}
            className="w-full max-h-[400px] 500:max-h-[500px]  lg:max-h-[600px] xl:max-h-[450px] 2xl:max-h-[600px] object-cover"
            />
        </div>)}

        {/* reactions data */}
        <div className="hidden xl:flex items-center justify-between px-3"> 
            <div className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-200 px-3 py-2">
                {/* most used reactions*/}
                {reactionsData.mostUsedReactions && 
                <div className="flex items-center justify-between">
                    {reactionsData.mostUsedReactions.map((icon, index) => {
                        return(
                            <div key={index}>{TextToIcon[icon]}</div>
                        )
                    })}
                </div> }

                {/* count of reactions */}
                <p className="text-gray-600 font-semibold ">{reactionsData.reactions}</p>
            </div>

            <div className="flex items-center justify-between gap-3 text-gray-600 px-3 ">
                {/* comment */}
                <div className="flex items-center justify-between gap-1 cursor-pointer px-3 py-2">
                    <div>{reactionsData.comments}</div>
                    <div className=""><FaComment/></div>
                </div>
                {/* share */}
                <div className="flex items-center justify-between gap-1 cursor-pointer">
                    <div>{reactionsData.shares}</div>
                    <div><PiShareFatFill/></div>
                </div>
            </div>
        </div>  

        {/* reactions buttons */}
        <div className="hidden xl:flex items-center justify-between px-10 ">
            <button 
                onClick={(e) => handleLikeBTN(e)}
                className="hover:bg-gray-200 px-10 py-1 rounded-md">
                {liked ? <AiFillLike color="blue" fontSize={22}/> : <AiOutlineLike fontSize={22}/>} 
            </button>
            
            <button 
                onClick={() => setOpenComments(!openComments)}
                className="hover:bg-gray-200 px-10 py-1 rounded-md"> <FaRegComment fontSize={19}/> 
            </button>
            <button className="hover:bg-gray-200 px-10 py-1 rounded-md"> <PiShareFat fontSize={22}/> </button>
        </div>



        {/* mobile reactions */}
        <div className="flex xl:hidden justify-between pt-1 px-1 sm:px-4"> 
            <div className="flex items-center gap-3">
                
                {/* like */}
                <div className="flex items-center"> 
                    <button 
                        onClick={(e) => handleLikeBTN(e)}
                        className="hover:bg-gray-200 px-2 py-1 rounded-md"> 
                        {liked ? <AiFillLike color="blue" fontSize={22}/> : <AiOutlineLike fontSize={22}/>} 
                    </button>
                    <p>{reactionsData.reactions}</p>
                </div>

                {/* comment */}
                <div 
                    onClick={() => setOpenComments(!openComments)}
                    className="flex items-center"
                > 
                    <button className="hover:bg-gray-200 px-2 py-1 rounded-md"> <FaRegComment fontSize={19}/> </button>
                    <p>{reactionsData.comments}</p>
                </div>
                <div className="flex items-center">
                    <button className="hover:bg-gray-200 px-2 py-1 rounded-md"> <PiShareFat fontSize={22}/> </button>
                    <p>{reactionsData.shares}</p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-200 px-3 py-2">
                {/* most used reactions*/}
                {reactionsData.mostUsedReactions && 
                <div className="flex items-center justify-between">
                    {reactionsData.mostUsedReactions.map((icon, index) => {
                        return(
                            <div key={index}>{TextToIcon[icon]}</div>
                        )
                    })}
                </div> }
            </div>
        </div>


        {/* comments section */}
        <AnimatePresence>
            {openComments && (
                <motion.div
                    initial={{ opacity: 0, x: -20, height:0 }}
                    animate={{ opacity: 1, x: 0 , height:"auto"}}
                    exit={{ opacity: 0, x: 20 , height:0}}
                    transition={{ duration: 0.3 }}
                    className="mt-2 px-4"
                >
                    <p className="text-gray-600">
                        Comments section is under development.
                    </p>
                </motion.div>
            )}
        </AnimatePresence>


    </div>
    </>
  )
}



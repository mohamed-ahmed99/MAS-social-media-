import { Link } from "react-router-dom"
import { useEffect } from "react";
import { FullScreenImage } from "../FullScreenImage";
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
import PostComments from "./PostComments";
import {useUserContext} from "../../hooks/useUserContext.jsx"




export default function Post({data, img, profile=false}) {
    const {userData, serUserData} = useUserContext()
    
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
        reactions: 92,
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

    const username = `${data?.author?.personalInfo?.firstName} ${data?.author?.personalInfo?.lastName}`


    const route = data?.author?._id === userData?.user?._id ? 
        `/profile` : 
        `/user/${(username.replaceAll(' ', '_')).replaceAll('-','_')}-${data?.author?._id}`


  return (
    <>
        
    <AnimatePresence>
        {hiddenPost ? null : (  
        <motion.div 
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="bg-white lg:rounded-lg pt-3 pb-1" >

            {/* top "information about who has post this post" */}
            <div className="flex items-center justify-between px-4">
                {/* name. img, date */}
                <div className="flex items-center gap-4">
                    <Link to={route}
                        className="h-[40px] w-[40px] rounded-full overflow-hidden block">
                        <img className="h-full w-full object-cover" src="/user.jpg" alt="user" />
                    </Link>

                    <div className="leading-tight">
                        <Link 
                            to={route}
                            className="font-semibold text-[15px]"> 
                            {username}
                        </Link>
                        <p className="text-xs text-gray-500">{new Date(data?.createdAt).toLocaleString()}</p>
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
                {data?.content?.text}
                
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
                    <p className="text-gray-600 font-semibold ">{data?.reactions?.length || 0}</p>
                </div>

                <div className="flex items-center justify-between gap-3 text-gray-600 px-3 ">
                    {/* comment */}
                    <button 
                        onClick={() => setOpenComments(!openComments)}
                        className="flex items-center justify-between gap-1 cursor-pointer px-3 py-2"
                    >
                        <div>{data?.comments?.length || 0}</div>
                        <div className=""><FaComment/></div>
                    </button>
                    {/* share */}
                    <button className="flex items-center justify-between gap-1 cursor-pointer">
                        <div>{data?.shares?.length || 0}</div>
                        <div><PiShareFatFill/></div>
                    </button>
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
                        <p>{data?.reactions?.length || 0}</p>
                    </div>

                    {/* comment */}
                    <div 
                        onClick={() => setOpenComments(!openComments)}
                        className="flex items-center"
                    > 
                        <button className="hover:bg-gray-200 px-2 py-1 rounded-md"> <FaRegComment fontSize={19}/> </button>
                        <p>{data?.comments?.length || 0}</p>
                    </div>
                    <div className="flex items-center">
                        <button className="hover:bg-gray-200 px-2 py-1 rounded-md"> <PiShareFat fontSize={22}/> </button>
                        <p>{data?.shares?.length || 0}</p>
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
            <PostComments openComments={openComments} setOpenComments={setOpenComments} data={''} />


        </motion.div>
        )}
    </AnimatePresence>
    </>
  )
}




// icons
import { motion, AnimatePresence } from "framer-motion"
import { FaHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";


import { useState } from "react";
import { useUserContext } from "../../hooks/useUserContext.jsx"


// post component
import PostTop from "./PostComponent/PostTop.jsx"
import Text from "./PostComponent/Text.jsx"
import File from "./PostComponent/File.jsx"
import ReactionData_XL from "./PostComponent/ReactionData_XL.jsx"
import ReactionButtons_XL from "./PostComponent/ReactionButtons_XL.jsx"
import Reactions from "./PostComponent/Reactions.jsx"
import Comments from "./PostComponent/commentComponents/Comments.jsx";





export default function Post({ data, canEdit = false }) {
    const { userData, serUserData } = useUserContext()

    // states
    const [openComments, setOpenComments] = useState(false) // to open comments
    const [fullScreen, setFullScreen] = useState(false) // to handle full screen

    // useEffect to handle body overflow
    // useEffect(() => {
    //     if (showPostImage) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "auto";
    //     }

    //     return () => {
    //         document.body.style.overflow = "auto";
    //     };
    //     }, [showPostImage]
    // );

    // data about the reactions
    const reactionsData = {
        reactions: 92,
        comments: 20,
        shares: 10,
        reactionsTypes: {
            like: 50,
            love: 30,
            haha: 10,
            wow: 5,
            sad: 2,
            angry: 2
        },
        mostUsedReactions: ["like", "love", "wow"]
    }

    const TextToIcon = {
        like: <AiFillLike color="blue" fontSize={20} />,
        love: <FaHeart color="red" fontSize={18} />,
        haha: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f602.png" width="18" />,
        wow: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f62e.png" width="18" />,
        sad: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f622.png" width="18" />,
        angry: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f621.png" width="18" />,
    }


    const handleLikeBTN = (e) => {
        e.preventDefault()
        setLiked(!liked)
    }

    const authorUsername = `${data?.author?.personalInfo?.firstName} ${data?.author?.personalInfo?.lastName}`


    const route = data?.author?._id === userData?.user?._id ?
        `/profile` :
        `/user/${(authorUsername.replaceAll(' ', '_')).replaceAll('-', '_')}-${data?.author?._id}`


    return (
        <>

            <AnimatePresence>
                {/* post component */}
                <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white lg:rounded-lg pt-3 pb-1" >

                    {/* /////////// top "information about who has post this post" */}

                    <PostTop
                        route={route}
                        authorUsername={authorUsername}
                        createdAt={data?.createdAt}
                    />


                    {/* /////////// text */}
                    <Text
                        text={data?.content?.text}
                    />

                    {/* /////////// img */}
                    {data?.content?.fileUrl && (
                        <File
                            fileUrl={data?.content?.fileUrl}
                            fileType={data?.content?.fileType}
                            setFullScreen={setFullScreen}
                        />
                    )}

                    {/* /////////////// reactions data (xl) */}
                    <ReactionData_XL
                        reactionsData={reactionsData}
                        TextToIcon={TextToIcon}
                        setOpenComments={setOpenComments}

                        reactionCounts={{
                            reactions: data?.reactions?.length,
                            comments: data?.comments?.length,
                            shares: data?.shares?.length
                        }}
                    />

                    {/* /////////////// reactions buttons (xl) */}
                    <ReactionButtons_XL
                        setOpenComments={setOpenComments}
                    />


                    {/* ////////// Reactions (sm md lg) */}
                    <Reactions
                        setOpenComments={setOpenComments}
                        TextToIcon={TextToIcon}
                        reactionsData={reactionsData}
                        reactionCounts={{
                            reactions: data?.reactions?.length,
                            comments: data?.comments?.length,
                            shares: data?.shares?.length
                        }}
                    />

                    {/* comments section */}
                    <Comments
                        openComments={openComments}
                        setOpenComments={setOpenComments}
                        data={''}
                    />


                </motion.div>

            </AnimatePresence>
        </>
    )
}



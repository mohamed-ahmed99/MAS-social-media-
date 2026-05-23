
// icons
import { motion, AnimatePresence } from "framer-motion"
import { FaHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";


import { useState } from "react";
import { useGlobalData } from "../../hooks/useStore.jsx";


// post component
import PostTop from "./PostComponent/PostTop.jsx"
import Text from "./PostComponent/Text.jsx"
import File from "./PostComponent/File.jsx"
import ReactionData_XL from "./PostComponent/ReactionData_XL.jsx"
import ReactionButtons_XL from "./PostComponent/ReactionButtons_XL.jsx"
import Reactions from "./PostComponent/Reactions.jsx"
import Comments from "./PostComponent/commentComponents/Comments.jsx";
import { useEffect } from "react";





export default function Post({ data, canEdit = false }) {
    const [ user, setUser ] = useGlobalData()
    // states
    const [openComments, setOpenComments] = useState(false) // to open comments
    const [postReactions, setPostReactions] = useState({}) // {totalCount: 2, topReactions: Array(2), myReaction: 'haha'}

    useEffect(() => {
        if(data?.reactionData){
            setPostReactions(data?.reactionData)
        }
    }, [data])

    const TextToIcon = {
        like: <AiFillLike color="blue" fontSize={20} />,
        love: <FaHeart color="red" fontSize={18} />,
        haha: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f602.png" width="18" />,
        wow: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f62e.png" width="18" />,
        sad: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f622.png" width="18" />,
        angry: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f621.png" width="18" />,
    }


    const authorUsername = `${data?.author?.personalInfo?.firstName} ${data?.author?.personalInfo?.lastName}`


    const route = data?.author?._id === user?.user?._id ?
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
                        profilePicture={data?.author?.personalInfo?.profilePicture}
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
                        />
                    )}

                    {/* /////////////// reactions data (xl) */}
                    <ReactionData_XL
                        TextToIcon={TextToIcon}
                        setOpenComments={setOpenComments}
                        postReactions={postReactions}
                    />

                    {/* /////////////// reactions buttons (xl) */}
                    <ReactionButtons_XL
                        setOpenComments={setOpenComments}
                        postId={data?._id}
                        setPostReactions={setPostReactions}
                        postReactions={postReactions}
                        TextToIcon={TextToIcon}
                    />


                    {/* ////////// Reactions (sm md lg) */}
                    <Reactions
                        setOpenComments={setOpenComments}
                        TextToIcon={TextToIcon}
                        postId={data?._id}
                        postReactions={postReactions}
                        setPostReactions={setPostReactions}

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



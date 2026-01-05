import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MdOutlineClose } from "react-icons/md";
import CircularImage from '../CircularImage'

export default function PostComments({ openComments, setOpenComments, data="" }) {
    data = {
        commentCount: 10,
        comments: [
            { id: 1, author: "User1", content: "This is a comment.", img:"" },
            { id: 2, author: "User2", content: "hello.", img:"user.jpg" },
            { id: 2, author: "User2", content: "hello.", img:"user.jpg" },
            { id: 2, author: "User2", content: "hello.", img:"user.jpg" },
            // Add more mock comments as needed
        ]
    }


    const CreateComments = () => {
        return data.comments.map((comment, index) => (
            <div key={index} className="flex items-start gap-2">
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    <CircularImage src={comment.img} firstName='Mohamed' lastName='Ahmed'/>
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm">{comment.author}</p>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
            </div>
        ));
    }



  return (
    <AnimatePresence>
        {openComments && (
            <motion.div
                initial={{ opacity: 0, y: 20, height:0,}}
                animate={{ opacity: 1, y: 0 , height:"auto",  }}
                exit={{ opacity: 0, y: 20 , height:0,  }}
                transition={{ duration: 0.3 }}
                className="mt-2 px-4 border-t "
            >
                {/* top section */}
                <div className="flex sticky top-0 items-center justify-between py-2 border-b">
                    <h3 className=" ">Comments ({data.commentCount})</h3>
                    <button
                        onClick={() => setOpenComments(false)}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <MdOutlineClose size={20} />
                    </button>
                </div>

                {/* comments list */}
                <div className="py-4 h-[300px] overflow-y-auto flex flex-col gap-4">
                    <CreateComments />
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

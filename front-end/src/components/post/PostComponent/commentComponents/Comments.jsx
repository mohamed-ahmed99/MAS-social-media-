import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MdOutlineClose } from "react-icons/md";
import CircularImage from '../../../CircularImage'
import { Link } from 'react-router-dom';
import Top from './Top';
import CreateCommentsFromData from './CreateComments';


export default function Comments({ openComments, setOpenComments, data = "" }) {
    data = {
        commentCount: 10,
        comments: [
            { id: 1, author: "User1", content: "This is a comment.", img: "" },
            { id: 2, author: "User2", content: "hello.", img: "/user.jpg" },
            { id: 2, author: "User2", content: "hello.", img: "/user.jpg" },
            { id: 2, author: "User2", content: "hello.", img: "" },
        ]
    }




    return (
        <AnimatePresence>
            {openComments && (
                <motion.div
                    initial={{ opacity: 0, y: 20, height: 0, }}
                    animate={{ opacity: 1, y: 0, height: "auto", }}
                    exit={{ opacity: 0, y: 20, height: 0, }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 px-4 border-t "
                >
                    {/* top section */}
                    <Top 
                        data={data}
                        setOpenComments={setOpenComments}
                    />

                    {/* comments list */}
                    <div className="py-4 overflow-y-auto flex flex-col gap-4">
                        <CreateCommentsFromData  
                            comments={data?.comments}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

import React from 'react'
import { MdOutlineClose } from "react-icons/md";

export default function Top({ data, setOpenComments }) {
  return (
    <div className="flex sticky top-0 items-center justify-between py-2 border-b">
        <h3 className=" ">Comments ({data.commentCount})</h3>
        <button
            onClick={() => setOpenComments(false)}
            className="p-1 rounded-full hover:bg-gray-100"
        >
            <MdOutlineClose size={20} />
        </button>
    </div>
  )
}
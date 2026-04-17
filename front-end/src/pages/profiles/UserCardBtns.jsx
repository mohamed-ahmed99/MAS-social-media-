

import { FaPen, FaPlus, FaUserCheck, FaFacebookMessenger, FaUserAltSlash } from "react-icons/fa";

export default function UserCardBtns({ edit, setCreatePost, relationshipWithYou }) {

    const handlePostClick = () => {
        window.scrollTo(0, 0);
        setCreatePost(true)
    }

    // if the profile is mine
    if (edit) {
        return (
            <>
                <button
                    onClick={handlePostClick}
                    className="flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow transition"
                >
                    <FaPlus fontSize={14} />
                    <span>Post</span>
                </button>
                <button className="flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-gray-100 text-black rounded-lg shadow transition">
                    <FaPen fontSize={14} />
                    <span>Edit Profile</span>
                </button>
            </>
        )
    }

    // if the user is a friend
    if (relationshipWithYou === "friend") {
        return (
            <>
                <button className="flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow transition">
                    <FaUserAltSlash fontSize={14} />
                    <span>Unfriend</span>
                </button>
                <button className="flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow transition">
                    <FaFacebookMessenger fontSize={14} />
                    <span>Message</span>    
                </button>
            </>
        )
    }

    // if the user is not a friend
    return (
        <button className="col-span-2 flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow transition">
            <FaPlus fontSize={14} />
            <span>Add Friend</span>
        </button>
    )
}




import { FaPen, FaPlus, FaUserCheck, FaFacebookMessenger, FaUserAltSlash } from "react-icons/fa";

export default function UserCardBtns({ edit, setCreatePost, relationshipWithYou }) {

    const handlePostClick = () => {
        window.scrollTo(0, 0);
        setCreatePost(true)
    }

    // إذا كان البروفايل الخاص بي
    if (edit) {
        return (
            <>
                <button
                    onClick={handlePostClick}
                    className="flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FaPlus fontSize={14} />
                    <span>Post</span>
                </button>
                <button className="flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">
                    <FaPen fontSize={14} />
                    <span>Edit Profile</span>
                </button>
            </>
        )
    }

    // إذا كان المستخدم صديقاً
    if (relationshipWithYou === "friend") {
        return (
            <>
                <button className="flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">
                    <FaUserAltSlash fontSize={14} />
                    <span>Unfriend</span>
                </button>
                <button className="flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white transition">
                    <FaFacebookMessenger fontSize={14} />
                    <span>Message</span>
                </button>
            </>
        )
    }

    // إذا لم يكن صديقاً
    return (
        <button className="col-span-2 flex flex-grow items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            <FaPlus fontSize={14} />
            <span>Add Friend</span>
        </button>
    )
}


// hooks and components
import GeneralBtn from "../../components/btns/GeneralBtn";
import {usePostMethod} from "../../hooks/usePostMethod"; 
import {usePathMethod} from "../../hooks/usePatchMethod"; 
import {useState} from "react";

import { FaPen, FaPlus, FaUserCheck, FaFacebookMessenger, FaUserAltSlash } from "react-icons/fa";

export default function UserCardBtns({ edit, setCreatePost, relationshipWithYou, userId }) {

    // methods and data states
    const { postData, status_p, message_p, data_p, action_p, loading_p } = usePostMethod()
    const { editData, status_e, message_e, data_e, action_e, loading_e } = usePathMethod()
    
    // state
    const [activeBtn, setActiveBtn] = useState("")

    // handle default action
    const handlePostClick = () => {
        window.scrollTo(0, 0);
        setCreatePost(true)
    }

    console.log({relationshipWithYou});

    // if the profile is mine
    if (edit) {
        return (
            <>
            {/* create post button for self profile only */}
                <GeneralBtn
                    variant={"black"}
                    onClick={handlePostClick}
                    className={"col-span-1 py-2 "}
                >
                    <FaPlus fontSize={14} />
                    <span>Post</span>
                </GeneralBtn>

                {/* edit profile button for self profile only */}
                <GeneralBtn
                    variant={"black"}
                    onClick={() => {}}
                    className={"col-span-1 py-2 "}
                >
                    <FaPen fontSize={14} />
                    <p>Edit Profile</p>
                </GeneralBtn>
            </>
        )
    }


    // if there is no relationship 
    if(relationshipWithYou?.type === "NONE" && relationshipWithYou?.status === "NONE"){
        return (
            <GeneralBtn
                variant={"black"}
                className="col-span-2 lg:w-fit py-2 "
                onClick={ async () => await postData(`/api/relationship/build/${userId}`, {}, {type: "friend"}) }
                loading={loading_p}
                disabled={loading_p || status_p === "success"}
            >
                <FaPlus fontSize={14} />
                <span>{status_p === "success" ? "Request Sent" : "Add Friend"}</span>
            </GeneralBtn>
        )
    }

    // if the other person sent me a friend request 
    if(relationshipWithYou?.type === "FRIEND" && relationshipWithYou?.status === "PENDING"){
        return (
            <GeneralBtn
                variant={"black"}
                className="col-span-2 py-2 lg:w-fit "
                onClick={ async () => await editData(`/api/relationship/update-status/${userId}?new_status=deleted`, {}) }
                loading={loading_e}
                disabled={loading_e || status_e === "success"}
            >
                <FaUserAltSlash fontSize={14} />
                <span>{status_e === "success" ? "Canceled" : "Cancel Request"}</span>
            </GeneralBtn>
        )
    }

    // if the other person sent me a friend request 
    if(relationshipWithYou?.type === "FRIEND" && relationshipWithYou?.status === "ACCEPTED"){
        return (
            <>  
            <GeneralBtn
                variant={"black"}
                className="col-span-1 py-2 "
                onClick={() => {}} // navigate to chat page
            >
                <FaFacebookMessenger fontSize={14} />
                <span>Message</span>
            </GeneralBtn>

            <GeneralBtn
                variant={"black"}
                className="col-span-1 py-2 "
                onClick={ async () => await editData(`/api/relationship/update-status/${userId}?new_status=deleted`, {}) }
                loading={loading_e}
                disabled={loading_e || status_e === "success"}
            >
                <FaUserAltSlash fontSize={14} />
                <span>{status_e === "success" ? "Unfriended" : "Unfriend"}</span>
            </GeneralBtn>
            </>
        )
    }
}


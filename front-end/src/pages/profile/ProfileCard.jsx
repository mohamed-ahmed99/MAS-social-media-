


// icons
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import UserCardBtns from "./UserCardBtns";


export default function ProfileCard({ userData, edit = false, setCreatePost, otherUserData }) {



    return (
        <div className="flex flex-col lg:flex-row relative gap-2 lg:gap-8 px-4 pt-16 lg:py-2 ">


            {/* photo */}
            <div>
                <div
                    className=" w-[130px] lg:w-[150px] h-[130px] lg:h-[150px] overflow-hidden rounded-full border-2 border-white
                      absolute -top-28 vsm:-top-24 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:static "
                >
                    <img
                        src="/user.jpg" alt="User Profile"
                        className="w-full h-full object-cover "
                    />
                </div>
            </div>


            <div className="flex flex-col gap-2 w-full">

                {/*  */}
                <div className="hidden lg:flex items-center justify-center lg:justify-between">
                    <h2 className="text-2xl font-semibold">

                        {otherUserData?.loading ?
                            (<p>loading...</p>) :
                            (edit ?
                                `${userData.firstName} ${userData.lastName}` :
                                `${otherUserData?.userData?.firstName} ${otherUserData?.userData?.lastName}`
                            )
                        }

                    </h2>


                    <div className="flex gap-4">
                        <UserCardBtns edit={edit} setCreatePost={setCreatePost} relationshipWithYou={otherUserData?.relationshipWithYou} />
                    </div>

                </div>


                <div className="hidden lg:flex gap-4">
                    <p className=""><span>0</span> Posts</p>
                    <p><span>0</span> Friens</p>
                </div>



                <div className="absolute flex items-center justify-between px-3  top-7 sm:top-4 left-0 w-full lg:hidden">
                    <h2 className="text-xl sm:text-2xl font-semibold flex-grow ">
                        {otherUserData?.loading ?
                            (<p>loading...</p>) :
                            (edit ?
                                `${userData.firstName} ${userData.lastName}` :
                                `${otherUserData?.userData?.firstName} ${otherUserData?.userData?.lastName}`
                            )
                        }
                    </h2>

                    <div className="flex gap-4 ">
                        <p className=""><span>0</span> Posts</p>
                        <p><span>0</span> Friens</p>
                    </div>


                </div>

                <div className="text-sm ">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, architecto!</p>
                </div>

                <div className="grid lg:hidden grid-cols-2 gap-4">
                    <UserCardBtns edit={edit} setCreatePost={setCreatePost} relationshipWithYou={otherUserData?.relationshipWithYou} />
                </div>

            </div>

        </div>
    )
}

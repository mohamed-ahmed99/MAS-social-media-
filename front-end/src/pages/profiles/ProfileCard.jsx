import UserCardBtns from "./UserCardBtns";
import CircularImage from "../../components/CircularImage";


export default function ProfileCard({ setCreatePost, edit, userData, profileDetails }) {

    const someData = {
        posts: profileDetails?.postsCount || 0,
        friends: profileDetails?.friendsCount || 0
    }

    return (
        <div className="pb-4 px-4 lg:-mt-[90px] -mt-[130px] z-10 flex flex-col gap-4">

            {/* profile and some user info  */}
            <div className="flex items-center lg:items-end gap-2 lg:gap-6 lg:flex-row flex-col">
                {/*profile photo */}
                <div className="relative lg:w-[180px] lg:h-[180px] w-[140px] h-[140px] shrink-0 bg-blue-600 rounded-full border-[3px] border-white ">
                    <CircularImage
                        src={userData?.personalInfo?.profilePicture}
                        firstName={userData?.personalInfo?.firstName}
                        lastName={userData?.personalInfo?.lastName}
                        fontSize={100}
                        className="rounded-full"
                    />
                </div>


                <div className="w-full lg:h-[90px] space-y-2">
                    {/* user name */}
                    <h2
                        className="text-2xl font-bold"
                    >
                        {userData?.personalInfo?.firstName} {userData?.personalInfo?.lastName}
                    </h2>

                    <div className="hidden lg:flex items-center justify-between">
                        {/* profile count and friend count */}
                        <div className="flex items-center gap-6 justify-between w-full lg:w-fit">
                            {Object.keys(someData).map((key, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center"
                                >
                                    <p className="capitalize">{key}</p>
                                    <p>{someData[key]}</p>
                                </div>
                            ))}
                        </div>

                        {/* buttons */}
                        <div className="hidden lg:flex items-center justify-end gap-4 w-[300px]">
                            <UserCardBtns
                                edit={edit}
                                setCreatePost={setCreatePost}
                                relationshipWithYou={userData?.relationshipWithYou}
                                userId={userData?._id}
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* bio */}
            <div className="w-full">
                {userData?.personalInfo?.bio || "hello"}
            </div>

            {/* profile count and friend count */}
            <div className="flex lg:hidden items-center justify-end w-full py-0">
                {Object.keys(someData).map((key, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2"
                    >
                        <p className="capitalize">{key}:</p>
                        <p>{someData[key]}</p>
                        {index < Object.keys(someData).length - 1 && <span className=" ml-1 mr-3"> || </span>}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 lg:hidden gap-2 ">
                <UserCardBtns
                    edit={edit}
                    setCreatePost={setCreatePost}
                    relationshipWithYou={userData?.relationshipWithYou}
                    userId={userData?._id}
                />
            </div>

        </div>
    )
}

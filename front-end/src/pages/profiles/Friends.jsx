import { Link } from "react-router-dom"
import CircularImage from "../../components/CircularImage.jsx"
import { useGlobalData } from '../../hooks/useStore.jsx'


export default function Friends({ friends, friendsCount }) {

    // get logged in user id from store
    const [user] = useGlobalData("user")

    // prepare friends list
    const friendsList = friends || []
    const count = friendsCount || 0

  return (
    <div className="bg-white p-5 space-y-5">

        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-black">Friends</p>
                {/* go to friends page */}
                <Link 
                    to="/friends"
                    className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded transition-colors text-sm font-medium"
                >
                    See all friends
                </Link>
            </div>

            <div className="text-gray-500 text-sm font-medium">
                {`${count} friends`}
            </div>
        </div>

        {/* friends container */}
        {friendsList.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
                {friendsList.map((friend, index) => {
                    
                    // check if this friend is me or not
                    const route = user?._id == friend?._id 
                        ? "/profile" 
                        : `/user/${friend?.personalInfo?.firstName}_${friend?.personalInfo?.lastName}-${friend?._id}`

                    return (
                    <Link 
                        to={route}
                        key={friend._id || index} className="flex flex-col group"
                    >   
                        
                        {/* profile picture */}
                        <div className="aspect-square overflow-hidden rounded-lg mb-1">
                            <CircularImage 
                                src={friend?.personalInfo?.profilePicture} 
                                alt={`${friend?.personalInfo?.firstName} ${friend?.personalInfo?.lastName}`}
                                firstName={friend?.personalInfo?.firstName}
                                className="group-hover:scale-105 transition-transform duration-300 border-none"
                                fontSize={35}
                            />
                        </div>

                        {/* name of friend */}
                        <p className="text-xs font-bold text-black group-hover:underline truncate">
                            {`${friend?.personalInfo?.firstName} ${friend?.personalInfo?.lastName}`}
                        </p>
                    </Link>
                )})}
            </div>
        ) : (
            <div className="text-center text-sm text-gray-500 py-4 bg-gray-50 rounded-lg">
                No friends to show
            </div>
        )}
    </div>
  )
}
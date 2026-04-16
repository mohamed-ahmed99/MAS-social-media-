import { Link } from "react-router-dom"
export default function Friends() {

    // array of friends data
    const FriendsData = [
        {name: 'Mohamed Ahmed', img: '/user.jpg'},
        {name: 'Abdelwahab Ali', img: '/user.jpg'},
        {name: 'Mohamed Waleed', img: '/user.jpg'},
        {name: 'Reda Mohamed', img: '/user.jpg'},
        {name: 'Jane Smith', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
    ]

  return (
    <div className="bg-white p-5 space-y-5">
        
        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-black">Friends</p>
                <Link 
                    to="/profile?tab=friends"
                    className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded transition-colors text-sm font-medium"
                >See all friends</Link>
            </div>

            <div className="text-gray-500 text-sm font-medium">{`${FriendsData.length} friends`}</div>
        </div>


        <div className="grid grid-cols-3 gap-3">
            {FriendsData.map((friend, index) => (
                <Link 
                    to={`/user/${friend.name.replaceAll(" ", "_")}`}
                    key={index} className="flex flex-col group"
                >
                    <div className="aspect-square overflow-hidden rounded-lg mb-1">
                        <img 
                            src={friend.img} 
                            alt={friend.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <p className="text-xs font-bold text-black group-hover:underline truncate">{friend.name}</p>
                </Link>
            ))}
        </div>

    </div>
  )
}
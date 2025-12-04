import { Link } from "react-router-dom"
export default function Friends() {

    // array of friends data
    const FriendsData = [
        {name: 'Mohamed Ahmed', img: './user.jpg'},
        {name: 'Abdelwahab Ali', img: './user.jpg'},
        {name: 'Mohamed Waleed', img: './user.jpg'},
        {name: 'Reda Mohamed', img: './user.jpg'},
        {name: 'Jane Smith', img: './user.jpg'},
        {name: 'Alice Johnson', img: './user.jpg'},
    ]

  return (
    <div className="col-span-10 lg:col-span-4 pt-6 bg-white p-4 space-y-4 lg:rounded-xl h-fit lg:shadow">
        
        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">Friends</p>
                <Link 
                    to="/profile"
                    className="text-blue-600 hover:underline"
                >See all friends</Link>
            </div>

            <div className="text-gray-700">{`${6} friends`}</div>
        </div>


        <div className="grid grid-cols-3 gap-2">
            {FriendsData.map((friend, index) => (
                <Link 
                    to="/profile"
                    key={index} className="mb-2 flex flex-col "
                >
                    <img 
                        src={friend.img} 
                        alt={friend.name}
                        className="w-full sm:h-full lg:h-fit  block rounded-xl  object-cover"
                    />
                    <p className="text-[13px] leading-[1.2] pl-1 font-semibold sm:text-[20px] lg:text-[13px]">{friend.name}</p>
                </Link>
            ))}
        </div>

    </div>
  )
}
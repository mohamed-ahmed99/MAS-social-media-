import { Link } from "react-router-dom";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";


export default function AllFriends() {


    const FriendsData = [
        {name: 'Mohamed Ahmed', img: '/user.jpg'},
        {name: 'Abdelwahab Ali', img: '/user.jpg'},
        {name: 'Mohamed Waleed', img: '/user.jpg'},
        {name: 'Reda Mohamed', img: '/user.jpg'},
        {name: 'Reda Mohamed', img: '/user.jpg'},
        {name: 'Jane Smith', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
    ]





  return (
    <div className="bg-white w-full max-w-[900px] m-auto py-2 px-4 space-y-4 rounded-xl">
        
        {/* nav bar */}
        <div className="flex items-center justify-between">
            <h3>Friends</h3>

            <div className="flex items-center justify-between gap-4">
                <div 
                    className='flex bg-gray-100 rounded-full px-2  items-center gap-2 border h-fit hover:opacity-70 '
                >
                  <button className="block py-[6px] text-gray-700">
                    <IoMdSearch fontSize={20} className='cursor-pointer '/>
                  </button>

                    <input 
                      type="text" 
                      placeholder="Search"
                      className='outline-none bg-transparent py-[6px]'
                    />
                </div>

                <Link className="underline text-blue-600">Find requests</Link>
                <Link className="underline text-blue-600">Find friends</Link>
                <button
                  className="px-4 py-2 bg-gray-200 rounded-xl text-gray-700">
                    <PiDotsThreeOutlineFill fontSize={16}/>
                </button>
            </div>
        </div>

        {/* friends */}
        <div className="grid grid-cols-10 gap-2"> 
            {FriendsData.map((friend, index) => (
                <Link 
                  to="/profile"
                  key={index} 
                  className="mb-2 col-span-5 shadow-sm border py-2 px-4 rounded-xl"
                >
                  <div className="w-20 overflow-hidden rounded-xl"> 
                    <img 
                        src={friend.img} 
                        alt={friend.name}
                        className="rounded-xl w-full object-cover"
                    />
                  </div>
                  <div>
                      <h3>{friend.name}</h3>
                  </div>
                </Link>
            ))}
            
        </div>
    </div>
  )
}

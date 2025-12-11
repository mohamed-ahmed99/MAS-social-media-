import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";


export default function AllFriends() {


    const FriendsData = [
        {name: 'Mohamed Ahmed', img: '/user.jpg'},
        {name: 'Abdelwahab Ali', img: '/user.jpg'},
        {name: 'Mohamed Waleed', img: '/user.jpg'},
        {name: 'Reda Mohamed', img: '/user.jpg'},
        {name: 'Jane Smith', img: '/user.jpg'},
        {name: 'Alice Johnson', img: '/user.jpg'},
    ]





  return (
    <div>
        
        {/* nav bar */}
        <nav>
            <h3>Friends</h3>

            <div>
                <input type="text" />
                <button>Find requests</button>
                <button>Find friends</button>
                <button><MdOutlineClose/></button>
            </div>
        </nav>

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

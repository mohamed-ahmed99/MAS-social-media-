import { BsImages } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CreatePostBox() {
  return (
    <div 
      className="bg-white rounded-xl py-2 px-5 flex items-center justify-center gap-4">
        {/* user photo */}
        <Link to={'/profile'}
           className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img className="h-full w-full" src="./user.jpg" alt="user" />
        </Link>

        {/* input */}
        <button className="flex-grow bg-gray-200 py-2 rounded-xl text-gray-700">
            <p className="w-full">what's on your mind?</p>
        </button>

        {/* photo post icon */}
        <button className="p-2 rounded-xl hover:bg-gray-200 transition-colors">
            <BsImages fontSize={25}/>
        </button>
    </div>
  )
}

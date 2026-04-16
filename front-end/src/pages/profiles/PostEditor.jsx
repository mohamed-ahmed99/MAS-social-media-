import {Link} from 'react-router-dom'
import CircularImage from "../../components/CircularImage"
import { FaBook } from "react-icons/fa";
import { RiMemoriesLine } from "react-icons/ri";
import { BsImages } from "react-icons/bs";

/**
 * PostEditor Component
 * A Facebook-style post composer trigger.
 */
export default function PostEditor({placeholder="What's on your mind?", edit=false, createPost}) {
    
    const LinksComponents =[
      {icon:<BsImages />, href:"/profile", text:"photo"},
      {icon:<FaBook />, href:"/profile", text:"diary"},
      {icon:<RiMemoriesLine />, href:"/profile", text:"memories"},
    ] 

    const onClick = () => {
      window.scrollTo(0, 0)
      createPost(true)
    }

  return (
    <div className="bg-white p-4 space-y-4 lg:rounded-xl lg:shadow-sm">

        <div className="flex items-center gap-3">
            {/* profile image */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <CircularImage src="/user.jpg" alt="Profile" size={40} />
            </div>

            {/* input */}
            <button 
              onClick={onClick}
              className="flex-grow text-left px-4 py-2.5 text-gray-500 text-base bg-gray-100 hover:bg-gray-200 rounded-full transition-colors font-medium focus:outline-none"
            >
              {placeholder}
            </button>
        </div>

        <div className='flex items-center pt-3 gap-2 border-t border-gray-100'>
            {LinksComponents.map((link, index) => {
              if(!edit && index == 1) {
                return null
              }
              return (
                <Link to={link.href} key={index} className="flex justify-center items-center gap-2 flex-1 rounded-lg py-2 hover:bg-gray-100 transition-colors">
                    <div className="text-xl text-gray-600">{link.icon}</div>
                    <div className="font-semibold text-gray-500 text-sm capitalize">{link.text}</div>
                </Link>
              )
            })}
        </div>
    </div>
  )
}

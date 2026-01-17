import {Link} from 'react-router-dom'
import CircularImage from "../../components/CircularImage"
import { FaBook } from "react-icons/fa";
import { RiMemoriesLine } from "react-icons/ri";
import { BsImages } from "react-icons/bs";




export default function PostEditor({placeholder="What's on your mind?", me=true}) {

    
    const LinksComponents =[
      {icon:<BsImages color='#02ae0a'/>, href:"/profile", text:"photo"},
      {icon:<FaBook color='#0671f4'/>, href:"/profile", text:"dairy"},
      {icon:<RiMemoriesLine color='#ff1a1a'/>, href:"/profile", text:"memories"},
    ] 



  return (
    <div className="bg-white p-3  sm:px-4 lg:shadow lg:rounded-xl sm:flex sm:gap-3 items-center overflow-hidden lg:block">

        <button className="flex items-center gap-3 w-full rounded-full py-2">
            <CircularImage src="/user.jpg" alt="Profile" size={45} />
            <div className="flex-grow text-left px-5 text-gray-600 text-lg bg-gray-100 p-2 rounded-full ">{placeholder}</div>
        </button>

        <div className='flex items-center  pt-2 gap-4 sm:gap-8 lg:mt-2 lg:border-t'>
            {LinksComponents.map((link, index) => {
              if(me && index == 1) {
                return null
              }
              return (
                <Link to={link.href} key={index} className="flex justify-center items-center gap-2 sm:gap-3 w-full rounded-lg  px-2 py-2 lg:hover:bg-gray-100">
                    <div className="text-xl sm:text-2xl text-gray-800">{link.icon}</div>
                    <div className="font-semibold text-gray-600 capitalize">{link.text}</div>
                </Link>
              )
            })}


        </div>
    </div>
  )
}

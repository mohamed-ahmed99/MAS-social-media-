import { Link, Links } from 'react-router-dom'
import { FaUserFriends } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";

export default function LeftSide() {

  const UserPhoto = () => {
    return <div className='w-[30px] h-[30px] rounded-full overflow-hidden'>
                <img className='w-full h-full' src="./user.jpg" alt="" />
            </div>
  }

  const linkComponents = [
    {icon:<UserPhoto/>, text:"user name", href:"/profile"},
    {icon:<FaUserFriends/>, text:"best friends", href:"/friends"},
    {icon:<FaBookmark/>, text:"saved", href:"/saved"},
    {icon:<MdAccessTimeFilled/>, text:"memories", href:"/memories"},
  ]

    const CreateLinks = linkComponents.map((link, index) => {
      return(
        <Link
          to={link.href}
          className='flex items-center gap-10' 
          >
            <div>{link.icon}</div>
            <p className='  w-1/2'>{link.text}</p>
        </Link>
      )
    })


  return (
    <div className='bg-slate-300 w-[300px] h-screen fixed left-0'>
        {CreateLinks}
    </div>
  )
}

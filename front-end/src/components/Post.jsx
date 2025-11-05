import { Link } from "react-router-dom"
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";

export default function Post({img="./user.jpg"}) {
  return (
    <div className="bg-white rounded-lg py-3">
        {/* top "information about who has post this post" */}
        <div className="flex items-center justify-between px-4">
            {/* name. img, date */}
            <div className="flex items-center gap-4">
                <Link to={'/profile'}
                    className="h-[40px] w-[40px] rounded-full overflow-hidden block">
                    <img className="h-full w-full object-cover" src="./user.jpg" alt="user" />
                </Link>

                 <div className="leading-tight">
                    <h3 className="font-semibold text-[15px]">Mohamed Ahmed</h3>
                    <p className="text-xs text-gray-500">November 11 at 3:33 PM</p>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <FiMoreHorizontal size={20}/>
                </button>

                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <MdOutlineClose size={22}/>
                </button>
            </div>
        </div>

        {/* text */}
        <div className="px-3 mt-3 mb-2">
            <p className="text-[15px] leading-relaxed whitespace-pre-line text-black/90">
               {` hello, I'm the one who built this website\n`}
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, ipsa?
            </p>
        </div>

        {/* img */}
        {img && (
        <div className="mt-2">
            <img 
            src={img} 
            alt="post" 
            className="w-full max-h-[400px] 500:max-h-[500px]  lg:max-h-[600px] xl:max-h-[450px] 2xl:max-h-[600px] object-cover"
            />
        </div>)}

        {/* reactions data */}
        <div></div>

        {/* reactions buttons */}
        <div></div>


    </div>
  )
}

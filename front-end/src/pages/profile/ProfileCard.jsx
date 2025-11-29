
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function ProfileCard() {
  return (
    <div className="flex flex-col lg:flex-row  items-stretch justify-between lg:gap-5 px-2 lg:px-4">

        <div className="flex items-center lg:gap-6 flex-col lg:flex-row -translate-y-12 lg:translate-y-0 ">
            {/* profile photo */}
            <div className="w-full lg:w-fit flex items-center gap-4 ">
                <div className="w-[120px] lg:w-[150px] h-[120px] lg:h-[150px] rounded-full overflow-hidden" >
                    <img src="./user.jpg" alt="profile" />
                </div>

                {/*  */}
                <div className="lg:hidden">
                    <h2 className="text-2xl font-semibold capitalize">user name</h2>
                    <div className="flex  gap-2 mt-1">
                        <p className="text-gray-600">0 posts</p>
                        <p className="text-gray-600">0 friends</p>
                    </div>
                </div>
            </div>

            {/* user data */}
            <div className="">
                <h1 className="hidden lg:block text-2xl font-bold capitalize" >user name</h1>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, voluptatum rerum aperiam voluptates tempore iure!</p>
            </div>
        </div>


        {/* buttons */} 
        <div className=" flex items-center px-2 lg:px-0 gap-5 lg:gap-4 shrink-0 h-fit lg:h-full -translate-y-6 lg:translate-y-0 ">
            <button className="flex flex-grow items-center justify-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                <FaPlus size={14} />
                <span>Add a Post</span>
            </button>

            <button className="flex flex-grow items-center justify-center gap-2 px-3 py-1 border border-gray-400 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                <FaPen size={14} />
                <span>Edit Profile</span>
            </button>
        </div>

    </div>
  )
}

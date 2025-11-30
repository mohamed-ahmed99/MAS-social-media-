import { IoIosArrowDown } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function ProfileCard() {


  const Buttons = () => {
    return (
      <>
          <button className="flex flex-grow items-center justify-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              <FaPlus fontSize={14}/>
              <span>Post</span>
          </button>
          <button className="flex flex-grow items-center justify-center gap-2 px-3 py-1 border border-gray-400 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              <FaPen fontSize={14}/>
              <span>Edit Profile</span>
          </button>
      </>)
  }



  return (
    <div className="flex relative gap-8 px-4 pt-16 lg:py-2 ">

        {/* photo */}
        <div  
          className="w-[130px] lg:w-[150px] h-[130px] lg:h-[150px] overflow-hidden rounded-full border-2 border-white
                    absolute -top-24 left-1/2 -translate-x-1/2 lg:static "
        >
            <img 
              src="./user.jpg" alt="User Profile"
              className="w-full h-full object-cover"
            />
        </div>


        <div className="flex flex-col gap-2 w-full">

            {/*  */}
            <div className="hidden lg:flex items-center justify-center lg:justify-between">
                <h2 className="text-2xl font-semibold">User Name</h2>

                <div className="flex gap-4">
                    <Buttons/>
                </div>
            </div>



            <div className="hidden lg:flex gap-4">
                <p className=""><span>0</span> Posts</p>
                <p><span>0</span> Friens</p>
            </div>



            <div className="absolute flex items-center justify-between px-3  top-4 left-0 w-full lg:hidden">
                <h2 className="text-3xl font-semibold flex-grow ">User Name</h2>

                <div className="flex gap-4 ">
                  <p className=""><span>0</span> Posts</p>
                  <p><span>0</span> Friens</p>
                </div>

                
            </div>

            <div className="text-sm sm:text-center lg:text-left w-full">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt distinctio eius aperiam provident, fugit tempora.</p>
            </div>

        </div>
    </div>
  )
}



// <button className="absolute right-4 bg-gray-300/70 p-2 rounded-full top-2  ">
//                   <IoIosArrowDown/>
//                 </button>

// icons
import { FaPen } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { MdOutlineCake } from "react-icons/md";
import { TbHeartSpark } from "react-icons/tb";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GrLocation } from "react-icons/gr";


export default function PersonalDetails({ edit=false}) {

    const ListComponets = [
        {icon:<GrLocation/>, value:"lives in minya, Egypt"},
        {icon:<FiHome/>, value:"from minya, Egypt"},
        {icon:<MdOutlineTaskAlt/>, value:"works as Freelancer"},
        {icon:<MdOutlineCake/>, value:"january 18, 2009"},
        {icon:<TbHeartSpark/>, value:"single"},
    ]



  return (
    <div className='py-5 px-5 bg-white'>
        
        <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-black'>Intro</h2>
            
            {edit &&
            <button 
                onClick={() => {}}
                className='text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors'
            >
                <FaPen fontSize={16}/> 
            </button>
            }
        </div>
    
        <ul className='space-y-4'>
            {ListComponets.map((item, index) => (
                <li 
                    key={index} 
                    className="flex items-center gap-4 text-gray-700 hover:text-black transition-colors group cursor-pointer"
                >
                    <span className='text-2xl text-gray-500 group-hover:text-black transition-colors'>{item.icon}</span>
                    <span className='font-medium'>{item.value}</span>
                </li>
            ))}
        </ul>

    </div>
  )
}

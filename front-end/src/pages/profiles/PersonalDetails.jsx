
// icons
import { FaPen } from "react-icons/fa";
import { MdOutlineCake } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { TbGenderBigender } from "react-icons/tb";


export default function PersonalDetails({ edit=false, userData, loading}) {


    const AnimationOfLoading = () => {
        return (
            <div className="animate-pulse bg-gray-300 rounded-full w-full h-6"/>
        )
    }

    const ListComponets = [
        {icon:<GrLocation/>, value: loading ? <AnimationOfLoading/> : userData?.address},
        {icon:<TbGenderBigender/>, value: loading ? <AnimationOfLoading/> : userData?.gender},
        {icon:<MdOutlineCake/>, value: loading ? <AnimationOfLoading/> : userData?.dateOfBirth},
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
                    {item.value && <span className='text-2xl text-gray-500 group-hover:text-black transition-colors'>{item.icon}</span>}
                    <div className='font-medium w-full'>{item.value}</div>
                </li>
            ))}
        </ul>

    </div>
  )
}

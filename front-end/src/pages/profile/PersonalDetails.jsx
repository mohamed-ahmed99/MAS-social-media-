import React from 'react'
import { FaPen } from "react-icons/fa";

import { IoLocationOutline } from "react-icons/io5";
import { FiHome } from "react-icons/fi";
import { MdOutlineCake } from "react-icons/md";
import { TbHeartSpark } from "react-icons/tb";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { GrLocation } from "react-icons/gr";


export default function PersonalDetails() {

    const ListComponets = [
        {icon:<GrLocation/>, value:"lives in minya, Egypt"},
        {icon:<FiHome/>, value:"from minya, Egypt"},
        {icon:<MdOutlineTaskAlt/>, value:"works as Freelancer"},
        {icon:<MdOutlineCake/>, value:"january 18, 2009"},
        {icon:<TbHeartSpark/>, value:"single"},
    ]



  return (
    <div className='py-2 px-4 bg-white rounded-md lg:rounded-xl col-span-10 lg:col-span-4'>
        
        <div className='flex items-stretch justify-between h-[40px] mb-2 '>
            <h2 className='text-xl font-semibold mb-4 h-full flex items-center'>Personal Details</h2>
            <div className='h-full flex items-center translate-y-[1px]'>
                <button className='text-gray-800 hover:bg-slate-100 p-2 rounded-full'> <FaPen fontSize={17} className=''/> </button>
            </div>
        </div>
    
        <ul className='space-y-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1'>
            {ListComponets.map((item, index) => (
                <li key={index} className="flex items-center gap-4 cursor-pointer">
                    <span className='text-[25px]'>{item.icon}</span>
                    <span className='font-semibold'>{item.value}</span>
                </li>
            ))}
        </ul>
    </div>
  )
}

import React from 'react'
import { FaPen } from "react-icons/fa";

export default function PersonalDetails() {

    const ListComponets = [
        {icon:<></>, value:"lives in minya, Egypt"},
        {icon:<></>, value:"from minya, Egypt"},
        {icon:<></>, value:"works as Freelancer"},
        {icon:<></>, value:"january 18, 2009"},
        {icon:<></>, value:"single"},
    ]



  return (
    <div>
        <div>
            <h2 className='text-2xl font-semibold mb-4'>Personal Details</h2>
            <button> <FaPen/> </button>
        </div>

        <ul>
            
        </ul>
    </div>
  )
}

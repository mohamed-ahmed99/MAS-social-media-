import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function NavOfAcountComponents() {

    const categories = [ 'All', 'About', 'Friends', 'Posts', 'Photos',]

    const [activeCategory, setActiveCategory] = useState('All')



  return (
    <div className="border-t border-gray-300  ">
        <ul className="flex items-center gap-2 justify-between lg:justify-start ">{categories.map((category, index) => {
            return (
            <li 
                key={index} 
                onClick={() => setActiveCategory(category)}
                className={`lg:mr-6 cursor-pointer border-b-2 py-4  hover:opacity-80 px-4 transition 
                    ${activeCategory === category ? 'border-blue-600 font-semibold text-blue-600' : 'text-gray-600 border-transparent' }`}
            >
                {category}
            </li>
            )
        })}</ul>

    </div>
  )
}

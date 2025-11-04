import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function RightSide() {

  const data = [
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 2:00am", online:true},
    {img:"./user.jpg", name:"Abd_el_wahhab Ali", lastSeen:"Today at 3:00am", online:false},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    // ... باقي الناس
  ];

  return (
    <div className='hidden md:block bg-white w-[300px] h-screen fixed right-0 py-4 px-3 overflow-y-scroll border-l'>

      <p className="font-semibold text-gray-600 text-lg px-1 mb-2">Friends</p>

      {data.map((friend, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to={`/friends/${friend.name.replaceAll(" ", "_")}`} 
            className='flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 group cursor-pointer'
          >

            <div className='relative'>
              <img 
                src={friend.img} 
                alt={friend.name} 
                className='h-[45px] w-[45px] rounded-full object-cover'
              />

              {/* online dot */}
              {/* <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white 
                ${friend.online ? "bg-green-500" : "bg-gray-400"}`}>
              </span> */}
            </div>

            <div className="flex flex-col  justify-center leading-tight">
              <p className='font-semibold text-[15px] group-hover:text-blue-600'>{friend.name}</p>
              <p className='text-xs text-gray-500 group-hover:text-blue-400'>
                last seen: {friend.lastSeen} 
              </p>
            </div>

          </Link>
        </motion.div>
      ))}

    </div>
  );
}

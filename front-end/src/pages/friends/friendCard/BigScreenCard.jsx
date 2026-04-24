import { Link } from 'react-router-dom';


export default function BigScreenCard({ 
  userName, 
  userData, 
  grayBtn, 
  HandleBlueBtn, 
  HandleGrayBtn,
  status_d,
}) {
  return (
    <Link to={`/user/${(userName.replaceAll(" ", "_")).replaceAll("-", "_")}-${userData?._id}`}
      className='max-w-[250px] grow overflow-hidden flex flex-col gap-2 bg-white rounded-md' >

      {/* img */}
      <div className='w-full h-[200px]'>
        <img
          src={`/user.jpg`}
          alt="friend-img"
          className='w-full h-[200px] object-cover'
        />

      </div>


      {/* name and mutual friends */}
      <div className='px-2'>
        <h2 className='text-[15px] font-semibold text-stone-800'>{userName}</h2>
        <p className='text-sm text-gray-700'>{0} mutual friends</p>
      </div>

      {/* buttons */}
      <div className='flex gap-2 flex-col py-2 px-1'>
        {status_d !== "success" && <HandleBlueBtn />}
        {grayBtn &&
          <HandleGrayBtn />
        }
      </div>


    </Link>
  )
}
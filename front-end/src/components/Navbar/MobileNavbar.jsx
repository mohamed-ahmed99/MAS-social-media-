import { NavLink } from 'react-router-dom';




/*
  - links of mobile navbar
*/
export default function MobileNavbar({ mobileLinks }) {
  return (
    <nav className='sticky top-0 z-[888] bg-white border-b-[1.5px] h-[50px]'>

      {/* navbar */}
      <div className='sticky top-0 w-full flex z-[888] bg-white  items-center justify-between h-full px-2'>

        {/* links */}
        {mobileLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.href}
            className={({ isActive }) => `text-black/85 border-b-2  px-2  py-3  
                ${isActive ?
                  "border-black text-black"
                  : "border-transparent text-black/85"}`
            }
          >
            {link.icon}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}


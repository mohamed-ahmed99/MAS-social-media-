
import { IoMdSettings } from "react-icons/io";
import {useUserContext} from '../../hooks/useUserContext'
import { useEffect } from "react";

export default function Profile() {

  const {userData, setUserData} = useUserContext()
  useEffect(() => console.log(userData), [userData])

  


  return (
    <div className="bg-gray-100 "> 

      <div className="max-w-[800px] m-auto min-h-screen bg-gray-50">
            {/* profile photo &&  background photo*/}
            <div className="relative mb-14">
                <div className="h-[200px] bg-gray-200"></div>
                <div className="w-[200px] h-[200px] absolute -bottom-10 left-5 bg-gray-300 rounded-full "></div>
            </div>
        

            {/*  */}
            <div className="px-4">
              {/* name && bio  */}
              <div className="flex justify-between">

                  <div className="w-2/3">
                      <h2 className="capitalize text-[28px] font-semibold">{`${userData.firstName}`|| "Undefind"}</h2>
                      <p className="text-sm tracking-wide text-black/80">Lorem ipsum Lorem Lorem ipsum dolor sit amet. ipsum dolor sit amet consectetur adipisicing elit. Commodi, quod. dolor sit amet, consectetur adipisicing elit. Deserunt, natus.</p>
                  </div>

              </div>
              
              <ul></ul>
            </div>
      </div>
    </div>
  )
}

import React, { useEffect } from 'react'

export default function AppLoading({loading}) {

  useEffect(() => { 
      if(loading){
          document.body.style.overflow = "hidden"
      }
      else{
        document.body.style.overflow = "auto"
      }

      return () => document.body.style.overflow = "auto"
      
  },[loading])

  return (
    <div className='fixed top-0 left-0 bg-white flex items-center justify-center w-screen h-screen z-[999]'>
        <img src="./logo.png" alt="" />
    </div>
  )
}

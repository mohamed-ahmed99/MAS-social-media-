import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link 
        to="/" 
        className='w-[100px] overflow-hidden cursor-pointer'
    >
        <img  
            className='w-full h-full'
            src="/logo4.png" 
            alt="logo" 
        />
    </Link>
  )
}
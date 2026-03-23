import React from 'react'
import { PuffLoader } from 'react-spinners'

const GeneralBtn = ({
  text, 
  children,
  className = "", 
  variant = 'primary', 
  type = "button", 
  disabled = false, 
  loading = false,
  ...props
}) => {
  
  const baseClasses = "flex justify-center items-center outline-none transition-colors border p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "w-full bg-zinc-50 text-black placeholder-zinc-400 hover:bg-zinc-200 border-transparent",
    secondary: "bg-transparent text-white border-zinc-700 hover:bg-zinc-800 w-full",
    danger: "bg-red-500 text-white hover:bg-red-600 border-red-500 w-full",
    ghost: "bg-transparent border-transparent text-zinc-50 hover:bg-zinc-800 w-full"
  };

  const variantClasses = variants[variant] || variants.primary;

  return (
    <button 
        type={type} 
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses} ${className}`}
        {...props}
    >
        {loading ? 
            <PuffLoader 
                color={variantClasses.includes('text-white') || className.includes('text-white') ? '#fff' : '#000'} 
                size={20}
            /> 
            : 
            (children || text)
        }
    </button>
  )
}

export default GeneralBtn
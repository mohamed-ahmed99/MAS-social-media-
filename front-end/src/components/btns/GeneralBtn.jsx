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
  
  const baseClasses = "relative flex justify-center items-center outline-none transition-all border p-2.5 rounded-lg disabled:opacity-75 disabled:cursor-not-allowed font-semibold overflow-hidden";
  
  const variants = {
    primary: "w-full bg-zinc-50 text-black hover:bg-zinc-200 border-transparent",
    secondary: "bg-transparent text-white border-zinc-700 hover:bg-zinc-800 w-full",
    danger: "bg-red-500 text-white hover:bg-red-600 border-red-500 w-full",
    ghost: "bg-transparent border-transparent text-zinc-50 hover:bg-zinc-800 w-full",
    black: "bg-black text-white hover:bg-zinc-800 border-transparent w-full"
  };

  const loaderColors = {
    primary: "#000000",
    secondary: "#ffffff",
    danger: "#ffffff",
    ghost: "#ffffff",
    black: "#ffffff"
  };

  const variantClasses = variants[variant] || variants.primary;
  
  // Custom color detection if overriden via className, otherwise fallback to variant-based color
  const loaderColor = className.includes('text-white') ? '#ffffff' 
                    : className.includes('text-black') ? '#000000' 
                    : loaderColors[variant] || '#ffffff';

  return (
    <button 
        type={type} 
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses} ${className}`}
        {...props}
    >
        {/* We keep the text/content in the DOM but make it transparent during loading. 
            This prevents the button from shrinking or expanding when the loader appears. */}
        <span className={`flex items-center justify-center gap-2 transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
            {children || text}
        </span>

        {/* The loader is positioned absolutely in the center of the button */}
        {loading && (
            <span className="absolute inset-0 flex items-center justify-center">
                <PuffLoader color={loaderColor} size={24} /> 
            </span>
        )}
    </button>
  )
}

export default GeneralBtn
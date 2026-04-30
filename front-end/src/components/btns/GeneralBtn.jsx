import React from 'react'
import { PuffLoader } from 'react-spinners'

/**
 * GeneralBtn Component
 * 
 * @param {string} text - Button text (fallback to children)
 * @param {React.ReactNode} children - Button content (icons, text, etc)
 * @param {string} className - Custom Tailwind classes for complete design override
 * @param {string} variant - 'primary', 'secondary', 'black', 'outline', 'ghost', 'danger'
 * @param {string} type - 'button', 'submit', 'reset'
 * @param {boolean} disabled - Disable button
 * @param {boolean} loading - Show loading state
 * @param {React.ReactNode} loadingIcon - Custom icon to show during loading
 */
const GeneralBtn = ({
  text,
  children,
  className = "",
  variant = 'primary',
  type = "button",
  disabled = false,
  loading = false,
  loadingIcon,
  ...props
}) => {

  // base classes
  const baseClasses = "relative flex justify-center items-center outline-none transition-all border p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold overflow-hidden active:scale-[0.98]";


  // variants
  const variants = {
    primary: "bg-white text-black border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 w-full shadow-sm",
    black: "bg-black text-white hover:bg-black/90 border-transparent w-full",
  };

  // loader colors
  const loaderColors = {
    primary: "#000000",
    black: "#ffffff",
  };

  const variantClasses = variants[variant] || variants.primary;

  // Detection for loader color based on variant
  const loaderColor = loaderColors[variant] || '#000000';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Button content - fades out when loading */}
      <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {children || text}
      </span>

      {/* Loader - Absolute positioned in the center */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          {loadingIcon ? (
            <span className="animate-spin">{loadingIcon}</span>
          ) : (
            <PuffLoader color={loaderColor} size={22} />
          )}
        </span>
      )}
    </button>
  )
}

export default GeneralBtn

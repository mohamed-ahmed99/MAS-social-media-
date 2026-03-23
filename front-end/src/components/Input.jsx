import { motion, AnimatePresence } from 'framer-motion';

const Input = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    className = "",
    containerClassName = "",
}) => {
    return (
        <div 
            className={`w-full flex flex-col gap-1.5 ${containerClassName}`} 
        >
            {label && (
                <label htmlFor={name} className="text-sm font-semibold text-black">
                    {label}
                </label>
            )}
            
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full border p-2.5 block outline-none transition-colors rounded-lg bg-zinc-50 text-black placeholder-zinc-400
                    ${error 
                        ? 'border-red-500 bg-red-50 focus:border-red-600' 
                        : 'border-zinc-300 focus:border-black bg-white focus:bg-zinc-50'} 
                    ${className}`}
                
            />
            
            <AnimatePresence mode="wait">
                {error && (
                    <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-[12px] sm:text-sm text-red-600 font-medium"
                    >
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Input;

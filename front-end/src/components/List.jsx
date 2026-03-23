import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronDown } from 'react-icons/lu';

const List = ({
    label,
    options = [],
    value,
    onChange,
    name,
    required = false,
    error,
    placeholder = "Select an option",
    className = "",
    containerClassName = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options?.find(opt => opt.value === value);

    const handleSelect = (option) => {
        if (onChange) {
            onChange({
                target: {
                    name,
                    value: option.value
                }
            });
        }
        setIsOpen(false);
    };

    return (
        <div className={`w-full flex flex-col gap-1.5 relative ${containerClassName} ${className}`} ref={containerRef}>
            {label && (
                <label className="text-sm font-semibold text-black">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full border p-2.5 outline-none transition-colors rounded-lg flex items-center justify-between cursor-pointer select-none
                    ${error 
                        ? 'border-red-500 bg-red-50 focus:border-red-600' 
                        : (isOpen ? 'border-black bg-zinc-50' : 'border-zinc-300 bg-white hover:bg-zinc-50')}
                `}
            >
                <span className={!selectedOption ? "text-zinc-400" : "text-black"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                >
                    <LuChevronDown size={20} className={!selectedOption ? "text-zinc-400" : "text-black"} />
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 5, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.98 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-zinc-200 rounded-lg shadow-lg z-[100] overflow-hidden py-1.5 flex flex-col gap-0.5"
                    >
                        {options.map((option) => (
                            <motion.li
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className={`
                                    px-3 py-2 cursor-pointer text-sm mx-1.5 rounded-md
                                    hover:bg-zinc-100 transition-colors
                                    ${value === option.value ? 'bg-zinc-100 text-black font-semibold' : 'text-zinc-700'}
                                `}
                            >
                                {option.label}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>

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

export default List;
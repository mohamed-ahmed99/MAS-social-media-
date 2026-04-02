import { IoMdSearch } from "react-icons/io";
import { motion } from "framer-motion";
import GeneralBtn from "../../components/btns/GeneralBtn";
import Input from "../../components/Input";
import { useState } from "react";

/**
 * SearchInput Component
 * A premium search bar with animations and integrated components.
 */
export default function SearchInput() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
        className={`
            flex items-center gap-1 p-1 rounded-full border transition-all duration-300
            ${isFocused 
                ? "bg-white border-black w-[280px] shadow-md" 
                : "bg-zinc-100/80 border-zinc-200 w-[240px] hover:bg-zinc-100 hover:border-zinc-300"
            }
        `}
    >
        {/* Search Input Field */}
        <div className="flex-1">
            <Input
                placeholder="Search resources..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="!border-none !bg-transparent !py-1.5 !px-3 !shadow-none focus:!bg-transparent h-8 text-sm"
                containerClassName="!gap-0"
            />
        </div>

        {/* Search Button */}
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <GeneralBtn
                variant="black"
                className="!w-8 !h-8 !p-0 !rounded-full flex items-center justify-center shrink-0"
            >
                <IoMdSearch size={18} />
            </GeneralBtn>
        </motion.div>
        
    </div>
  );
}
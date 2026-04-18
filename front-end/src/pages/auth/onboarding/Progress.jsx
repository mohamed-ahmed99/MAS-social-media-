import React from 'react';
import { motion } from 'framer-motion';

const Progress = ({ step, totalSteps, steps }) => {
  return (
    <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
            Step {step} of {totalSteps}: {steps[step-1].label}
        </span>
        <span className="text-xs text-gray-400 font-bold">
            {Math.round((step / totalSteps) * 100)}%
        </span>
        </div>
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <motion.div 
            className="bg-black h-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        </div>
    </div>
  );
};

export default Progress;
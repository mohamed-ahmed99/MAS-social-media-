import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HiOutlineCalendar, HiOutlineBadgeCheck, HiOutlineExclamationCircle } from 'react-icons/hi';

const Step3Birth = () => {
  const { formData, updateFormData } = useOutletContext();
  const [error, setError] = useState('');

  const validateAge = (dob) => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 13) {
      setError('Note: You appear to be under 13. Please verify your date.');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    validateAge(formData.dateOfBirth);
  }, [formData.dateOfBirth]);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">When's your birthday?</h2>
        <p className="text-gray-500 text-sm md:text-base">We use this information to maintain a safe community experience.</p>
      </div>

      <div className="relative group">
        <div className="absolute top-1/2 -translate-y-1/2 left-5 p-2 bg-gray-100 rounded-lg group-focus-within:bg-black transition-colors">
          <HiOutlineCalendar className="text-gray-600 group-focus-within:text-white text-xl" />
        </div>
        <input
          type="date"
          className="w-full pl-16 pr-5 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-black outline-none transition-all text-lg font-bold cursor-pointer"
          value={formData.dateOfBirth}
          onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
        />
      </div>
    </div>
  );
};

export default Step3Birth;

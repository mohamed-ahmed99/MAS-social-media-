import React from 'react';

const InputWithError = ({placeholder, name, type="text", onChange, validation}) => {
    const validationMessage = validation[name]
    return (
        <div className='w-full'>
            <input type={type} placeholder={placeholder} name={name} onChange={onChange}
                className='w-full border p-2 block outline-none border-gray-300 rounded-md'/>
            <p>{validationMessage && <span className='text-[9px] sm:text-sm text-red-600'>{validationMessage}</span>}</p>
        </div>
    );
}

export default InputWithError;

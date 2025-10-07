import React from 'react';

const InputWithError = ({placeholder, name, type="text", onChange}) => {
    return (
        <div className='w-full'>
            <input type={type} placeholder={placeholder} name={name} onChange={onChange}
                className='w-full border p-2 block outline-none border-gray-300 rounded-md'/>
            <p></p>
        </div>
    );
}

export default InputWithError;

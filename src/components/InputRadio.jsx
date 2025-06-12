import React from 'react';

function InputRadio({ htmlFor, src, id, value, name, checked, onChange, className, ...props }) {
  const baseStyles = 'relative w-[12rem] h-[6rem] sm:w-[14rem] sm:h-[7rem] md:w-[16rem] md:h-[9rem] rounded-xl sm:rounded-2xl border border-gray-300 flex justify-center items-center transition-colors duration-200';
  const selectedStyles = checked ? 'bg-primary-500 border-primary-600' : 'bg-white';

  return (
    <div className={`${baseStyles} ${selectedStyles} ${className}`}>
      <label htmlFor={htmlFor} className="cursor-pointer flex justify-center">
        <img src={src} alt={`${value} logo`} className="w-3/4 h-auto" />
      </label>
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className="absolute top-1 sm:top-2 right-1 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border rounded-full accent-primary-500 cursor-pointer"
        {...props}
      />
    </div>
  );
}

export default InputRadio;
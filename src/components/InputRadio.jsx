import React from 'react';

function InputRadio({ htmlFor, src, id, value, name, checked, onChange, className, ...props }) {
  const baseStyles = 'relative w-[16rem] h-[9rem] rounded-2xl border border-gray-300 flex justify-center items-center transition-colors duration-200';
  const selectedStyles = checked ? 'bg-orange-500 border-orange-600' : 'bg-white';

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
        className="absolute top-2 right-2 w-6 h-6 border rounded-full accent-orange-500 cursor-pointer"
        {...props}
      />
    </div>
  );
}

export default InputRadio;
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function InputStyle({ label, id, placeholder, showChevron = false, ...props }) {
  return (
    <>
      {label && (
        <label htmlFor={id} className="headline-2-bold text-black-500 text-base sm:text-lg md:text-xl">
          {label}
        </label>
      )}
      <div className="flex h-[2.5rem] sm:h-[3rem] md:h-[3.375rem] px-4 sm:px-6 py-2 sm:py-[0.9375rem] items-center gap-2 self-stretch border rounded-xl sm:rounded-2xl">
        <img src="/assets/search.svg" alt="search icon" className="w-4 h-4 sm:w-5 sm:h-5" />
        <input
          type="search"
          id={id}
          placeholder={placeholder}
          className="outline-none flex-1 text-sm sm:text-base md:text-lg"
          {...props}
        />
        {showChevron && <img src="/assets/chevron-down.svg" alt="chevron icon" className="w-4 h-4 sm:w-5 sm:h-5" />}
      </div>
    </>
  );
}

export default InputStyle;

export function InputNormal({ label, id, className, ...props }) {
  const baseStyles = ' placeholder:text-neutral-300 bg-neutral-50 px-4 sm:px-5 py-2 sm:py-3 rounded sm:rounded-md text-sm  md:text-md outline-none focus-within:ring-1 focus-within:ring-orange-50 ';
  return (
    <div className="flex flex-col gap-1 sm:gap-2 w-full">
      <label className="font-medium text-black-300 sm:text-base md:text-lg" htmlFor={id}>{label}</label>
      <input id={id} className={`${baseStyles} ${className}`} {...props}></input>
    </div>
  );
}

export function InputPassword({ label, id, className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const baseStyles = ' placeholder:text-neutral-300 px-4 sm:px-5 py-2 sm:py-3 rounded sm:rounded-md text-sm md:text-md outline-none';

  return (
    <div className="flex flex-col gap-1 sm:gap-2 w-full">
      <label className="font-medium text-black-300 sm:text-base md:text-lg" htmlFor={id}>{label}</label>
      <div className="relative bg-neutral-50 rounded focus-within:ring-1 focus-within:ring-orange-50">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`${baseStyles} ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-5 h-5" />
          ) : (
            <AiOutlineEye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export function Checkbox({ label, id, ...props }) {
  return (
    <div className="flex gap-2 w-full items-center">
      <input type="checkbox" id={id} className="w-3 h-3
        
      " {...props}></input>
      <label className=" font-medium text-neutral-500 text-sm md:text-md" htmlFor={id}>{label}</label>
    </div>
  );
}
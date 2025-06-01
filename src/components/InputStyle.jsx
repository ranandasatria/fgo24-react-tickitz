import React from 'react';

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

export function InputNormal({label, id, className, ...props}){
  const baseStyles = 'body-3-regular placeholder:text-neutral-300 bg-neutral-50 px-4 sm:px-5 py-2 sm:py-3 rounded sm:rounded-md text-sm sm:text-base md:text-lg'
  return(
    <div className='flex flex-col gap-1 sm:gap-2 w-full'>
    <label className='body-2-medium text-black-300 text-sm sm:text-base md:text-lg' htmlFor={id}>{label}</label>
    <input id={id} 
    className={`${baseStyles} ${className}`} {...props}></input>
    </div>
  )
}

export function Checkbox({label, id, ...props}){
  return(
    <div className='flex gap-2 sm:gap-4 w-full'>
      <input type='checkbox' id={id} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" {...props}></input>
      <label className="body-1-regular text-neutral-500 text-sm sm:text-base md:text-lg" htmlFor={id}>{label}</label>
    </div>
  )
}
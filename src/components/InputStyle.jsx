import React from 'react';

function InputStyle({ label, id, placeholder, showChevron = false, ...props }) {
  return (
    <>
      {label && (
        <label htmlFor={id} className="headline-2-bold text-black-500">
          {label}
        </label>
      )}
      <div className="flex h-[3.375rem] px-6 py-[0.9375rem] items-center gap-2.5 self-stretch border rounded-2xl">
        <img src="/assets/search.svg" alt="search icon" />
        <input
          type="search"
          id={id}
          placeholder={placeholder}
          className="outline-none flex-1"
          {...props}
        />
        {showChevron && <img src="/assets/chevron-down.svg" alt="chevron icon" />}
      </div>
    </>
  );
}

export default InputStyle;

export function InputNormal({label, id, ...props}){
  return(
    <div className='flex flex-col gap-2 w-full'>
    <label className='body-2-medium text-black-500' htmlFor={id}>{label}</label>
    <input id={id} className='body-3-regular placeholder:text-neutral-300 bg-neutral-50 px-5 py-3 rounded-md' {...props}></input>
    </div>
  )
}

export function Checkbox({label, id, ...props}){
  return(
    <div className='flex gap-4 w-full '>
      <input type='checkbox' id={id} {...props}></input>
      <label className="body-1-regular text-neutral-500" htmlFor={id}>{label}</label>
    </div>
  )
}


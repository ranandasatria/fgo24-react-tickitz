import React from 'react'

const IconRound = ({ children, variant = 'primary', className = '' }) => {
  const baseStyles = 'flex headline-3-semibold h-10 w-10 items-center justify-center cursor-pointer rounded-full';
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-neutral-50 text-black hover:bg-orange-200 border border-black-500'
  };

  return (
    <div>
      <div
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </div>
    </div>
  );
};


export default IconRound


// const Icon = ({src, alt, className=''}) => {
//   const baseStyles = 'flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full border border-transparent bg-orange-500'
//   const imgStyles = "h-6 w-6"
  

//   return (
//     <div className={`${baseStyles} ${className}`}>
//     <img
//      src={src}
//      alt={alt}
//      className={`${imgStyles} ${className}`}
//     >  
//     </img>
    
//     </div>
//   );
// };
import React from 'react'

const IconRound = ({ children, variant = 'primary', className = '' }) => {
  const baseStyles = 'flex headline-3-semibold h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center cursor-pointer rounded-full text-sm sm:text-base md:text-lg';
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-neutral-50 text-black hover:bg-primary-200 border border-black-500',
    done: 'bg-green-500 text-white '
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
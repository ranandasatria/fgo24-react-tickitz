import { Link } from 'react-router-dom';

const Button = ({ children, to, variant = 'primary', className = '', type, ...props }) => {
  const baseStyles = 'font-bold flex items-center justify-center px-4 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl cursor-pointer text-sm sm:text-base md:text-lg';
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-neutral-50 text-black hover:bg-orange-200 border border-orange-500',
    neutral: 'bg-neutral-50 text-black hover:bg-orange-200 border border-black-500',
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type || 'button'}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;
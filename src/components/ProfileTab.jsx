export default function ProfileTab({variant, children, className, ...props}) {
  const baseStyles = 'body-1-medium border-b pb-4 cursor-pointer'
  const variants = {
    active: ' text-black-500 border-orange-200',
    inactive: ' text-gray-500 border-transparent'
  }
  return(
    <div 
    className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
    {children} 
    </div>
  )
}
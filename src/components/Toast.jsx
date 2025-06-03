import toast from "react-hot-toast"

const ToastUI = ({children, variant, className= '', ...props}) => {
  const variants = {
    success: 'bg-green-500 text-white',
    failed: 'bg-red-50 text-white'
  } 
  return(
    <div
    className={`${variants[variant]} ${className}`}
    {...props}>
      {children}
    </div>
  )
}

export default ToastUI

export const ToastSuccess = () =>{
  
  return (
    <div>
    {toast.success('Thank you for subscribing!', {
          style: {
            background: '#4ade80',
            color: '#fff',
          },
        })}
    </div>
  )
}



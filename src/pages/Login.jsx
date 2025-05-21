import { InputNormal } from '../components/InputStyle'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import LinkButton from '../components/LinkButton'

function Login() {

  return (
    <div className="w-full h-screen flex items-center justify-center bg-center bg-black/30  bg-[url('/assets/witfh.png')] bg-blend-multiply ">
      <div className='bg-white/80 flex flex-col h-full w-[35rem] items-center justify-center px-24 rounded-2xl gap-3'>
        <img src='/assets/tickitznav.svg'></img>
        <div className='flex flex-col gap-2 justify-start'>
          <h1 className='headline-1-bold text-black-500'>Welcome back 👋</h1>
          <p className='body-1-regular text-black-400'>Sign in with your data that you entered during your registration.</p>
        </div>
         <form className='flex flex-col w-full gap-2'>
           <InputNormal label='Email' type='email' id='email' placeholder='Enter your email'/>
           <InputNormal label='Password' type='password' id='password' placeholder='Enter your password'/>
           <LinkButton to="/forgotpassword">Forgot password?</LinkButton>
           <Button>Login</Button>
         </form>
           
            <div className="flex items-center w-full">
              <div className="border w-full border-black-100"></div>
              <span className="mx-4 text-black-100">Or</span>
              <div className="border w-full border-black-100"></div>
            </div>
          <div className='flex gap-2 items-center justify-evenly w-full'>
            <Link to="https://google.com" className="flex items-center justify-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-lg hover:bg-orange-50 cursor-pointer">
              <FcGoogle className='text-xl'/>
              <p className='body-1-semibold text-neutral-300'>Google</p>
            </Link>
            <Link to="https://facebbok.com" className="flex items-center justify-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-lg hover:bg-orange-50 cursor-pointer">
              <FaFacebook className='text-blue-950 text-xl' />
              <p className='body-1-semibold text-neutral-300'>Facebook</p>
            </Link>    
            </div> 
      </div>
      
    </div>
  )
}

export default Login
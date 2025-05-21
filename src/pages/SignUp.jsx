import IconRound from '../components/Icon'
import { Checkbox, InputNormal } from '../components/InputStyle'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

function SignUp() {
  return (
     <div className="w-full h-screen flex items-center justify-center bg-center bg-black/30  bg-[url('/assets/witfh.png')] bg-blend-multiply ">
        <div className='bg-white/80 flex flex-col h-full w-[35rem] items-center justify-center px-24 rounded-2xl gap-3'>
         <img src='/assets/tickitznav.svg'></img>
          <div className='flex gap-4 items-center justify-center'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <IconRound variant='primary'>1</IconRound>
            <p className='body-3-medium text-black-600'>Fill Form</p>
          </div>
          <div className='w-20 border border-dashed border-neutral-500'></div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <IconRound variant='secondary'>2</IconRound>
            <p className='body-3-medium text-neutral-400'>Activate</p>
          </div>
          <div className='w-20 border border-dashed border-neutral-500'></div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <IconRound variant='secondary'>3</IconRound>
            <p className='body-3-medium text-neutral-400'>Done</p>
          </div>
        </div>
         <form className='flex flex-col w-full gap-3'>
           <InputNormal label='Email' type='email' id='email' placeholder='Enter your email'/>
           <InputNormal label='Password' type='password' id='password' placeholder='Enter your password'/>
           <Checkbox label="I agree to terms and conditions" id='terms'></Checkbox>
           <Button>Join for Free Now</Button>
         </form>
         
           <p className='body-1-medium text-black-400'>Already have an Account? <Link to='/login' className='underline body-1-medium text-blue-600'>Login</Link></p>
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

export default SignUp
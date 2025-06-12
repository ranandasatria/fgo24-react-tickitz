import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputNormal } from '../components/InputStyle';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function ForgotPassword() {
    const validationSchema = yup.object({
    email: yup.string().trim().email('Invalid email.').required('Email is required.')
  })
  const {register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })

const onSubmit = () => {
    toast.success('Email sent!', {
      style: {
        background: '#4ade80',
        color: '#fff',
      },
    })
  }


  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-center bg-black/30 bg-[url('/assets/witfh.png')] bg-blend-multiply">
       <div className="bg-white/80 flex flex-col w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[35rem] min-h-[90vh] sm:min-h-[80vh] items-center justify-center px-4 sm:px-8 md:px-24 py-6 rounded-2xl gap-3 sm:gap-4">
        <Link to="/"><img src="/assets/tontrix-high-resolution-logo-transparent.png" alt="Tontrix Logo" className="w-24 sm:w-28 md:w-32" /></Link>
        <div className="flex flex-col gap-2 justify-start w-full">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-black-500">Forgot password</h1>
          <p className="font-regular text-sm text-black-400">No worries, we'll send you a link to reset your password.</p>
        </div>
        <form className="flex flex-col w-full gap-3 sm:gap-4" onSubmit={handleSubmit(onSubmit)}>
          <InputNormal
            label="Email"
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && <div className="text-wrong-600">{errors.email.message}</div>}
          <Button type="submit" >Send Email</Button>
        </form>
        <p className="font-medium text-sm text-black-400">
          {/* Don't have an account?{' '} */}
          <Link to="/login" className="underline text-blue-600">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
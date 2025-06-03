import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputNormal } from '../components/InputStyle';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import LinkButton from '../components/LinkButton';
import { loginAction } from '../redux/reducers/auth';
import { InputPassword } from '../components/InputStyle';
import toast from 'react-hot-toast';

function Login() {
  const validationSchema = yup.object({
    email: yup.string().trim().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const [error, setError] = useState('');

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    const { email, password } = data;
    const user = users.find(
      (u) => u.email === email.trim() && u.password === btoa(password)
    );

    if (user) {
      setError('');
      dispatch(loginAction({ email: user.email, id: user.id, name: user.name || user.email.split('@')[0]}));
      toast.success('Login success!', {
      style: {
        background: '#4ade80',
        color: '#fff',
      },
    }),
      navigate('/');
    } else {
      setError('Wrong email or password');
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-center bg-black/30 bg-[url('/assets/witfh.png')] bg-blend-multiply">
       <div className="bg-white/80 flex flex-col w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[35rem] min-h-[90vh] sm:min-h-[80vh] items-center justify-center px-4 sm:px-8 md:px-24 py-6 rounded-2xl gap-3 sm:gap-4">
        <img src="/assets/tickitznav.svg" alt="Tickitz Logo" className="w-24 sm:w-28 md:w-32"/>
        <div className="flex flex-col gap-2 justify-start w-full">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-black-500">Welcome back 👋</h1>
          {/* <p className="body-1-regular text-black-400">Sign in with your data that you entered during your registration.</p> */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3 sm:gap-4">
          <InputNormal
            label="Email"
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && <div className="text-wrong-600">{errors.email.message}</div>}
          {error && <div className="text-wrong-600">{error}</div>}
         <InputPassword
          label="Password"
          id="password"
          placeholder="Enter your password"
          {...register('password')}
          />
          {errors.password && <div className="text-wrong-600">{errors.password.message}</div>}
          <LinkButton to="/forgotpassword">Forgot password?</LinkButton>
          <Button type="submit" >Login</Button>
        </form>
        <p className="font-medium text-sm text-black-400">
          Don't have an account?{' '}
          <Link to="/signup" className="underline text-blue-600">
            Sign Up
          </Link>
        </p>
        <div className="flex items-center w-full">
          <div className="border w-full border-black-100"></div>
          <span className="mx-2 sm:mx-4 text-black-200 text-sm">Or</span>
          <div className="border w-full border-black-100"></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-evenly w-full">
          <Link to="https://google.com" className="flex items-center justify-center gap-2 sm:gap-4 bg-white px-3 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-lg hover:bg-orange-50 cursor-pointer w-full sm:w-auto">
            <FcGoogle className="text-lg sm:text-xl" />
            <p className=" font-medium text-neutral-300 text-sm sm:text-base">Google</p>
          </Link>
          <Link to="https://facebook.com" className="flex items-center justify-center gap-2 sm:gap-4 bg-white px-3 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-lg hover:bg-orange-50 cursor-pointer w-full sm:w-auto">
            <FaFacebook className="text-blue-950 text-lg sm:text-xl" />
            <p className=" font-medium text-neutral-300 text-sm sm:text-base">Facebook</p>
          </Link>
          </div>
      </div>
    </div>
  );
}

export default Login;
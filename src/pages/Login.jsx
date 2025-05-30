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
      console.log('Navigating to home');
      navigate('/');
    } else {
      setError('Wrong email or password');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-center bg-black/30 bg-[url('/assets/witfh.png')] bg-blend-multiply">
      <div className="bg-white/80 flex flex-col h-full w-[35rem] items-center justify-center px-24 rounded-2xl gap-3">
        <img src="/assets/tickitznav.svg" alt="Tickitz Logo" />
        <div className="flex flex-col gap-2 justify-start">
          <h1 className="headline-1-bold text-black-500">Welcome back 👋</h1>
          <p className="body-1-regular text-black-400">Sign in with your data that you entered during your registration.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
          <InputNormal
            label="Email"
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && <div className="text-wrong-600">{errors.email.message}</div>}
          {error && <div className="text-wrong-600">{error}</div>}
          <InputNormal
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password && <div className="text-wrong-600">{errors.password.message}</div>}
          <LinkButton to="/forgotpassword">Forgot password?</LinkButton>
          <Button type="submit">Login</Button>
        </form>
        <p className="body-1-medium text-black-400">
          Don't have an account?{' '}
          <Link to="/signup" className="underline body-1-medium text-blue-600">
            Sign Up
          </Link>
        </p>
        <div className="flex items-center w-full">
          <div className="border w-full border-black-100"></div>
          <span className="mx-4 text-black-100">Or</span>
          <div className="border w-full border-black-100"></div>
        </div>
        <div className="flex gap-2 items-center justify-evenly w-full">
          <Link to="https://google.com" className="flex items-center justify-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-lg hover:bg-orange-50 cursor-pointer">
            <FcGoogle className="text-xl" />
            <p className="body-1-semibold text-neutral-300">Google</p>
          </Link>
          <Link to="https://facebook.com" className="flex items-center justify-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-lg hover:bg-orange-50 cursor-pointer">
            <FaFacebook className="text-blue-950 text-xl" />
            <p className="body-1-semibold text-neutral-300">Facebook</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
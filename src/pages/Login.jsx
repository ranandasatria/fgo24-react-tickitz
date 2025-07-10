import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputNormal, InputPassword } from '../components/InputStyle';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import LinkButton from '../components/LinkButton';
import { loginAction } from '../redux/reducers/auth';
import toast from 'react-hot-toast';
import http from '../lib/http';

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
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await http().post('/login', {
        email: data.email,
        password: data.password,
      });

      const token = res.data.results.token;
      const profileRes = await http(token).get('/profile');
      const user = profileRes.data.results;

      dispatch(loginAction({ token, user }));
      setError('');

      toast.success('Login success!', {
        style: { background: '#4ade80', color: '#fff' },
      });

      navigate(user.role === 'admin' ? '/dashboard' : '/');
    } catch (err) {
      console.error(err);
      setError('Wrong email or password');
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-center bg-black/30 bg-[url('/assets/witfh.png')] bg-blend-multiply">
      <div className="bg-white/80 flex flex-col w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[35rem] min-h-[90vh] sm:min-h-[80vh] items-center justify-center px-4 sm:px-8 md:px-24 py-6 rounded-2xl gap-3 sm:gap-4">
        <Link to="/"><img src="/assets/tontrix-high-resolution-logo-transparent.png" alt="Tontrix Logo" className="w-24 sm:w-28 md:w-32" /></Link>
        <div className="flex flex-col gap-2 justify-start w-full">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-black-500">Welcome back 👋</h1>
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
          <Button type="submit">Login</Button>
        </form>
        <p className="font-medium text-sm text-black-400">
          Don't have an account?{' '}
          <Link to="/signup" className="underline text-blue-600">Sign Up</Link>
        </p>
        <div className="flex items-center w-full">
          <div className="border w-full border-black-100"></div>
          <span className="mx-2 sm:mx-4 text-black-200 text-sm">Or</span>
          <div className="border w-full border-black-100"></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-evenly w-full">
          <Link to="https://google.com" className="flex items-center justify-center gap-2 sm:gap-4 bg-white px-3 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-lg hover:bg-primary-50 cursor-pointer w-full sm:w-auto">
            <FcGoogle className="text-lg sm:text-xl" />
            <p className="font-medium text-neutral-300 text-sm sm:text-base">Google</p>
          </Link>
          <Link to="https://facebook.com" className="flex items-center justify-center gap-2 sm:gap-4 bg-white px-3 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-lg hover:bg-primary-50 cursor-pointer w-full sm:w-auto">
            <FaFacebook className="text-blue-950 text-lg sm:text-xl" />
            <p className="font-medium text-neutral-300 text-sm sm:text-base">Facebook</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../components/Navbar';
import SidebarUser from '../components/SidebarUser';
import ProfileTab from '../components/ProfileTab';
import { InputNormal } from '../components/InputStyle';
import Button from '../components/Button';
import { updateUserAction } from '../redux/reducers/users';
import { loginAction } from '../redux/reducers/auth';

function Profile() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const users = useSelector((state) => state.users.users)
  const dispatch = useDispatch()

  
  const defaultName = currentUser?.email ? currentUser.email.split('@')[0] : ''

  
  const validationSchema = yup.object({
    name: yup.string().trim().required('Full name is required.'),
    email: yup.string().trim().email('Invalid email.').required('Email is required.'),
    phone: yup.string().optional(),
    password: yup.string().optional(),
  })

  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: currentUser?.name || defaultName,
      email: currentUser?.email || '',
      phone: users.find((user) => user.id === currentUser?.id)?.phone || '',
      password: '',
    },
  })

  const [showSettings, setShowSettings] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const [error, setError] = useState('')

  
  function isEmailTaken(email, userId) {
    return users.some((user) => user.email === email.trim() && user.id !== userId)
  }

  
  function onSubmit(data) {
    if (!currentUser) {
      setError('You must be logged in to update your profile.')
      return
    }

    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone || '',
      ...(data.password && { password: btoa(data.password) }),
    }

    if (isEmailTaken(sanitizedData.email, currentUser.id)) {
      setError('Email is already registered by another user.')
      return
    }

    
    dispatch(updateUserAction({ id: currentUser.id, updatedData: sanitizedData }))
    
    dispatch(loginAction({ email: sanitizedData.email, id: currentUser.id, name: sanitizedData.name }))
    setError('')
    alert('Profile updated successfully!') // jgn lupa ganti alert
  }

  function handleSettings() {
    setShowSettings(true)
    setShowHistory(false)
  }

  function handleHistory() {
    setShowSettings(false)
    setShowHistory(true)
  }


  const bookedTickets = useSelector((state) => state.bookedTicket.bookedTicket);
  const userTickets = bookedTickets.filter((ticket) => ticket.user === currentUser?.email);

  return (
    <>
      <Navbar />
      <div className='main flex flex-row items-start gap-6 px-4 py-10 md:px-6 lg:px-20 bg-gray-200'>
        <SidebarUser />
        <div className='rightcontainer flex flex-col w-full gap-6'>
          <div className='cardprofiletab flex gap-12 bg-white px-6 pt-4 pb-0 rounded w-full items-center shadow-sm shadow-orange-50'>
            <ProfileTab variant={showSettings ? "active" : "inactive"} children='Account Settings' onClick={handleSettings} />
            <ProfileTab variant={showHistory ? "active" : "inactive"} children='Order History' onClick={handleHistory} />
          </div>

          {showSettings && (
            <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex bg-white p-6 rounded w-full items-center shadow-sm shadow-orange-50'>
                <div className='flex flex-col w-full gap-4'>
                  <div className='flex flex-col gap-2'>
                    <p className='body-2-medium text-black-500'>Detail Information</p>
                    <div className='border-b text-gray-300'></div>
                  </div>
                  <div className="flex flex-col w-full gap-4">
                    <InputNormal
                      label='Full Name'
                      type='text'
                      placeholder={users.find((user) => user.id === currentUser?.id)?.name || defaultName}
                      id='name'
                      className='border border-orange-50 outline-orange-300'
                      {...register('name')}
                    />
                    {errors.name && <div className="text-wrong-600">{errors.name.message}</div>}
                    <InputNormal
                      label='Email'
                      type='email'
                      placeholder={currentUser?.email || 'Input your email'}
                      id='email'
                      className='border border-orange-50 outline-orange-300'
                      {...register('email')}
                    />
                    {errors.email && <div className="text-wrong-600">{errors.email.message}</div>}
                    {error && <div className="text-wrong-600">{error}</div>}
                    <InputNormal
                      label='Phone Number'
                      type='number'
                      placeholder={users.find((user) => user.id === currentUser?.id)?.phone || 'Input your phone number'}
                      id='phone'
                      className='border border-orange-50 outline-orange-300'
                      {...register('phone')}
                    />
                    {errors.phone && <div className="text-wrong-600">{errors.phone.message}</div>}
                  </div>
                </div>
              </div>

              <div className='flex bg-white p-6 rounded w-full items-center shadow-sm shadow-orange-50'>
                <div className='flex flex-col w-full gap-4'>
                  <div className='flex flex-col gap-2'>
                    <p className='body-2-medium text-black-500'>Account and Privacy</p>
                    <div className='border-b text-gray-300'></div>
                  </div>
                  <div className="flex flex-col w-full gap-4">
                    <InputNormal
                      label='New Password'
                      type='password'
                      placeholder="Enter your password"
                      id='password'
                      className='border border-orange-50 outline-orange-300'
                      {...register('password')}
                    />
                    {errors.password && <div className="text-wrong-600">{errors.password.message}</div>}
                  </div>
                </div>
              </div>

              <Button variant='primary' type='submit'>Save Changes</Button>
            </form>
          )}

          {showHistory && (
            <div className='flex flex-col bg-white p-6 rounded w-full shadow-sm shadow-orange-50 gap-6'>
              {userTickets.length === 0 ? (
                <p className="text-gray-500 text-center">No order history found.</p>
              ) : (
                userTickets.map((ticket) => (
                  <div key={ticket.id} className='flex flex-col gap-4'>
                    <div className='flex justify-between w-full items-center'>
                      <div>
                        <p className='body-3-regular text-gray-400'>
                          {ticket.date} - {ticket.time}
                        </p>
                        <h1 className='headline-2-semibold'>{ticket.movie}</h1>
                        
                      </div>
                      {/* <img src='./assets/cine1large.svg' alt="Cinema Logo" className="h-12" /> */}
                       <p className='body-3-regular text-gray-500'>{ticket.cinema} - {ticket.seats.join(', ')}</p>
                    </div>
                    <div className='border-b text-gray-300 w-full'></div>
                    <div className='bg-blue-200 text-blue-700 body-2-medium px-4 py-2 rounded-md w-25 flex items-center justify-center'>
                      Paid
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Profile;
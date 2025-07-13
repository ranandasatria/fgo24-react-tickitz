import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../components/Navbar';
import SidebarUser from '../components/SidebarUser';
import ProfileTab from '../components/ProfileTab';
import { InputNormal } from '../components/InputStyle';
import Button from '../components/Button';
import { MdKeyboardArrowDown } from 'react-icons/md';
import toast from 'react-hot-toast';
import http from '../lib/http';

function Profile() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const token = useSelector((state) => state.auth.token);
  const [showSettings, setShowSettings] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showDetails, setShowDetails] = useState({});
  const [userTickets, setUserTickets] = useState([]);
  const [userData, setUserData] = useState({
    name: currentUser?.name || (currentUser?.email?.split('@')[0] || ''),
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  });

  const validationSchema = yup.object({
    name: yup.string().trim().required('Full name is required.'),
    email: yup.string().trim().email('Invalid email.').required('Email is required.'),
    phone: yup.string().optional(),
    oldPassword: yup.string().notRequired(),
    password: yup.string().min(6, 'New password must be at least 6 characters.').notRequired(),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      oldPassword: '',
      password: '',
    },
  });

  useEffect(() => {
    async function fetchUserData() {
      if (!token || !currentUser) return;
      try {
        const res = await http(token).get('/profile');
        const { full_name, email, phone_number } = res.data.results;
        const newUserData = { name: full_name, email, phone: phone_number || '' };
        setUserData(newUserData);
        reset({ ...newUserData, oldPassword: '', password: '' });
      } catch {
        toast.error('Failed to fetch user data');
      }
    }
    fetchUserData();
  }, [token, currentUser, reset]);

  useEffect(() => {
    async function fetchTickets() {
      if (!token || !currentUser) return;
      try {
        const res = await http(token).get('/transactions');
        setUserTickets(res.data.results || []);
      } catch {
        toast.error('Failed to fetch order history');
      }
    }
    if (showHistory) fetchTickets();
  }, [showHistory, token, currentUser]);

  async function onSubmit(data) {
    if (!token || !currentUser) {
      toast.error('Please log in to update profile', { style: { background: '#ef4444', color: '#fff' } });
      return;
    }

    const payload = {
      full_name: data.name.trim(),
      email: data.email.trim(),
      phone_number: data.phone || null,
      ...(data.oldPassword && data.password && { oldPassword: data.oldPassword, newPassword: data.password }),
    };

    try {
      await http(token).patch('/profile', payload);
      setUserData({ name: data.name.trim(), email: data.email.trim(), phone: data.phone || '' });
      reset({ ...data, oldPassword: '', password: '' });
      toast.success('Profile updated successfully!', { style: { background: '#4ade80', color: '#fff' } });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message, { style: { background: '#ef4444', color: '#fff' } });
    }
  }

  function handleSettings() {
    setShowSettings(true);
    setShowHistory(false);
  }

  function handleHistory() {
    setShowSettings(false);
    setShowHistory(true);
  }

  const toggleDetails = (id) => {
    setShowDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col md:flex-row items-start gap-4 px-2 md:px-4 py-4 md:py-6 bg-gray-200'>
        <SidebarUser className='w-full md:w-1/4' />
        <div className='rightcontainer flex flex-col w-full md:w-3/4 gap-4'>
          <div className='cardprofiletab flex gap-4 md:gap-8 bg-white px-2 md:px-4 pt-2 md:pt-2 pb-0 rounded w-full items-center shadow-sm shadow-primary-50'>
            <ProfileTab variant={showSettings ? 'active' : 'inactive'} children='Account Settings' onClick={handleSettings} />
            <ProfileTab variant={showHistory ? 'active' : 'inactive'} children='Order History' onClick={handleHistory} />
          </div>

          {showSettings && (
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex bg-white p-2 md:p-4 rounded w-full items-center shadow-sm shadow-primary-50'>
                <div className='flex flex-col w-full gap-2 md:gap-4'>
                  <div className='flex flex-col gap-1 md:gap-2'>
                    <p className='body-2-medium text-black-500'>Detail information</p>
                    <div className='border-b text-gray-300'></div>
                  </div>
                  <div className='flex flex-col w-full gap-2 md:gap-4'>
                    <InputNormal
                      label='Full name'
                      type='text'
                      placeholder={userData.name || 'Input your name'}
                      id='name'
                      className='border border-primary-300 outline-primary-900'
                      {...register('name')}
                    />
                    {errors.name && <div className='text-wrong-600 text-sm md:text-base'>{errors.name.message}</div>}
                    <InputNormal
                      label='Email'
                      type='email'
                      placeholder={userData.email || 'Input your email'}
                      id='email'
                      className='border border-primary-300 outline-primary-900'
                      {...register('email')}
                    />
                    {errors.email && <div className='text-wrong-600 text-sm md:text-base'>{errors.email.message}</div>}
                    <InputNormal
                      label='Phone number'
                      type='number'
                      placeholder={userData.phone || 'Input your phone number'}
                      id='phone'
                      className='border border-primary-300 outline-primary-900'
                      {...register('phone')}
                    />
                    {errors.phone && <div className='text-wrong-600 text-sm md:text-base'>{errors.phone.message}</div>}
                  </div>
                </div>
              </div>

              <div className='flex bg-white p-2 md:p-4 rounded w-full items-center shadow-sm shadow-primary-50'>
                <div className='flex flex-col w-full gap-2 md:gap-4'>
                  <div className='flex flex-col gap-1 md:gap-2'>
                    <p className='body-2-medium text-black-500'>Account and privacy</p>
                    <div className='border-b text-gray-300'></div>
                  </div>
                  <div className='flex flex-col w-full gap-2 md:gap-4'>
                    <div className='flex flex-col gap-2 md:gap-4 w-full md:flex-row'>
                      <div className='w-full md:w-1/2'>
                        <InputNormal
                          label='Old password'
                          type='password'
                          placeholder='Enter your old password'
                          id='oldPassword'
                          className='border border-primary-300 outline-primary-900 w-full'
                          {...register('oldPassword')}
                        />
                        {errors.oldPassword && <div className='text-wrong-600 text-sm md:text-base'>{errors.oldPassword.message}</div>}
                      </div>
                      <div className='w-full md:w-1/2'>
                        <InputNormal
                          label='New password'
                          type='password'
                          placeholder='Enter your new password'
                          id='password'
                          className='border border-primary-300 outline-primary-900 w-full'
                          {...register('password')}
                        />
                        {errors.password && <div className='text-wrong-600 text-sm md:text-base'>{errors.password.message}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant='primary' type='submit' className='w-full md:w-auto'>Save changes</Button>
            </form>
          )}

          {showHistory && (
            <div className='flex flex-col rounded w-full shadow-sm shadow-primary-50 gap-6 md:gap-8'>
              {userTickets.length === 0 ? (
                <p className='text-gray-500 text-center text-sm md:text-base'>No order history found.</p>
              ) : (
                userTickets.map((ticket) => (
                  <div key={ticket.transactionId}>
                    <div className='flex flex-col p-2 md:p-4 bg-gray-50 rounded-lg shadow-md'>
                      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-4'>
                        <div>
                          <p className='body-3-regular text-gray-400 text-sm md:text-base'>
                            {ticket.showDate} - {ticket.showTime}
                          </p>
                          <h1 className='headline-2-semibold text-sm md:text-base'>{ticket.movieTitle}</h1>
                        </div>
                        <p className='body-3-regular text-gray-500 text-sm md:text-base'>{ticket.cinema} - {ticket.seats.join(', ')}</p>
                      </div>
                      <div className='border-b my-2 md:my-4 border-gray-200'></div>
                      <div className='flex justify-between items-center'>
                        <div className='bg-blue-200 text-blue-700 body-2-medium px-2 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base'>
                          Paid
                        </div>
                        <div className='flex items-center gap-1 md:gap-2 text-sm md:text-base cursor-pointer' onClick={() => toggleDetails(ticket.transactionId)}>
                          Show details
                          <MdKeyboardArrowDown />
                        </div>
                      </div>
                      {showDetails[ticket.transactionId] && (
                        <div className='flex flex-col p-4 mt-1 w-full'>
                          <div className='flex flex-col items-start'>
                            <div className='flex flex-col md:flex-row w-full mt-2'>
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg"
                                alt="QR Code"
                                className='w-24 h-24 mb-2 md:mb-0'
                              />
                              <div className='flex flex-col ml-0 md:ml-4 w-full md:w-auto'>
                                <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                                  <div className='flex flex-col'>
                                    <p className='text-gray-600 text-xs'>Seats</p>
                                    <p className='font-semibold text-sm'>{ticket.seats.join(', ')}</p>
                                  </div>
                                  <div className='flex flex-col'>
                                    <p className='text-gray-600 text-xs'>Count</p>
                                    <p className='font-semibold text-sm'>{ticket.seats.length} pcs</p>
                                  </div>
                                  <div className='flex flex-col'>
                                    <p className='text-gray-600 text-xs'>Total</p>
                                    <p className='font-semibold text-sm'>${ticket.totalPrice.toFixed(2)}</p>
                                  </div>
                                  <div className='flex flex-col'>
                                    <p className='text-gray-600 text-xs'>Category</p>
                                    <p className='font-semibold text-sm'>PG-13</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import Navbar from '../components/Navbar';
// import SidebarUser from '../components/SidebarUser';
// import ProfileTab from '../components/ProfileTab';
// import { InputNormal } from '../components/InputStyle';
// import Button from '../components/Button';
// import { updateUserAction } from '../redux/reducers/users';
// import { loginAction } from '../redux/reducers/auth';
// import { MdKeyboardArrowDown } from 'react-icons/md';
// import toast from 'react-hot-toast';

// function Profile() {
//   const currentUser = useSelector((state) => state.auth.currentUser)
//   const users = useSelector((state) => state.users.users)
//   const dispatch = useDispatch()


//   const defaultName = currentUser?.email ? currentUser.email.split('@')[0] : ''

//   const validationSchema = yup.object({
//     name: yup.string().trim().required('Full name is required.'),
//     email: yup.string().trim().email('Invalid email.').required('Email is required.'),
//     phone: yup.string().optional(),
//     oldPassword: yup.string().notRequired(),
//     password: yup.string().notRequired(),
//   })

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       name: currentUser?.name || defaultName,
//       email: currentUser?.email || '',
//       phone: users.find((user) => user.id === currentUser?.id)?.phone || '',
//       oldPassword: '',
//       password: '',
//     },
//   })

//   const [showSettings, setShowSettings] = useState(true)
//   const [showHistory, setShowHistory] = useState(false)
//   const [passwordError, setPasswordError] = useState('')
//   const [emailError, setEmailError] = useState('')

//   const [showDetails, setShowDetails] = useState({})

//   function isEmailTaken(email, userId) {
//     return users.some((user) => user.email === email.trim() && user.id !== userId)
//   }

//   function onSubmit(data) {
//     const userData = users.find((user) => user.id === currentUser.id)
//     const storedPassword = userData?.password

//     if (data.password || data.oldPassword) {
//       if (!data.oldPassword) {
//         setPasswordError('Old password is required to change password.')
//         return
//       }
//       if (!data.password) {
//         setPasswordError('New password is required.')
//         return
//       }
//       if (data.password.length < 6) {
//         setPasswordError('New password must be at least 6 characters.')
//         return
//       }
//       if (storedPassword !== btoa(data.oldPassword)) {
//         setPasswordError('Old password is incorrect.')
//         return
//       }
//     }

//     const sanitizedData = {
//       name: data.name.trim(),
//       email: data.email.trim(),
//       phone: data.phone || '',
//       ...(data.password && { password: btoa(data.password) }),
//     }

//     if (isEmailTaken(sanitizedData.email, currentUser.id)) {
//       setEmailError('Email is already registered by another user.')
//       return
//     }

//     dispatch(updateUserAction({ id: currentUser.id, updatedData: sanitizedData }))
//     dispatch(loginAction({ email: sanitizedData.email, id: currentUser.id, name: sanitizedData.name }))
//     setPasswordError('')
//     setEmailError('')
//     toast.success('Profile updated successfully!', {
//       style: { background: '#4ade80', color: '#fff' },
//     })
//   }

//   function handleSettings() {
//     setShowSettings(true)
//     setShowHistory(false)
//   }

//   function handleHistory() {
//     setShowSettings(false)
//     setShowHistory(true)
//   }

//   const bookedTickets = useSelector((state) => state.bookedTicket.bookedTicket)
//   const userTickets = bookedTickets.filter((ticket) => ticket.user === currentUser?.email)

//   const toggleDetails = (id) => {
//     setShowDetails(prev => ({ ...prev, [id]: !prev[id] }))
//   }

//   return (
//     <>
//       <Navbar />
//       <div className='flex flex-col md:flex-row items-start gap-4 px-2 md:px-4 py-4 md:py-6 bg-gray-200'>
//         <SidebarUser className='w-full md:w-1/4' />
//         <div className='rightcontainer flex flex-col w-full md:w-3/4 gap-4'>
//           <div className='cardprofiletab flex gap-4 md:gap-8 bg-white px-2 md:px-4 pt-2 md:pt-2 pb-0 rounded w-full items-center shadow-sm shadow-primary-50'>
//             <ProfileTab variant={showSettings ? 'active' : 'inactive'} children='Account Settings' onClick={handleSettings} />
//             <ProfileTab variant={showHistory ? 'active' : 'inactive'} children='Order History' onClick={handleHistory} />
//           </div>

//           {showSettings && (
//             <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
//               <div className='flex bg-white p-2 md:p-4 rounded w-full items-center shadow-sm shadow-primary-50'>
//                 <div className='flex flex-col w-full gap-2 md:gap-4'>
//                   <div className='flex flex-col gap-1 md:gap-2'>
//                     <p className='body-2-medium text-black-500'>Detail information</p>
//                     <div className='border-b text-gray-300'></div>
//                   </div>
//                   <div className='flex flex-col w-full gap-2 md:gap-4'>
//                     <InputNormal
//                       label='Full name'
//                       type='text'
//                       placeholder={users.find((user) => user.id === currentUser?.id)?.name || defaultName}
//                       id='name'
//                       className='border border-primary-300 outline-primary-900'
//                       {...register('name')}
//                     />
//                     {errors.name && <div className='text-wrong-600 text-sm md:text-base'>{errors.name.message}</div>}
//                     <InputNormal
//                       label='Email'
//                       type='email'
//                       placeholder={currentUser?.email || 'Input your email'}
//                       id='email'
//                       className='border border-primary-300 outline-primary-900'
//                       {...register('email')}
//                     />
//                     {errors.email && <div className='text-wrong-600 text-sm md:text-base'>{errors.email.message}</div>}
//                     {emailError && <div className='text-wrong-600 text-sm md:text-base'>{emailError}</div>}
//                     <InputNormal
//                       label='Phone number'
//                       type='number'
//                       placeholder={users.find((user) => user.id === currentUser?.id)?.phone || 'Input your phone number'}
//                       id='phone'
//                       className='border border-primary-300 outline-primary-900'
//                       {...register('phone')}
//                     />
//                     {errors.phone && <div className='text-wrong-600 text-sm md:text-base'>{errors.phone.message}</div>}
//                   </div>
//                 </div>
//               </div>

//               <div className='flex bg-white p-2 md:p-4 rounded w-full items-center shadow-sm shadow-primary-50'>
//                 <div className='flex flex-col w-full gap-2 md:gap-4'>
//                   <div className='flex flex-col gap-1 md:gap-2'>
//                     <p className='body-2-medium text-black-500'>Account and privacy</p>
//                     <div className='border-b text-gray-300'></div>
//                   </div>
//                   <div className='flex flex-col w-full gap-2 md:gap-4'>
//                     <div className='flex flex-col gap-2 md:gap-4 w-full md:flex-row'>
//                       <div className='w-full md:w-1/2'>
//                         <InputNormal
//                           label='Old password'
//                           type='password'
//                           placeholder='Enter your old password'
//                           id='oldPassword'
//                           className='border border-primary-300 outline-primary-900 w-full'
//                           {...register('oldPassword')}
//                         />
//                         {errors.oldPassword && <div className='text-wrong-600 text-sm md:text-base'>{errors.oldPassword.message}</div>}
//                         {passwordError && <div className='text-wrong-600 text-sm md:text-base'>{passwordError}</div>}
//                       </div>
//                       <div className='w-full md:w-1/2'>
//                         <InputNormal
//                           label='New password'
//                           type='password'
//                           placeholder='Enter your new password'
//                           id='password'
//                           className='border border-primary-300 outline-primary-900 w-full'
//                           {...register('password')}
//                         />
//                         {errors.password && <div className='text-wrong-600 text-sm md:text-base'>{errors.password.message}</div>}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Button variant='primary' type='submit' className='w-full md:w-auto'>Save changes</Button>
//             </form>
//           )}

//           {showHistory && (
//             <div className='flex flex-col rounded w-full shadow-sm shadow-primary-50 gap-6 md:gap-8'>
//               {userTickets.length === 0 ? (
//                 <p className='text-gray-500 text-center text-sm md:text-base'>No order history found.</p>
//               ) : (
//                 userTickets.map((ticket) => (
//                   <div key={ticket.id}>
//                     <div className='flex flex-col p-2 md:p-4 bg-gray-50 rounded-lg shadow-md'>
//                       <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-4'>
//                         <div>
//                           <p className='body-3-regular text-gray-400 text-sm md:text-base'>
//                             {ticket.date} - {ticket.time}
//                           </p>
//                           <h1 className='headline-2-semibold text-sm md:text-base'>{ticket.movie}</h1>
//                         </div>
//                         <p className='body-3-regular text-gray-500 text-sm md:text-base'>{ticket.cinema} - {ticket.seats.join(', ')}</p>
//                       </div>
//                       <div className='border-b my-2 md:my-4 border-gray-200'></div>
//                       <div className='flex justify-between items-center'>
//                         <div className='bg-blue-200 text-blue-700 body-2-medium px-2 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base'>
//                           Paid
//                         </div>
//                         <div className='flex items-center gap-1 md:gap-2 text-sm md:text-base cursor-pointer' onClick={() => toggleDetails(ticket.id)}>
//                           Show details
//                           <MdKeyboardArrowDown />
//                         </div>
//                       </div>
//                       {showDetails[ticket.id] && (
//                         <div className='flex flex-col p-4 mt-1 w-full'>
//                           <div className='flex flex-col items-start'>
//                             <div className='flex flex-col md:flex-row w-full mt-2'>
//                               <img
//                                 src="https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg"
//                                 alt="QR Code"
//                                 className='w-24 h-24 mb-2 md:mb-0'
//                               />
//                               <div className='flex flex-col ml-0 md:ml-4 w-full md:w-auto'>
//                                 <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
//                                   <div className='flex flex-col'>
//                                     <p className='text-gray-600 text-xs'>Seats</p>
//                                     <p className='font-semibold text-sm'>{ticket.seats.join(', ')}</p>
//                                   </div>
//                                   <div className='flex flex-col'>
//                                     <p className='text-gray-600 text-xs'>Count</p>
//                                     <p className='font-semibold text-sm'>{ticket.seats.length} pcs</p>
//                                   </div>
//                                   <div className='flex flex-col'>
//                                     <p className='text-gray-600 text-xs'>Total</p>
//                                     <p className='font-semibold text-sm'>${ticket.total.toFixed(2)}</p>
//                                   </div>
//                                   <div className='flex flex-col'>
//                                     <p className='text-gray-600 text-xs'>Category</p>
//                                     <p className='font-semibold text-sm'>PG-13</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Profile;
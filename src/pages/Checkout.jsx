import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import IconRound from '../components/Icon';
import { InputNormal } from '../components/InputStyle';
import InputRadio from '../components/InputRadio';
import Button from '../components/Button';

function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { movie, date, time, location: selectedLocation, cinema, seats, total } = location.state || {}
  const currentUser = useSelector((state) => state.auth.currentUser)

  const validationSchema = yup.object({
    paymentMethod: yup.string().required('Please select a payment method'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      paymentMethod: '',
    },
  })

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
    navigate('/ticket', {
      state: {
        movie,
        date,
        time,
        location: selectedLocation,
        cinema,
        seats,
        total,
        user: currentUser,
        paymentMethod: data.paymentMethod,
      },
    })
  }

  const displayMovie = movie || { title: 'Final Destination' }
  const displayDateTime = `${date || 'Tuesday, 07 July 2020'} at ${time || '02:00 PM'}`
  const displayCinema = cinema || 'CineOne21 Cinema'
  const displaySeats = seats ? seats.join(', ') : 'None'
  const displayTotal = total ? `$${total.toFixed(2)}` : '$0.00'
  const displayUser = currentUser || { email: 'guest@example.com' }
  const username = displayUser.email.split('@')[0]

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center justify-center my-8">
          <div className="flex flex-col justify-center items-center gap-2">
            <IconRound variant="primary">1</IconRound>
            <p className="body-3-medium text-black-600">Dates and Time</p>
          </div>
          <div className="w-20 border border-dashed border-neutral-500"></div>
          <div className="flex flex-col justify-center items-center gap-2">
            <IconRound variant="primary">2</IconRound>
            <p className="body-3-medium text-black-600">Seat</p>
          </div>
          <div className="w-20 border border-dashed border-neutral-500"></div>
          <div className="flex flex-col justify-center items-center gap-2">
            <IconRound variant="secondary">3</IconRound>
            <p className="body-3-medium text-neutral-400">Payment</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-12 px-4 md:px-8 mb-12 max-w-7xl mx-auto">
          <div className="flex-1 border rounded-xl shadow-lg p-6 bg-white">
            <h3 className="text-2xl font-bold text-black-600 mb-6">Payment Information</h3>
            <div className="flex flex-col gap-4">
              <InputNormal
                label="Date & Time"
                id="dateTime"
                value={displayDateTime}
                readOnly
                className="bg-gray-100 font-semibold"
              />
              <InputNormal
                label="Movie Title"
                id="movieTitle"
                value={displayMovie.title}
                readOnly
                className="bg-gray-100 font-semibold"
              />
              <InputNormal
                label="Cinema Name"
                id="cinema"
                value={displayCinema}
                readOnly
                className="bg-gray-100 font-semibold"
              />
              <InputNormal
                label="Seats"
                id="seats"
                value={displaySeats}
                readOnly
                className="bg-gray-100 font-semibold"
              />
              <InputNormal
                label="Total Payment"
                id="totalPayment"
                value={displayTotal}
                readOnly
                className="bg-gray-100 font-semibold"
              />
            </div>
            <h3 className="text-2xl font-bold text-black-600 mt-8 mb-6">Personal Information</h3>
            <div className="flex flex-col gap-4">
              <InputNormal
                label="Full Name"
                id="fullName"
                value={username}
                readOnly
                className="bg-gray-100 font-semibold"
              />
              <InputNormal
                label="Email Address"
                id="email"
                value={displayUser.email}
                readOnly
                className="bg-gray-100 font-semibold"
              />
            </div>
            <h3 className="text-2xl font-bold text-black-600 mt-8 mb-6">Payment Method</h3>
            <div className="flex flex-wrap gap-4">
              <InputRadio
                htmlFor="gopay"
                src="/assets/gopay.svg"
                id="gopay"
                value="gopay"
                name="paymentMethod"
                {...register('paymentMethod')}
              />
              <InputRadio
                htmlFor="bca"
                src="/assets/bca.svg"
                id="bca"
                value="bca"
                name="paymentMethod"
                {...register('paymentMethod')}
              />
            </div>
            {errors.paymentMethod && <div className="text-wrong-600 mt-2">{errors.paymentMethod.message}</div>}
            <Button type="submit" variant="primary" className="w-full mt-8 cursor-pointer">
              Pay Now
            </Button>
          </div>
          
        </div>
      </form>
      <FooterSection />
    </>
  )
}

export default Checkout;
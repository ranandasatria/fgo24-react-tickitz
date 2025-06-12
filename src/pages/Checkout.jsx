import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import IconRound from '../components/Icon';
import { InputNormal } from '../components/InputStyle';
import InputRadio from '../components/InputRadio';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { bookedTicketAction } from '../redux/reducers/bookedTicket';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movie, date, time, selectedLocation, cinema, seats, total } = location.state || {};
  const currentUser = useSelector((state) => state.auth.currentUser);

  const validationSchema = yup.object({
    paymentMethod: yup.string().required('Please select a payment method'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      paymentMethod: '',
    },
  });

  const [showPopup, setShowPopup] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);

  const onSubmit = (data) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const newTicketId = uuidv4();
    const ticketData = {
      id: newTicketId,
      movie: movie?.title || 'Unknown Movie',
      date: date || 'Unknown Date',
      time: time || 'Unknown Time',
      selectedLocation: selectedLocation || 'Unknown Location',
      cinema: cinema || 'Unknown Cinema',
      seats: seats || [],
      total: total || 0,
      user: currentUser.email,
      paymentMethod: data.paymentMethod,
    };

    dispatch(bookedTicketAction(ticketData));
    setTicketId(newTicketId);
    setShowPopup(true);
  };

  const displayMovie = movie || { title: 'Final Destination' };
  const displayDateTime = `${date || 'Tuesday, 07 July 2020'} at ${time || '02:00 PM'}`;
  const displayCinema = cinema || 'CineOne21 Cinema';
  const displaySeats = seats ? seats.join(', ') : 'None';
  const displayTotal = total ? `$${total.toFixed(2)}` : '$0.00';
  const displayUser = currentUser || { email: 'guest@example.com' };
  const username = displayUser.email.split('@')[0];

  const ticketTime = new Date(); 
  const dueTime = new Date(ticketTime.getTime() + 60 * 60 * 1000);

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center justify-center my-8 px-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <IconRound variant="done">✓</IconRound>
            <p className="body-3-medium text-black-600">Dates & time</p>
          </div>
          <div className="w-12 sm:w-20 border border-dashed border-neutral-500" />
          <div className="flex flex-col justify-center items-center gap-2">
            <IconRound variant="done">✓</IconRound>
            <p className="body-3-medium text-black-600">Seat</p>
          </div>
          <div className="w-12 sm:w-20 border border-dashed border-neutral-500" />
          <div className="flex flex-col justify-center items-center gap-2">
            <IconRound variant="secondary">3</IconRound>
            <p className="body-3-medium text-neutral-400">Payment</p>
          </div>
        </div>
        <div className="flex justify-center gap-6 px-4 sm:px-8 mb-12">
          <div className="w-full sm:w-3/4 border rounded-xl shadow p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-black-600 mb-2 sm:mb-4 ">Payment information</h3>
            <div className="flex flex-col gap-3">
              <InputNormal label="Movie title" id="movieTitle" value={displayMovie.title} readOnly className="bg-gray-100 font-semibold pl-0 sm:pl-0 pt-0 sm:pt-0 " />
              <InputNormal label="Date & time" id="dateTime" value={displayDateTime} readOnly className="bg-gray-100 font-semibold pl-0 sm:pl-0 pt-0 sm:pt-0 " />
              <InputNormal label="Cinema" id="cinema" value={displayCinema} readOnly className="bg-gray-100 font-semibold pl-0 sm:pl-0 pt-0 sm:pt-0 " />
              <InputNormal label="Seats" id="seats" value={displaySeats} readOnly className="bg-gray-100 font-semibold pl-0 sm:pl-0 pt-0 sm:pt-0 " />
              <InputNormal label="Total payment" id="totalPayment" value={displayTotal} readOnly className="bg-gray-100 font-semibold pl-0 sm:pl-0 pt-0 sm:pt-0 " />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-black-600 mt-4 sm:mt-6 mb-2 sm:mb-4 ">Personal information</h3>
            <div className="flex flex-col gap-2 sm:gap-3">
              <InputNormal label="Full name" id="fullName" value={username} readOnly className="bg-gray-100 font-semibold pl-0 sm:pl-0 pt-0 sm:pt-0 " />
              <InputNormal label="Email address" id="email" value={displayUser.email} readOnly className="bg-gray-100 font-semibold pl-0 sm:pl-0 pt-0 sm:pt-0 " />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-black-600 mt-4 sm:mt-6 mb-2 sm:mb-4 ">Payment method</h3>
            <div className="flex  gap-2 sm:gap-3 ">
              <InputRadio htmlFor="gopay" src="/assets/gopay.svg" id="gopay" value="gopay" name="paymentMethod" {...register('paymentMethod')} />
              <InputRadio htmlFor="bca" src="/assets/bca.svg" id="bca" value="bca" name="paymentMethod" {...register('paymentMethod')} />
            </div>
            {errors.paymentMethod && <div className="text-wrong-600 mt-1 sm:mt-2 ">{errors.paymentMethod.message}</div>}
            <Button type="submit" variant="primary" className="w-full mt-2 sm:mt-4 text-xs sm:text-sm py-1 sm:py-2">Pay now</Button>
          </div>
        </div>
      </form>
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowPopup(false)}>
          <div className="bg-white p-4 rounded-lg shadow-lg w-96 text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg sm:text-xl font-bold mb-4">Payment info</h2>
            <p className="mb-2">Virtual account: <span className="font-semibold">12321328913829724</span></p>
            <p className="mb-2">Total payment: <span className="font-semibold">{displayTotal}</span></p>
            <p className="mb-4 text-sm">Pay this payment bill before it is due, on {dueTime.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Jakarta' })}. If the bill has not been paid by the specified time, it will be forfeited.</p>
            <div className="flex justify-center gap-2">
              <Button variant="secondary" className="text-xs sm:text-sm py-1 sm:py-2" onClick={() => setShowPopup(false)}>Pay later</Button>
              <Button variant="primary" className="text-xs sm:text-sm py-1 sm:py-2" onClick={() => { setShowPopup(false); toast.success('Ticket booked successfully!', { style: { background: '#4ade80', color: '#fff' } }); navigate('/ticket', { state: { ticketId } }); }}>Check payment</Button>
            </div>
          </div>
        </div>
      )}
      <FooterSection />
    </>
  );
}

export default Checkout;
import React from 'react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import IconRound from '../components/Icon';
import InputStyle from '../components/InputStyle';
import InputNormal from '../components/InputStyle';
import InputRadio from '../components/InputRadio';

function Checkout() {

  const dummyData = {
    dateTime: 'Tuesday, 07 July 2020 at 02:00 PM',
    movieTitle: 'Final Destination',
    cinema: 'CineOne21 Cinema',
    numberOfTickets: '3 pieces',
    totalPayment: '$30.00',
    fullName: 'Jones El Rodriguez',
    email: 'jonesrodr123@gmail.com',
    phone: '+62 (814)4568721',
  };

  return (
    <>
      <Navbar />
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

      <div className="flex flex-col lg:flex-row justify-between gap-8 px-8 mb-12">
       
        <div className="flex-1 border rounded-xl shadow p-6">
          <h3 className="headline-2-bold text-black-500 mb-4">Payment Information</h3>
          <div className="flex flex-col gap-6">
            <InputStyle
              label="Date & Time"
              id="dateTime"
              placeholder={dummyData.dateTime}
              showChevron={false}
              disabled
            />
            <InputStyle
              label="Movie Title"
              id="movieTitle"
              placeholder={dummyData.movieTitle}
              showChevron={false}
              disabled
            />
            <InputStyle
              label="Cinema Name"
              id="cinema"
              placeholder={dummyData.cinema}
              showChevron={false}
              disabled
            />
            <InputStyle
              label="Number of Tickets"
              id="numberOfTickets"
              placeholder={dummyData.numberOfTickets}
              showChevron={false}
              disabled
            />
            <InputStyle
              label="Total Payment"
              id="totalPayment"
              placeholder={dummyData.totalPayment}
              showChevron={false}
              disabled
            />
          </div>

          <h3 className="headline-2-bold text-black-500 mt-6 mb-4">Personal Information</h3>
          <div className="flex flex-col gap-6">
            <InputNormal
              label="Full Name"
              id="fullName"
              value={dummyData.fullName}
              readOnly
            />
            <InputNormal
              label="Email Address"
              id="email"
              value={dummyData.email}
              readOnly
            />
            <InputNormal
              label="Phone Number"
              id="phone"
              value={dummyData.phone}
              readOnly
            />
          </div>

          <h3 className="headline-2-bold text-black-500 mt-6 mb-4">Payment Method</h3>
          <div className="flex flex-col gap-4">
            <InputRadio
              htmlFor="creditCard"
              src="" 
              id="creditCard"
              value="creditCard"
              name="paymentMethod"
              checked={true}
              onChange={() => {}}
              className=".opacity-50"
            />
            <InputRadio
              htmlFor="bankTransfer"
              src="" 
              id="bankTransfer"
              value="bankTransfer"
              name="paymentMethod"
              checked={false}
              onChange={() => {}}
              className=".opacity-50"
            />
            <InputRadio
              htmlFor="eWallet"
              src="/assets/e-wallet.png" 
              id="eWallet"
              value="eWallet"
              name="paymentMethod"
              checked={false}
              onChange={() => {}}
              className=".opacity-50"
            />
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}

export default Checkout;
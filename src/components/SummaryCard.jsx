import React from 'react';
import Button from './Button';

const SummaryCard = ({ cinema, movieTitle, date, time, ticketPrice, seats, total }) => {
  return (
    <div className="w-full lg:w-80 border rounded-xl shadow p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-2 text-blue-600">{cinema}</h2>
        <p className="text-sm text-neutral-700 mb-2">{cinema} Cinema</p>

        <div className="text-sm text-neutral-600 mb-1">
          Movie selected: <span className="font-semibold text-black">{movieTitle}</span>
        </div>
        <div className="text-sm text-neutral-600 mb-1">
          {date} <span className="float-right">{time}</span>
        </div>
        <div className="text-sm text-neutral-600 mb-1">
          One ticket price <span className="float-right">${ticketPrice}</span>
        </div>
        <div className="text-sm text-neutral-600 mb-1">
          Seat chosen <span className="float-right">{seats.length > 0 ? seats.join(', ') : 'None'}</span>
        </div>
        <div className="text-md font-bold mt-4">
          Total Payment <span className="float-right text-blue-600">${total}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
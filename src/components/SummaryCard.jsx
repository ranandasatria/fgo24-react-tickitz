import React from 'react';

const SummaryCard = ({ cinema, movieTitle, selectedLocation, date, time, ticketPrice, seats, total }) => {
  return (
    <div className="w-full rounded-xl flex flex-col justify-between">
      <div>
        <div className="text-sm text-neutral-600 mb-1">
          Movie: <span className="font-semibold text-black float-right">{movieTitle}</span>
        </div>
        <div className="text-sm text-neutral-600 mb-1">
          Location: <span className="font-semibold text-black float-right">{cinema}, {selectedLocation}</span>
        </div>
        <div className="text-sm text-neutral-600 mb-1">
          Date: <span className="font-semibold text-black float-right">{date}</span>
        </div>
        <div className="text-sm text-neutral-600 mb-1">
          Time: <span className="font-semibold text-black float-right">{time}</span>
        </div>
        <div className="text-sm text-neutral-600 mb-1">
          One ticket price <span className="font-semibold text-black float-right">${ticketPrice}</span>
        </div>
        <div className="text-sm text-neutral-600 mb-1">
          Seat chosen <span className="font-semibold text-black float-right">{seats.length > 0 ? seats.join(', ') : 'None'}</span>
        </div>
        <div className="text-md font-bold mt-4">
          Total payment <span className="float-right text-blue-600">${total}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;

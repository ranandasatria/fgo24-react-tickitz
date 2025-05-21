import React from 'react';

const SeatGrid = ({ selectedSeats, onSeatToggle }) => {

  const soldSeats = ['A1', 'A2', 'B1', 'B2'];

  const seats = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 1; col <= 14; col++) {
      const seat = String.fromCharCode(65 + row) + col; 
      seats.push(seat);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-neutral-500">Screen</p>
      <div className="grid grid-cols-14 gap-1">
        {seats.map((key) => {
          const isSold = soldSeats.includes(key)  
          const isSelected = selectedSeats.includes(key)  

          let bg = 'bg-neutral-200'  
          if (isSold) bg = 'bg-neutral-500' 
          else if (isSelected) bg = 'bg-blue-500' 

          return (
            <label key={key} className="relative">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => !isSold && onSeatToggle(key)}
                disabled={isSold}
                className="absolute opacity-0"
              />
              <div
                className={`w-5 h-5 ${bg} rounded-sm transition-all duration-200 ${
                  !isSold ? 'hover:scale-110 hover:border hover:border-blue-300' : ''
                }`}
                title={key}
              />
            </label>
          ) 
        })}
      </div>
      <div className="flex gap-6 mt-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-neutral-200 rounded-sm" />
          Available
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-500 rounded-sm" />
          Selected
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-neutral-500 rounded-sm" />
          Sold
        </div>
      </div>
    </div>
  ) 
};

export default SeatGrid;
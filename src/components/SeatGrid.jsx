import React from 'react';

const SeatGrid = ({ selectedSeats, onSeatToggle }) => {
  const rows = 6;
  const cols = 14;
  const soldSeats = ['A1', 'A2', 'B1', 'B2'];

  const seats = [];
  for (let row = 0; row < rows; row++) {
    const rowLabel = String.fromCharCode(65 + row);
    const rowSeats = [];
    for (let col = 1; col <= cols; col++) {
      const seat = rowLabel + col;
      rowSeats.push(seat);
    }
    seats.push(rowSeats);
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full px-2">
      {/* Screen */}
      <p className="font-semibold text-sm sm:text-base text-neutral-500">Screen</p>

      {/* Scroll container */}
      <div className="w-full overflow-x-auto">
        {/* Seat grid wrapper centered */}
        <div className="min-w-max mx-auto flex flex-col items-center">
          {/* Seat rows */}
          {seats.map((rowSeats, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-1 mb-1">
              {/* Row label */}
              <div className="w-4 text-right text-xs sm:text-sm text-neutral-500 mr-1">
                {String.fromCharCode(65 + rowIndex)}
              </div>

              {/* Seats */}
              {rowSeats.map((seat, colIndex) => {
                const isSold = soldSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                let bg = 'bg-neutral-200';
                if (isSold) bg = 'bg-neutral-500';
                else if (isSelected) bg = 'bg-blue-500';

                return (
                  <label key={seat} className="relative">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => !isSold && onSeatToggle(seat)}
                      disabled={isSold}
                      className="absolute opacity-0"
                    />
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${bg} rounded-sm transition-all duration-200 ${
                        !isSold ? 'hover:scale-110 hover:border hover:border-blue-300' : ''
                      } ${colIndex === 6 ? 'mr-4' : ''}`} // spacer tengah
                      title={seat}
                    />
                  </label>
                );
              })}
            </div>
          ))}

          {/* Column numbers */}
          <div className="flex items-center gap-1 mt-1">
            <div className="w-4 mr-1" /> {/* spacer supaya sejajar dengan row label */}
            {[...Array(cols)].map((_, colIndex) => (
              <div
                key={colIndex}
                className={`w-4 sm:w-5 md:w-6 text-center text-xs sm:text-sm text-neutral-500 ${
                  colIndex === 6 ? 'mr-4' : ''
                }`}
              >
                {colIndex + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 text-sm sm:text-base justify-center">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-neutral-200 rounded-sm" />
          Available
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-sm" />
          Selected
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-neutral-500 rounded-sm" />
          Sold
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;

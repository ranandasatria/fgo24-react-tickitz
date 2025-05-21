import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import IconRound from '../components/Icon';
import MovieCard from '../components/MovieInfoCard';
import SeatGrid from '../components/SeatGrid';
import SummaryCard from '../components/SummaryCard';

function BuyTicket() {

  const dummyMovie = {
    title: 'Final Destination',
    poster_path: '/assets/finaldestination.png',
    genre_ids: [27, 53]
  };

  const dummyGenres = [
    { id: 27, name: 'Horror' },
    { id: 53, name: 'Thriller' },
  ]

  
  const [selectedSeats, setSelectedSeats] = useState([])

 
  const handleSeatToggle = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
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
          <IconRound variant="secondary">2</IconRound>
          <p className="body-3-medium text-neutral-400">Seat</p>
        </div>
        <div className="w-20 border border-dashed border-neutral-500"></div>
        <div className="flex flex-col justify-center items-center gap-2">
          <IconRound variant="secondary">3</IconRound>
          <p className="body-3-medium text-neutral-400">Payment</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-8 px-8 mb-12">
      
        <div className="flex-1 border rounded-xl shadow p-6">
          <MovieCard
            movie={dummyMovie}
            genres={dummyGenres}
            time="11:16 PM"
          />
          <h3 className="font-semibold mb-4">Choose Your Seat</h3>
          <SeatGrid
            selectedSeats={selectedSeats}
            onSeatToggle={handleSeatToggle}
          />
        </div>

       
        <SummaryCard
          cinema="CineOne21"
          movieTitle={dummyMovie.title}
          date="Wednesday, 21 May, 2025"
          time="11:16 PM"
          ticketPrice={10}
          seats={selectedSeats}
          total={selectedSeats.length * 10}
        />
      </div>

      <FooterSection />
    </>
  );
}

export default BuyTicket;
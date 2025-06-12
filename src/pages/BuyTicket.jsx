import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import IconRound from '../components/Icon';
import MovieCard from '../components/MovieInfoCard';
import SeatGrid from '../components/SeatGrid';
import SummaryCard from '../components/SummaryCard';

function BuyTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, genres, date, time, location: selectedLocation, cinema } = location.state || {};
  const currentUser = useSelector((state) => state.auth.currentUser);

  const fallbackMovie = {
    title: 'Final Destination',
    poster_path: '/assets/finaldestination.png',
    genre_ids: [27, 53],
  };

  const fallbackGenres = [
    { id: 27, name: 'Horror' },
    { id: 53, name: 'Thriller' },
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatToggle = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate('/checkout', {
      state: {
        movie: displayMovie,
        genres: displayGenres,
        date,
        time,
        selectedLocation,
        cinema,
        seats: selectedSeats,
        total: selectedSeats.length * 10,
      },
    });
  };

  const displayMovie = movie || fallbackMovie;

  const displayMovieWithPoster = {
    ...displayMovie,
    title: displayMovie.title || displayMovie.movieTitle,
    poster_path:
      displayMovie.poster_path?.startsWith('/assets') || displayMovie.poster_path?.startsWith('data:image/')
        ? displayMovie.poster_path
        : displayMovie.poster_path
        ? `https://image.tmdb.org/t/p/original${displayMovie.poster_path}`
        : '/assets/imageplaceholder.png',
  };

  const displayGenres = genres || fallbackGenres;
  const displayLocation = selectedLocation;
  const displayDate = date || 'Wednesday, 21 May, 2025';
  const displayTime = time || '11:35 PM';
  const displayCinema = cinema || 'CineOne21';

  return (
    <>
      <Navbar />
      <div className="flex gap-4 items-center justify-center my-8 px-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <IconRound variant="done">✓</IconRound>
          <p className="body-3-medium text-black-600">Dates & time</p>
        </div>
        <div className="w-12 sm:w-20 border border-dashed border-neutral-500" />
        <div className="flex flex-col justify-center items-center gap-2">
          <IconRound variant="secondary">2</IconRound>
          <p className="body-3-medium text-black-400">Seat</p>
        </div>
        <div className="w-12 sm:w-20 border border-dashed border-neutral-500" />
        <div className="flex flex-col justify-center items-center gap-2">
          <IconRound variant="secondary">3</IconRound>
          <p className="body-3-medium text-neutral-400">Payment</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6 px-4 sm:px-8 mb-12">
        <div className="w-full lg:w-2/3 border rounded-xl shadow p-4 sm:p-6">
          <MovieCard movie={displayMovieWithPoster} genres={displayGenres} time={displayTime} />
          <h3 className="font-semibold mb-4 mt-6">Choose your seat</h3>
          <SeatGrid selectedSeats={selectedSeats} onSeatToggle={handleSeatToggle} />
        </div>
        <div className="w-full lg:w-1/3 border rounded-xl shadow p-4 sm:p-6">
          <SummaryCard
            cinema={displayCinema}
            movieTitle={displayMovieWithPoster.title}
            selectedLocation={displayLocation}
            date={displayDate}
            time={displayTime}
            ticketPrice={10}
            seats={selectedSeats}
            total={selectedSeats.length * 10}
          />
          <button
            onClick={handleCheckout}
            disabled={selectedSeats.length === 0}
            className={`body-2-bold flex items-center justify-center px-5 py-3 rounded-2xl bg-primary-500 text-white w-full mt-4 ${
              selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-600'
            }`}
          >
            Checkout now
          </button>
        </div>
      </div>
      <FooterSection />
    </>
  );
}

export default BuyTicket;

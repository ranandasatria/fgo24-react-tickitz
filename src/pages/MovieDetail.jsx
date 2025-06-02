import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import InputRadio from '../components/InputRadio';
import FooterSection from '../components/FooterSection';
import FetchMovieAPI from '../components/FetchMovie';

function MovieDetail() {
  const { id } = useParams()
  const { genres, fetchMovieDetails } = FetchMovieAPI()
  const [movie, setMovie] = useState(null)
  const [selectedCinema, setSelectedCinema] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  useEffect(() => {
    async function loadMovieDetails() {
      const details = await fetchMovieDetails(id)
      setMovie(details)
    }
    loadMovieDetails()
  }, [id, fetchMovieDetails])

  const dates = ['Wednesday, 28 May, 2025', 'Thursday, 29 May, 2025', 'Friday, 30 May, 2025']
  const times = ['08:30 AM', '02:00 PM', '07:00 PM', '11:35 PM']
  const locations = ['Yogyakarta', 'Jakarta', 'Bandung']
  const cinemas = [
    { id: 'ebuid', name: 'Ebuid', src: '/assets/ebugray.svg' },
    { id: 'cine1', name: 'CineOne21', src: '/assets/cine1large.svg' },
    { id: 'hiflix', name: 'Hiflix', src: '/assets/hiflixlarge.svg' },
  ]

  const movieGenre = genres.filter((genre) => movie?.genre_ids?.includes(genre.id)).map((g) => g.name)

  const handleCinemaChange = (value) => {
    setSelectedCinema(value)
    console.log('Selected Cinema:', value)
  }

  const isButtonDisabled = !selectedDate || !selectedTime || !selectedLocation || !selectedCinema

  return (
    <>
      <Navbar />
      <div className="relative mb-6 sm:mb-8">
        <div
          className=" px-4 sm:px-6 lg:px-0 py-6 sm:py-8 md:py-10 lg:py-10 h-[16rem] sm:h-[20rem] md:h-[24rem] lg:h-[32.5rem] flex items-end justify-center lg:justify-end rounded-xl lg:rounded-2xl"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,16,13,0.00) 0%, rgba(15,16,13,0.80) 65.1%), url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex w-full flex-col justify-end gap-3 sm:gap-4 z-10 text-center lg:text-left lg:pl-110 lg:pr-10">
            <h4 className="font-semibold text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl">
              {movie?.title}
            </h4>
            <p className="font-normal text-neutral-50 text-xs sm:text-sm md:text-lg lg:text-xl">
              {movie?.overview}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
              {movieGenre.map((genre, index) => (
                <Button
                  key={index}
                  className="bg-transparent border border-white px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm md:text-base text-white"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <img
          className="lg:absolute w-64 md:w-64 lg:w-[18.5rem] h-96 md:h-96 lg:h-[27.75rem] rounded-xl mx-auto mt-4 lg:top-63 lg:left-20"
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt={movie?.title}
        />
        <div className="flex flex-col lg:flex-row w-full items-start gap-3 mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-4 px-3 sm:px-4 lg:pl-110 lg:gap-10">
          <div className="flex flex-col items-start gap-2 sm:gap-3 ">
            <div className="flex flex-col items-start gap-1 sm:gap-2">
              <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Release Date</div>
              <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                {movie?.release_date}
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 sm:gap-2">
              <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Duration</div>
              <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                {movie?.runtime
                  ? `${Math.floor(movie.runtime / 60)} hours ${movie.runtime % 60} minutes`
                  : ''}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:gap-3 max-w-[70%] lg:pr-10 ">
            <div className="flex flex-col items-start gap-1 sm:gap-2">
              <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Directed By</div>
              <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                {movie?.director || 'N/A'}
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 sm:gap-2">
              <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Cast</div>
              <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                {movie?.cast || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-6 sm:gap-8 md:gap-10 w-full bg-neutral-100 rounded-xl sm:rounded-2xl lg:rounded-4xl mb-6 sm:mb-8 px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10">
        <div className="flex flex-row items-start sm:items-center gap-4 sm:gap-6 w-full justify-between">
          <h1 className="font-bold text-black-800 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Book Tickets
          </h1>
          <Link
            to={isButtonDisabled ? "#" : "/buyticket"}
            state={{
              movie,
              genres: movieGenre,
              date: selectedDate,
              time: selectedTime,
              location: selectedLocation,
              cinema: selectedCinema,
            }}
            onClick={(e) => {
              if (isButtonDisabled) {
                e.preventDefault()
                toast.error('Please select date, time, location, and cinema to proceed.', {
                  style: {
                    background: '#ef4444',
                    color: '#fff',
                  },
                })
              }
            }}
          >
            <button
              className={`font-semibold flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl bg-orange-500 text-white text-xs sm:text-sm md:text-base ${
                isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
              }`}
            >
              Book Now
            </button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 w-full flex-wrap">
          <div className="flex w-full sm:w-96 max-w-xs sm:max-w-[24rem] flex-col items-start gap-3 sm:gap-4">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded p-2 sm:p-2.5 w-full text-xs sm:text-sm md:text-base"
            >
              <option value="" disabled>
                Choose Date
              </option>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full sm:w-96 max-w-xs sm:max-w-[24rem] flex-col items-start gap-3 sm:gap-4">
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border rounded p-2 sm:p-2.5 w-full text-xs sm:text-sm md:text-base"
            >
              <option value="" disabled>
                Choose Time
              </option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full sm:w-96 max-w-xs sm:max-w-[24rem] flex-col items-start gap-3 sm:gap-4">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded p-2 sm:p-2.5 w-full text-xs sm:text-sm md:text-base"
            >
              <option value="" disabled>
                Choose Location
              </option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
          <div className="flex items-center gap-4 sm:gap-6">
            <label htmlFor="cinema" className="font-semibold text-black-500 text-base sm:text-lg md:text-xl">
              Choose Cinema
            </label>
            <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">
              {cinemas.length} Results
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            {cinemas.map((cinema) => (
              <InputRadio
                key={cinema.id}
                htmlFor={cinema.id}
                src={cinema.src}
                id={cinema.id}
                value={cinema.id}
                name="chooseCinema"
                checked={selectedCinema === cinema.id}
                onChange={() => handleCinemaChange(cinema.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  )
}

export default MovieDetail;
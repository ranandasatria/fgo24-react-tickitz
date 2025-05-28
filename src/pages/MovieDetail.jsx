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
      <div className="relative mb-8">
        <div
          className="px-20 py-10 h-[32.5rem] flex items-end justify-end"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,16,13,0.00) 0%, rgba(15,16,13,0.80) 65.1%), url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: '2rem',
          }}
        >
          <div className="flex w-[53.1875rem] flex-col justify-end gap-4">
            <h4 className="headline-4 text-white">{movie?.title}</h4>
            <p className="body-2-regular text-neutral-50">{movie?.overview}</p>
            <div className="flex gap-2">
              {movieGenre.map((genre, index) => (
                <Button key={index} className="bg-transparent border border-white">
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <img
          className="absolute top-63 left-20 w-[18.5rem] h-[27.75rem] flex-shrink-0 rounded-2xl"
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt={movie?.title}
        />
        <div className="flex w-[59rem] items-start gap-10 ml-105 mt-4 px-3">
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col items-start gap-2">
              <div className="body-1-regular text-black-500">Release Date</div>
              <div className="headline-3-bold">{movie?.release_date}</div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="body-1-regular text-black-500">Duration</div>
              <div className="headline-3-bold">
                {movie?.runtime
                  ? `${Math.floor(movie.runtime / 60)} hours ${movie.runtime % 60} minutes`
                  : ''}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col items-start gap-2">
              <div className="body-1-regular text-black-500">Directed By</div>
              <div className="headline-3-bold">{movie?.director}</div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="body-1-regular text-black-500">Cast</div>
              <div className="headline-3-bold">{movie?.cast}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-20 flex-col items-start gap-10 self-stretch bg-neutral-100 rounded-4xl mb-8">
        <div className="flex items-center gap-[3.75rem] w-full justify-between">
          <h1 className="headline-1-bold text-black-800">Book Tickets</h1>
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
              className={`body-2-bold flex items-center justify-center px-5 py-3 rounded-2xl bg-orange-500 text-white ${
                isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
              }`}
            >
              Book Now
            </button>
          </Link>
        </div>
        <div className="flex items-center gap-8 self-stretch ">
          <div className="flex w-96 flex-col items-start gap-4">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded p-2 w-full"
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
          <div className="flex w-96 flex-col items-start gap-4">
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border rounded p-2 w-full"
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
          <div className="flex w-96 flex-col items-start gap-4">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded p-2 w-full"
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
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="cinema" className="headline-2-bold text-black-500">
              Choose Cinema
            </label>
            <div className="body-1-regular text-black-500">{cinemas.length} Results</div>
          </div>
          <div className="flex items-center gap-8">
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
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import InputStyle from '../components/InputStyle';
import FooterSection from '../components/FooterSection';
import InputRadio from '../components/InputRadio';
import FetchMovieAPI from '../components/FetchMovie';

function MovieDetail() {
  const { id } = useParams()

  const { genres, fetchMovieDetails } = FetchMovieAPI()

  const [movie, setMovie] = useState(null)

  const [selectedCinema, setSelectedCinema] = useState('')

  useEffect(() => {
    async function loadMovieDetails() {
      const details = await fetchMovieDetails(id)
      setMovie(details)
    }
    loadMovieDetails()
  }, [id, fetchMovieDetails])


  const movieGenre = genres.find((genre) => movie?.genre_ids?.includes(genre.id))?.name

  const handleCinemaChange = (value) => {
    setSelectedCinema(value)
  }

  return (
    <>
      <Navbar />
      <div className="relative mb-8">
        <div
          className="px-20 py-10 h-[32.5rem] flex items-end justify-end"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,16,13,0.00) 0%, rgba(15,16,13,0.80) 65.1%), url(https://image.tmdb.org/t/p/w1280${movie?.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: '2rem'
          }}
        >
          <div className="flex w-[53.1875rem] flex-col justify-end gap-4">
            <h4 className="headline-4 text-white">{movie?.title}</h4>
            <p className="body-2-regular text-neutral-50">{movie?.overview}</p>
            <div className="flex gap-2">
              {movieGenre && (
                <Button className="bg-transparent border border-white">
                  {movieGenre}
                </Button>
              )}
            </div>
          </div>
        </div>
        <img
          className="absolute top-63 left-20 w-[18.5rem] h-[27.75rem] flex-shrink-0 rounded-2xl"
          src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`}
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
                {movie?.runtime ? `${Math.floor(movie.runtime / 60)} hours ${movie.runtime % 60} minutes` : ''}
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
          <Button variant="primary">BOOK NOW</Button>
        </div>
        <div className="flex items-center gap-8 self-stretch">
          <div className="flex w-96 flex-col items-start gap-4">
            <InputStyle
              label="Choose Date"
              id="date"
              placeholder="Friday, 9 May, 2025"
              showChevron
            />
          </div>
          <div className="flex w-96 flex-col items-start gap-4">
            <InputStyle
              label="Choose Time"
              id="time"
              placeholder="08.30 AM"
              showChevron
            />
          </div>
          <div className="flex w-96 flex-col items-start gap-4">
            <InputStyle
              label="Choose Location"
              id="location"
              placeholder="Yogyakarta"
              showChevron
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="cinema" className="headline-2-bold text-black-500">
              Choose Cinema
            </label>
            <p className="body-1-regular text-black-500">39 Results</p>
          </div>
          <div className="flex items-center gap-8">
            <InputRadio
              htmlFor="ebuid"
              src="/assets/ebugray.svg"
              id="ebuid"
              value="ebuid"
              name="chooseCinema"
              checked={selectedCinema === 'ebuid'}
              onChange={() => handleCinemaChange('ebuid')}
            />
            <InputRadio
              htmlFor="cine1"
              src="/assets/cine1large.svg"
              id="cine1"
              value="cine1"
              name="chooseCinema"
              checked={selectedCinema === 'cine1'}
              onChange={() => handleCinemaChange('cine1')}
            />
            <InputRadio
              htmlFor="hiflix"
              src="/assets/hiflixlarge.svg"
              id="hiflix"
              value="hiflix"
              name="chooseCinema"
              checked={selectedCinema === 'hiflix'}
              onChange={() => handleCinemaChange('hiflix')}
            />
             <InputRadio
              htmlFor="ebuid1"
              src="/assets/ebugray.svg"
              id="ebuid1"
              value="ebuid1"
              name="chooseCinema"
              checked={selectedCinema === 'ebuid1'}
              onChange={() => handleCinemaChange('ebuid1')}
            />
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}

export default MovieDetail;
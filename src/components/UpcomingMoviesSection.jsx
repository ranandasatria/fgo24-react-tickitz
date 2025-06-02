import FetchMovieAPI from './FetchMovie';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

export default function UpcomingMoviesSection() {
  const { upcoming: upcomingMovies, genres } = FetchMovieAPI()
  const scrollRef = useRef(null)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    )
  }

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    const position = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
    setScrollPosition(position)
    setIsAtStart(scrollLeft === 0)
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1)
  }

  const filteredMovies = upcomingMovies.filter((movie) =>
    selectedGenres.length === 0 ||
    selectedGenres.every((genreId) => movie.genre_ids.includes(genreId))
  )

  return (
    <div className="flex w-full flex-col items-center gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-6 sm:py-8 md:py-10 rounded-2xl sm:rounded-3xl">
      <div className="flex w-full flex-col items-start gap-4 sm:gap-6 max-w-7xl">
        <div className="w-full flex flex-col md:flex-col items-center md:items-center justify-center gap-4 ">
          <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full md:shrink">
            {/* <h3 className="font-semibold rounded-full bg-orange-50 px-3 sm:px-4 py-1 sm:py-2 text-orange-500 text-xs sm:text-sm md:text-base lg:text-lg">
              Upcoming Movies
            </h3> */}
            <h1 className="font-bold text-black text-lg md:text-2xl lg:text-3xl">
              Exciting Movies Coming Soon
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full h-full grow">
            {genres.slice(0, 4).map((genre) => (
               <button
              key={genre.id}
              onClick={() => handleGenreToggle(genre.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                selectedGenres.includes(genre.id)
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {genre.name}
            </button>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 sm:gap-6">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex w-full overflow-x-auto gap-4 sm:gap-6 scroll-smooth hide-scrollbar"
          >
            {filteredMovies.length > 0 ? (
              filteredMovies.slice(0, 8).map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="flex w-40 sm:w-48 md:w-56 lg:w-64 flex-col items-center gap-3 sm:gap-4 flex-shrink-0"
                >
                  <div className=" h-48 sm:h-60 md:h-72 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 w-full">
                    <p
                      className="font-semibold text-black-500 text-xs sm:text-sm md:text-base lg:text-lg text-center uppercase"
                      title={movie.title}
                    >
                      {movie.title.length > 15 ? `${movie.title.slice(0, 15)}...` : movie.title}
                    </p>
                    <p className="font-medium rounded-full bg-orange-50 px-3 sm:px-4 py-1 sm:py-1.5 text-orange-500 text-xs sm:text-sm md:text-base">
                      {movie.release_date}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-neutral-300 text-xs sm:text-sm md:text-base w-full py-6">
                No movies found for the selected genres.
              </div>
            )}
          </div>
          <div className="slider w-full h-2 sm:h-2.5 md:h-3 bg-gray-700 rounded-xl sm:rounded-2xl overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-xl sm:rounded-2xl"
              style={{ width: `${Math.min(scrollPosition, 100)}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={scrollLeft}
                disabled={isAtStart}
                className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-[3.375rem] md:w-[3.375rem] items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 ${
                  isAtStart ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <img
                  src="/assets/arrowwhite24.svg"
                  alt="Left Arrow"
                  className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rotate-180"
                />
              </button>
              <button
                onClick={scrollRight}
                disabled={isAtEnd}
                className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-[3.375rem] md:w-[3.375rem] items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 ${
                  isAtEnd ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <img
                  src="/assets/arrowwhite24.svg"
                  alt="Right Arrow"
                  className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                />
              </button>
            </div>
            {/* <Button
              variant="primary"
              to="/movie"
              className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base"
            >
              View All
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
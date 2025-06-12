import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FetchMovieAPI from './FetchMovie';
import GenreTag from './GenreTag';
import { useSelector } from 'react-redux';

function ListMovie({ sortOption, movies: propMovies }) {
  const { movies: fetchedMovies, genres } = FetchMovieAPI() || { movies: [], genres: [] }
  const localMovies = useSelector((state) => state.movies.localMovies) || []
  
  const baseMovies = propMovies || [...(fetchedMovies || []), ...(localMovies || [])]

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const moviesPerPage = 12

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedGenres([])
    setCurrentPage(1)
  }

  const filteredMovies = baseMovies
    .filter((movie) => {
      const title = movie.title || movie.movieTitle || ''
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenres =
        selectedGenres.length === 0 ||
        selectedGenres.every((genreId) => (movie.genre_ids || []).includes(genreId))
      return matchesSearch && matchesGenres
    })
    .sort((a, b) => {
      const aTitle = a.title || a.movieTitle || ''
      const bTitle = b.title || b.movieTitle || ''
      const aDate = new Date(a.release_date || a.releaseDate || '1970-01-01')
      const bDate = new Date(b.release_date || b.releaseDate || '1970-01-01')
      const aVote = a.vote_average || 0
      const bVote = b.vote_average || 0

      if (sortOption === 'Popular') {
        return bVote - aVote
      } else if (sortOption === 'Latest') {
        return bDate - aDate
      } else if (sortOption === 'Name (A-Z)') {
        return aTitle.localeCompare(bTitle)
      } else if (sortOption === 'Name (Z-A)') {
        return bTitle.localeCompare(aTitle)
      }
      return 0
    })

  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const displayedGenres = genres.slice(0, 4)

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-20 py-6 sm:py-8 md:py-10">
      <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search movies by title..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm md:text-base"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {displayedGenres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreToggle(genre.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-colors ${
                selectedGenres.includes(genre.id)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {genre.name}
            </button>
          ))}
          {(searchQuery || selectedGenres.length > 0) && (
            <button
              onClick={clearFilters}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium bg-red-500 text-white hover:bg-red-600"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
      {baseMovies.length === 0 && genres.length === 0 ? (
        <div className="text-center text-gray-600 py-8 sm:py-10 text-xs sm:text-sm md:text-base">
          Loading movies...
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center text-gray-600 py-8 sm:py-10 text-xs sm:text-sm md:text-base">
          No movies found matching your search or filter criteria.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {currentMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="flex flex-col items-center justify-center gap-3 sm:gap-4 flex-shrink-0 group mb-4 rounded"
              >
                <div className="h-[20rem] sm:h-[22rem] md:h-[24rem] relative">
                  {(movie.vote_average || 0) > 7.0 && (
                    <span className="absolute top-1 sm:top-1 left-1 sm:left-2 bg-green-50 text-primary-500 text-xs sm:text-sm font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded z-10 hidden group-hover:block">
                      Recommended
                    </span>
                  )}
                  <img
                    className="w-full h-full rounded-xl sm:rounded-2xl object-cover hover:scale-105"
                    src={
                    movie.poster_path
                      ? movie.poster_path.startsWith('data:image/')
                        ? movie.poster_path
                        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/assets/imageplaceholder.png'
                  }
                  alt={movie.title || movie.movieTitle}
                  onError={(e) => {
                    e.target.src = '/assets/imageplaceholder.png'
                  }}
                  />
                </div>
                <GenreTag movieGenreIds={movie.genre_ids || []} genres={genres} />
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-center uppercase text-clip">
                  {(movie.title || movie.movieTitle).length > 24 ? `${(movie.title || movie.movieTitle).slice(0, 24)}...` : movie.title || movie.movieTitle}
                </h4>
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-[3.375rem] md:w-[3.375rem] items-center justify-center rounded-full bg-primary-500 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <img src="/assets/arrowwhite24.svg" alt="Previous" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rotate-180" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-[3.375rem] md:w-[3.375rem] items-center justify-center rounded-full cursor-pointer ${
                    currentPage === page
                      ? 'bg-primary-500'
                      : 'border border-black-500'
                  }`}
                >
                  <h2 className={`text-xs sm:text-sm md:text-2xl ${currentPage === page ? 'text-white' : 'text-black-500'}`}>
                    {page}
                  </h2>
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-[3.375rem] md:w-[3.375rem] items-center justify-center rounded-full bg-primary-500 ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <img src="/assets/arrowwhite24.svg" alt="Next" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ListMovie;
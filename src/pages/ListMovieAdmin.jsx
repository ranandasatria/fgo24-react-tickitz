import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NavbarAdmin from '../components/NavbarAdmin';
import { deleteMovieAction } from '../redux/reducers/movies';
import Button from '../components/Button';

function ListMovieAdmin() {
  const dispatch = useDispatch()
  const localMovies = useSelector((state) => state.movies.localMovies) || []
  const [currentPage, setCurrentPage] = useState(1)
  const moviesPerPage = 10

  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = localMovies.slice(indexOfFirstMovie, indexOfLastMovie)
  const totalPages = Math.ceil(localMovies.length / moviesPerPage)

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      dispatch(deleteMovieAction(id))
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Fungsi untuk memformat tanggal dari yyyy-mm-dd ke dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const [year, month, day] = dateString.split('T')[0].split('-')
    return `${day}/${month}/${year}`
  }

  return (
    <>
      <NavbarAdmin />
      <div className="min-h-screen bg-gray-100 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg sm:text-xl font-medium text-gray-700">List Movie</h1>
            <Button to="/addmovie" variant='primary'>Add Movies</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 sm:p-3 border-b text-center">No</th>
                  <th className="p-2 sm:p-3 border-b text-center">Thumbnail</th>
                  <th className="p-2 sm:p-3 border-b">Movie Name</th>
                  <th className="p-2 sm:p-3 border-b">Category</th>
                  <th className="p-2 sm:p-3 border-b">Released Date</th>
                  <th className="p-2 sm:p-3 border-b">Duration</th>
                  <th className="p-2 sm:p-3 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {localMovies.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-600">No movies added yet.</td>
                  </tr>
                ) : (
                  currentMovies.map((movie, index) => (
                    <tr key={movie.id} className="hover:bg-gray-50">
                      <td className="p-2 sm:p-3 border-b text-center align-middle">{indexOfFirstMovie + index + 1}</td>
                      <td className="p-2 sm:p-3 border-b text-center align-middle">
                        <img
                          src={movie.poster_path || '/assets/imageplaceholder.png'}
                          alt={movie.movieTitle}
                          className="w-12 h-12 object-cover mx-auto rounded"
                        />
                      </td>
                      <td className="p-2 sm:p-3 border-b align-middle">{movie.movieTitle}</td>
                      <td className="p-2 sm:p-3 border-b align-middle">{movie.category}</td>
                      <td className="p-2 sm:p-3 border-b align-middle">{formatDate(movie.releaseDate)}</td>
                      <td className="p-2 sm:p-3 border-b align-middle">{movie.duration}</td>
                      <td className="p-2 sm:p-3 border-b align-middle">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/movie/${movie.id}`}
                            className="bg-blue-500 text-white p-1 rounded flex items-center justify-center w-8 h-8 hover:bg-blue-600"
                          >
                            <span className="text-sm">👁️</span>
                          </Link>
                          <Link
                            to={`/editmovie/${movie.id}`}
                            className="bg-purple-500 text-white p-1 rounded flex items-center justify-center w-8 h-8 hover:bg-purple-600"
                          >
                            <span className="text-sm">✏️</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(movie.id)}
                            className="bg-red-500 text-white p-1 rounded flex items-center justify-center w-8 h-8 hover:bg-red-600"
                          >
                            <span className="text-sm">🗑️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {localMovies.length > 0 && (
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
              <img src="/assets/arrowwhite24.svg" alt="Left Arrow" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rotate-180" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === page ? 'bg-primary-500 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
               <img src="/assets/arrowwhite24.svg" alt="Right Arrow" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ListMovieAdmin;
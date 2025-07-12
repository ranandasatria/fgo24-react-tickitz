import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import InputRadio from '../components/InputRadio';
import FooterSection from '../components/FooterSection';
import FetchMovieAPI from '../components/FetchMovie';

function MovieDetail() {
  const { id } = useParams();
  const { genres, fetchMovieDetails } = FetchMovieAPI();
  const [movie, setMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMovieDetails() {
      setIsLoading(true);
      const movieData = await fetchMovieDetails(id);
      if (movieData) {
        setMovie({
          ...movieData,
          releaseDate: movieData.releaseDate
            ? new Date(movieData.releaseDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : 'N/A',
          runtime: movieData.durationMinutes
            ? `${Math.floor(movieData.durationMinutes / 60)} hours ${movieData.durationMinutes % 60} minutes`
            : 'N/A',
          description: movieData.description || 'No overview available.',
          director: movieData.directors || 'N/A',
          cast: movieData.casts ? movieData.casts.join(', ') : 'N/A',
        });
      }
      setIsLoading(false);
    }

    if (id) loadMovieDetails();
  }, [id, fetchMovieDetails]);

  const times = ['10:30 AM', '13:00 PM', '15:30 PM', '18:30 PM', '21:00 PM'];
  const locations = ['Bandung', 'Jakarta', 'Yogyakarta'];
  const cinemas = [
    { id: 'ebvid', name: 'Ebvid', src: '/assets/ebugray.svg' },
    { id: 'cine1', name: 'CineOne21', src: '/assets/cine1large.svg' },
    { id: 'hiflix', name: 'Hiflix', src: '/assets/hiflixlarge.svg' },
  ];

  const movieGenres = genres.filter((genre) =>
    (movie?.genre_ids || []).includes(genre.id)
  ).map((g) => g.name);

  const isButtonDisabled = !selectedDate || !selectedTime || !selectedLocation || !selectedCinema;

  const handleBookNowClick = (e) => {
    if (isButtonDisabled) {
      e.preventDefault();
      toast.error('Please select date, time, location, and cinema to proceed.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (isLoading) {
    return <div className="text-center py-8 text-gray-600">Please wait...</div>;
  }

  if (!movie) {
    return <div className="text-center py-8 text-gray-600">Movie not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="relative mb-6 sm:mb-8">
        <div
          className="px-4 sm:px-6 lg:px-0 py-6 sm:py-8 md:py-10 lg:py-10 h-[16rem] sm:h-[20rem] md:h-[24rem] lg:h-[32.5rem] flex items-end justify-center lg:justify-end rounded-xl lg:rounded-2xl"
          style={{
            backgroundImage: movie.horizontalImage
              ? `linear-gradient(180deg, rgba(15,16,13,0.00) 0%, rgba(15,16,13,0.80) 65.1%), url(${movie.horizontalImage})`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex w-full flex-col justify-end gap-3 sm:gap-4 z-10 text-center lg:text-left lg:pl-110 lg:pr-10">
            <h4 className="font-semibold text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl">
              {movie.title}
            </h4>
            <p className="font-normal text-neutral-50 text-xs sm:text-sm md:text-lg lg:text-xl">
              {movie.description}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
              {movieGenres.map((genre, index) => (
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
          src={movie.image || '/assets/image.png'}
          alt={movie.title}
          onError={(e) => {
            e.target.src = '/assets/image.png';
          }}
        />
        <div className="flex flex-col lg:flex-row w-full items-start gap-3 mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-4 px-10 sm:px-4 lg:pl-110 lg:gap-10">
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            <div className="flex flex-col items-start gap-1 sm:gap-2">
              <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Release date</div>
              <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                {movie.releaseDate}
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 sm:gap-2">
              <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Duration</div>
              <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                {movie.runtime}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:gap-3 max-w-[70%] lg:pr-10">
            <div className="flex flex-col items-start gap-1 sm:gap-2">
              <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Directed by</div>
              <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                {movie.director}
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 sm:gap-2">
              <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Cast</div>
              <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                {movie.cast}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-6 sm:gap-8 md:gap-10 w-full bg-neutral-100 rounded-xl sm:rounded-2xl lg:rounded-4xl mb-6 sm:mb-8 px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10">
        <div className="flex flex-row items-start sm:items-center gap-4 sm:gap-6 w-full justify-between">
          <h1 className="font-bold text-black-800 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Book tickets
          </h1>
          <Link
            to="/buyticket"
            state={{
              movie,
              genres: movieGenres,
              date: selectedDate,
              time: selectedTime,
              location: selectedLocation,
              cinema: selectedCinema,
            }}
            onClick={handleBookNowClick}
          >
            <button
              className={`font-semibold flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl bg-primary-500 text-white text-xs sm:text-sm md:text-base ${
                isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-600'
              }`}
            >
              Book now
            </button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full">
          <div className="flex w-full sm:w-96 max-w-xs sm:max-w-[24rem] flex-col items-start gap-3 sm:gap-4">
            <label htmlFor="date" className="text-sm sm:text-base font-medium text-gray-700">Select date</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              className="border rounded p-2 sm:p-2.5 w-full text-xs sm:text-sm md:text-base"
              required
            />
          </div>
          <div className="flex w-full sm:w-96 max-w-xs sm:max-w-[24rem] flex-col items-start gap-3 sm:gap-4">
            <label htmlFor="time" className="text-sm sm:text-base font-medium text-gray-700">Select time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border rounded p-2 sm:p-2.5 w-full text-xs sm:text-sm md:text-base"
            >
              <option value="" disabled>
                Choose time
              </option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full sm:w-96 max-w-xs sm:max-w-[24rem] flex-col items-start gap-3 sm:gap-4">
            <label htmlFor="location" className="text-sm sm:text-base font-medium text-gray-700">Select location</label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded p-2 sm:p-2.5 w-full text-xs sm:text-sm md:text-base"
            >
              <option value="" disabled>
                Location
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
              Choose cinema
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
                onChange={() => setSelectedCinema(cinema.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}

export default MovieDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import Navbar from '../components/Navbar';
// import Button from '../components/Button';
// import InputRadio from '../components/InputRadio';
// import FooterSection from '../components/FooterSection';
// import FetchMovieAPI from '../components/FetchMovie';
// import { useSelector } from 'react-redux';

// function MovieDetail() {
//   const { id } = useParams()
//   const { genres, fetchMovieDetails } = FetchMovieAPI()
//   const localMovies = useSelector((state) => state.movies.localMovies) || []
//   const [movie, setMovie] = useState(null)
//   const [selectedCinema, setSelectedCinema] = useState('')
//   const [selectedDate, setSelectedDate] = useState('')
//   const [selectedTime, setSelectedTime] = useState('')
//   const [selectedLocation, setSelectedLocation] = useState('')
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     async function loadMovieDetails() {
//       setIsLoading(true)
//       const parsedId = parseInt(id)

//       if (parsedId > 1000000000000) {
//         const localMovie = localMovies.find(m => m.id === parsedId)
//         if (localMovie) {
//           const genreIds = localMovie.category 
//             ? localMovie.category.split(',').map((c, index) => ({ name: c.trim(), id: index + 1 })) 
//             : []
//           const releaseDate = localMovie.releaseDate ? formatDate(localMovie.releaseDate.split('T')[0]) : 'N/A'
//           setMovie({
//             ...localMovie,
//             genre_ids: genreIds,
//             release_date: releaseDate,
//             runtime: localMovie.duration 
//               ? localMovie.duration.replace('hours', 'h').replace('minute', 'm').split(' ')
//                   .reduce((acc, val, idx) => acc + (idx === 0 ? parseInt(val) * 60 : parseInt(val) || 0), 0) 
//               : 0,
//             overview: localMovie.synopsis || 'No overview available.',
//             title: localMovie.movieTitle,
//             poster_path: localMovie.poster_path || localMovie.image,
//             director: localMovie.director,
//             cast: localMovie.cast
//           })
//         }
//       } else {
//         const tmdbMovie = await fetchMovieDetails(id)
//         if (tmdbMovie) {
//           const formattedTmdbMovie = {
//             ...tmdbMovie,
//             release_date: tmdbMovie.release_date ? formatDate(tmdbMovie.release_date) : 'N/A'
//           }
//           setMovie(formattedTmdbMovie)
//         }
//       }

//       setIsLoading(false)
//     }

//     if (id) loadMovieDetails()
//   }, [id])

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A'
//     const [year, month, day] = dateString.split('-')
//     return `${day}/${month}/${year}`
//   }

//   const times = ['10:30 AM', '13:00 PM', '15:30 PM', '18:30 PM', '21:00 PM']
//   const locations = ['Bandung', 'Jakarta', 'Yogyakarta']
//   const cinemas = [
//     { id: 'ebvid', name: 'Ebvid', src: '/assets/ebugray.svg' },
//     { id: 'cine1', name: 'CineOne21', src: '/assets/cine1large.svg' },
//     { id: 'hiflix', name: 'Hiflix', src: '/assets/hiflixlarge.svg' },
//   ]

//   const movieGenre = genres.filter((genre) => 
//     (movie?.genre_ids || []).some(g => g.id === genre.id || g.name === genre.name)
//   ).map((g) => g.name)

//   const isButtonDisabled = !selectedDate || !selectedTime || !selectedLocation || !selectedCinema

//   const handleBookNowClick = (e) => {
//     if (isButtonDisabled) {
//       e.preventDefault()
//       toast.error('Please select date, time, location, and cinema to proceed.')
//     }
//   }

//   const today = new Date().toISOString().split('T')[0]

//   if (isLoading) {
//     return <div className="text-center py-8 text-gray-600">Please wait...</div>
//   }

//   if (!movie) {
//     return <div className="text-center py-8 text-gray-600">Movie not found.</div>
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="relative mb-6 sm:mb-8">
//         <div
//           className="px-4 sm:px-6 lg:px-0 py-6 sm:py-8 md:py-10 lg:py-10 h-[16rem] sm:h-[20rem] md:h-[24rem] lg:h-[32.5rem] flex items-end justify-center lg:justify-end rounded-xl lg:rounded-2xl"
//           style={{
//             backgroundImage: movie?.backdrop_path 
//               ? `linear-gradient(180deg, rgba(15,16,13,0.00) 0%, rgba(15,16,13,0.80) 65.1%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
//               : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             backgroundPosition: 'center',
//           }}
//         >
//           <div className="flex w-full flex-col justify-end gap-3 sm:gap-4 z-10 text-center lg:text-left lg:pl-110 lg:pr-10">
//             <h4 className="font-semibold text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl">
//               {movie?.title || movie?.movieTitle}
//             </h4>
//             <p className="font-normal text-neutral-50 text-xs sm:text-sm md:text-lg lg:text-xl">
//               {movie?.overview || 'No overview available.'}
//             </p>
//             <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
//               {movieGenre.map((genre, index) => (
//                 <Button
//                   key={index}
//                   className="bg-transparent border border-white px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm md:text-base text-white"
//                 >
//                   {genre}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>
//         <img
//           className="lg:absolute w-64 md:w-64 lg:w-[18.5rem] h-96 md:h-96 lg:h-[27.75rem] rounded-xl mx-auto mt-4 lg:top-63 lg:left-20"
//           src={
//             movie?.poster_path
//               ? movie.poster_path.startsWith('data:image/')
//                 ? movie.poster_path
//                 : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//               : '/assets/imageplaceholder.png'
//           }
//           alt={movie?.title || movie?.movieTitle}
//           onError={(e) => { e.target.src = '/assets/imageplaceholder.png' }}
//         />
//         <div className="flex flex-col lg:flex-row w-full items-start gap-3 mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-4 px-10 sm:px-4 lg:pl-110 lg:gap-10">
//           <div className="flex flex-col items-start gap-2 sm:gap-3 ">
//             <div className="flex flex-col items-start gap-1 sm:gap-2">
//               <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Release date</div>
//               <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
//                 {movie?.release_date || 'N/A'}
//               </div>
//             </div>
//             <div className="flex flex-col items-start gap-1 sm:gap-2">
//               <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Duration</div>
//               <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
//                 {movie?.runtime
//                   ? `${Math.floor(movie.runtime / 60)} hours ${movie.runtime % 60} minutes`
//                   : movie?.duration || 'N/A'}
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start gap-2 sm:gap-3 max-w-[70%] lg:pr-10 ">
//             <div className="flex flex-col items-start gap-1 sm:gap-2">
//               <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Directed by</div>
//               <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
//                 {movie?.director || 'N/A'}
//               </div>
//             </div>
//             <div className="flex flex-col items-start gap-1 sm:gap-2">
//               <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">Cast</div>
//               <div className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
//                 {movie?.cast || 'N/A'}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col items-start gap-6 sm:gap-8 md:gap-10 w-full bg-neutral-100 rounded-xl sm:rounded-2xl lg:rounded-4xl mb-6 sm:mb-8 px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10">
//         <div className="flex flex-row items-start sm:items-center gap-4 sm:gap-6 w-full justify-between">
//           <h1 className="font-bold text-black-800 text-lg sm:text-xl md:text-2xl lg:text-3xl">
//             Book tickets
//           </h1>
//           <Link
//             to="/buyticket"
//             state={{
//               movie,
//               genres: movieGenre,
//               date: selectedDate,
//               time: selectedTime,
//               location: selectedLocation,
//               cinema: selectedCinema,
//             }}
//             onClick={handleBookNowClick}
//           >
//             <button
//               className={`font-semibold flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl bg-primary-500 text-white text-xs sm:text-sm md:text-base ${
//                 isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-600'
//               }`}
//             >
//               Book now
//             </button>
//           </Link>
//         </div>
//         <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full ">
//           <div className="flex w-full sm:w-96 max-w-xs sm:max-w-[24rem] flex-col items-start gap-3 sm:gap-4">
//             <label htmlFor="date" className="text-sm sm:text-base font-medium text-gray-700">Select date</label>
//             <input
//               type="date"
//               id="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               min={today}
//               className="border rounded p-2 sm:p-2.5 w-full text-xs sm:text-sm md:text-base"
//               required
//             />
//           </div>
//           <div className="flex w-full sm:w-96 max-w-xs sm:max-w-[24rem] flex-col items-start gap-3 sm:gap-4">
//             <label htmlFor="time" className="text-sm sm:text-base font-medium text-gray-700">Select time</label>
//             <select
//               value={selectedTime}
//               onChange={(e) => setSelectedTime(e.target.value)}
//               className="border rounded p-2 sm:p-2.5 w-full text-xs sm:text-sm md:text-base"
//             >
//               <option value="" disabled>
//                 Choose time
//               </option>
//               {times.map((time) => (
//                 <option key={time} value={time}>
//                   {time}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex w-full sm:w-96 max-w-xs sm:max-w-[24rem] flex-col items-start gap-3 sm:gap-4">
//             <label htmlFor="location" className="text-sm sm:text-base font-medium text-gray-700">Select location</label>
//             <select
//               id="location"
//               value={selectedLocation}
//               onChange={(e) => setSelectedLocation(e.target.value)}
//               className="border rounded p-2 sm:p-2.5 w-full text-xs sm:text-sm md:text-base"
//             >
//               <option value="" disabled>
//                 Location
//               </option>
//               {locations.map((location) => (
//                 <option key={location} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
//           <div className="flex items-center gap-4 sm:gap-6">
//             <label htmlFor="cinema" className="font-semibold text-black-500 text-base sm:text-lg md:text-xl">
//               Choose cinema
//             </label>
//             <div className="font-normal text-black-500 text-xs sm:text-sm md:text-base">
//               {cinemas.length} Results
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
//             {cinemas.map((cinema) => (
//               <InputRadio
//                 key={cinema.id}
//                 htmlFor={cinema.id}
//                 src={cinema.src}
//                 id={cinema.id}
//                 value={cinema.id}
//                 name="chooseCinema"
//                 checked={selectedCinema === cinema.id}
//                 onChange={() => setSelectedCinema(cinema.id)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <FooterSection />
//     </>
//   )
// }

// export default MovieDetail;
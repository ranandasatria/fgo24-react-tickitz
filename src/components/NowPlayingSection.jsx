import { useRef, useState } from 'react';
import Button from './Button';
import GenreTag from './GenreTag';
import { Link } from 'react-router-dom';
import FetchMovieAPI from './FetchMovie';

export default function NowPlayingSection() {
  const { movies, genres, isLoading } = FetchMovieAPI();
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const position = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollPosition(position);
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="text-gray-600 mt-2">Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 sm:gap-8 px-4 sm:px-6 md:px-8">
      <div className="flex w-full items-center justify-between px-2 sm:px-4 py-3 sm:py-5 md:px-8">
        <button
          onClick={scrollLeft}
          disabled={isAtStart}
          className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-[3.375rem] md:w-[3.375rem] items-center justify-center rounded-full bg-primary-500 hover:bg-primary-600 ${
            isAtStart ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <img src="/assets/arrowwhite24.svg" alt="Left Arrow" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rotate-180" />
        </button>
        <h2 className="font-bold text-md sm:text-xl md:text-2xl lg:text-3xl text-center">
          Now showing
        </h2>
        <button
          onClick={scrollRight}
          disabled={isAtEnd}
          className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-[3.375rem] md:w-[3.375rem] items-center justify-center rounded-full bg-primary-500 hover:bg-primary-600 ${
            isAtEnd ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <img src="/assets/arrowwhite24.svg" alt="Right Arrow" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto gap-4 sm:gap-6 scroll-smooth hide-scrollbar"
      >
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="flex w-48 sm:w-56 md:w-64 flex-col items-center justify-start gap-3 sm:gap-4 md:gap-5 flex-shrink-0"
            >
              <div className="flex h-[200px] sm:h-[240px] md:h-[280px] lg:h-[328px] flex-col items-center justify-center">
                <img
                  className="h-full w-full rounded-xl sm:rounded-2xl object-cover"
                  src={imageErrors[movie.id] || !movie.image ? '/assets/image.png' : movie.image}
                  alt={movie.title}
                  onError={() => handleImageError(movie.id)}
                />
              </div>
              <GenreTag movieGenreIds={movie.genre_ids || []} genres={genres} />
              <h4
                className="font-extrabold text-center uppercase text-clip text-xs sm:text-sm md:text-base lg:text-lg"
                title={movie.title}
              >
                {movie.title.length > 24 ? `${movie.title.slice(0, 24)}...` : movie.title}
              </h4>
            </Link>
          ))
        ) : (
          <div className="text-center w-full py-4 text-gray-600">No movies available.</div>
        )}
      </div>
      <div className="slider w-full h-2 sm:h-2.5 md:h-3 bg-gray-400 rounded-xl sm:rounded-2xl overflow-hidden">
        <div
          className="bg-primary-500 h-full rounded-xl sm:rounded-2xl"
          style={{ width: `${Math.min(scrollPosition, 100)}%` }}
        ></div>
      </div>
      <Button
        variant="primary"
        to="/movie"
        className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base"
      >
        View all
      </Button>
    </div>
  );
}


// import { useRef, useState, useEffect } from 'react';
// import Button from './Button';
// import GenreTag from './GenreTag';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import FetchMovieAPI from './FetchMovie';

// export default function NowPlayingSection() {
//   const { movies: fetchedMovies, genres } = FetchMovieAPI() || { movies: [], genres: [] }
//   const localMovies = useSelector((state) => state.movies.localMovies) || []
//   const scrollRef = useRef(null)
//   const [scrollPosition, setScrollPosition] = useState(0)
//   const [isAtStart, setIsAtStart] = useState(true)
//   const [isAtEnd, setIsAtEnd] = useState(false)
//   const [allMovies, setAllMovies] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const combinedMovies = [...(fetchedMovies || []), ...(localMovies || [])]
//     setAllMovies(combinedMovies)
//     setIsLoading(false)
//   }, [fetchedMovies, localMovies])

//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
//   }

//   const scrollRight = () => {
//     scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
//   }

//   const handleScroll = () => {
//     const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
//     const maxScroll = scrollWidth - clientWidth
//     const position = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
//     setScrollPosition(position)
//     setIsAtStart(scrollLeft === 0)
//     setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1)
//   }

//   if (isLoading) {
//     return <div className="text-center py-8 text-gray-600">Loading movies...</div>
//   }

//   return (
//     <div className="flex w-full flex-col items-center gap-6 sm:gap-8 px-4 sm:px-6 md:px-8">
//       <div className="flex w-full items-center justify-between px-2 sm:px-4 py-3 sm:py-5 md:px-8">
//         <button
//           onClick={scrollLeft}
//           disabled={isAtStart}
//           className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-[3.375rem] md:w-[3.375rem] items-center justify-center rounded-full bg-primary-500 hover:bg-primary-600 ${
//             isAtStart ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//           }`}
//         >
//           <img src="/assets/arrowwhite24.svg" alt="Left Arrow" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rotate-180" />
//         </button>
//         <h2 className="font-bold text-md sm:text-xl md:text-2xl lg:text-3xl text-center">
//           Now showing
//         </h2>
//         <button
//           onClick={scrollRight}
//           disabled={isAtEnd}
//           className={`flex h-8 w-8 sm:h-10 sm:w-10 md:h-[3.375rem] md:w-[3.375rem] items-center justify-center rounded-full bg-primary-500 hover:bg-primary-600 ${
//             isAtEnd ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//           }`}
//         >
//           <img src="/assets/arrowwhite24.svg" alt="Right Arrow" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
//         </button>
//       </div>
//       <div
//         ref={scrollRef}
//         onScroll={handleScroll}
//         className="flex w-full overflow-x-auto gap-4 sm:gap-6 scroll-smooth hide-scrollbar"
//       >
//         {Array.isArray(allMovies) && allMovies.length > 0 ? (
//           allMovies.map((movie) => (
//             <Link
//               key={movie.id}
//               to={`/movie/${movie.id}`}
//               className="flex w-48 sm:w-56 md:w-64 flex-col items-center justify-start gap-3 sm:gap-4 md:gap-5 flex-shrink-0"
//             >
//               <div className="flex h-[200px] sm:h-[240px] md:h-[280px] lg:h-[328px] flex-col items-center justify-center">
//                 <img
//                   className="h-full w-full rounded-xl sm:rounded-2xl object-cover"
//                   src={
//                     movie.poster_path
//                       ? movie.poster_path.startsWith('data:image/')
//                         ? movie.poster_path
//                         : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//                       : '/assets/imageplaceholder.png'
//                   }
//                   alt={movie.title || movie.movieTitle}
//                   onError={(e) => {
//                     e.target.src = '/assets/imageplaceholder.png'
//                   }}
//                 />
//               </div>
//               <GenreTag movieGenreIds={movie.genre_ids || []} genres={genres} />
//               <h4
//                 className="font-extrabold text-center uppercase text-clip text-xs sm:text-sm md:text-base lg:text-lg"
//                 title={movie.title || movie.movieTitle}
//               >
//                 {(movie.title || movie.movieTitle).length > 24 ? `${(movie.title || movie.movieTitle).slice(0, 24)}...` : movie.title || movie.movieTitle}
//               </h4>
//             </Link>
//           ))
//         ) : (
//           <div className="text-center w-full py-4 text-gray-600">No movies available.</div>
//         )}
//       </div>
//       <div className="slider w-full h-2 sm:h-2.5 md:h-3 bg-gray-400 rounded-xl sm:rounded-2xl overflow-hidden">
//         <div
//           className="bg-primary-500 h-full rounded-xl sm:rounded-2xl"
//           style={{ width: `${Math.min(scrollPosition, 100)}%` }}
//         ></div>
//       </div>
//       <Button
//         variant="primary"
//         to="/movie"
//         className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base"
//       >
//         View all
//       </Button>
//     </div>
//   )
// }
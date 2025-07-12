import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import NewsletterSection from '../components/NewsletterSection';
import FooterSection from '../components/FooterSection';
import ListMovie from '../components/ListMovie';
import FetchMovieAPI from '../components/FetchMovie';

function MoviePage() {
  const [sortOption, setSortOption] = useState('Latest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { movies, isLoading } = FetchMovieAPI();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSortSelect = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex px-4 sm:px-6 md:px-8 lg:px-20 py-6 sm:py-8 md:py-10 flex-col items-start gap-2 sm:gap-2.5 self-stretch">
        <div className="w-full h-[20rem] sm:h-[22rem] md:h-[24rem] flex items-end justify-between sm:justify-around bg-[linear-gradient(180deg,rgba(15,16,13,0.00)_0%,rgba(15,16,13,0.80)_65.1%),url('/assets/bannerpage2.svg')] bg-cover bg-no-repeat bg-center">
          <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-[90%] sm:max-w-[70%] md:max-w-[60%] pb-4 sm:pb-6 pl-4 sm:pl-6 md:pl-8">
            <h3 className="font-semibold rounded-full bg-primary-50 px-3 sm:px-4 py-1 sm:py-2 text-primary-500 text-xs sm:text-sm md:text-base lg:text-lg">
              LIST MOVIE OF THE WEEK
            </h3>
            <h2 className="font-medium text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              Experience the magic of cinema: <span className="text-gray-300">Book your tickets today</span>
            </h2>
            <p className="font-normal text-white text-xs sm:text-sm md:text-base lg:text-lg">
              Sign up and get the ticket with a lot of discount
            </p>
          </div>
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 pb-4 sm:pb-6 pr-4 sm:pr-6 md:pr-8">
            <img src="/assets/chevron-up.svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            <div className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border border-black rounded-full"></div>
            <div className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border border-black rounded-full bg-primary-500"></div>
            <div className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border border-black rounded-full"></div>
            <img src="/assets/chevron-down.svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center self-stretch px-4 sm:px-6 md:px-8 lg:px-20 py-6 sm:py-8 md:py-10 gap-3 sm:gap-0">
        <h1 className="font-black text-3xl md:text-4xl lg:text-[4rem] leading-tight sm:leading-[3rem] md:leading-[4rem] lg:leading-[4.75rem] text-black-500">
          Now showing in cinemas
        </h1>
        <div className="relative w-full sm:w-auto">
          <Button
            variant="primary"
            onClick={toggleDropdown}
            className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto text-xs sm:text-sm md:text-base"
          >
            {sortOption}
            <img src="/assets/chevron-down.svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 sm:mt-2 w-full sm:w-36 md:w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <button
                onClick={() => handleSortSelect('Latest')}
                className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base hover:bg-gray-100"
              >
                Latest
              </button>
              <button
                onClick={() => handleSortSelect('Name (A-Z)')}
                className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base hover:bg-gray-100"
              >
                Name A-Z
              </button>
              <button
                onClick={() => handleSortSelect('Name (Z-A)')}
                className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base hover:bg-gray-100"
              >
                Name Z-A
              </button>
            </div>
          )}
        </div>
      </div>
      <ListMovie sortOption={sortOption} movies={movies} isLoading={isLoading} />
      <NewsletterSection />
      <FooterSection />
    </>
  );
}

export default MoviePage;



// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Button from '../components/Button';
// import NewsletterSection from '../components/NewsletterSection';
// import FooterSection from '../components/FooterSection';
// import ListMovie from '../components/ListMovie';
// import { useSelector } from 'react-redux';
// import FetchMovieAPI from '../components/FetchMovie';

// function MoviePage() {
//   const [sortOption, setSortOption] = useState('popular')
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const { movies } = FetchMovieAPI() || { movies: [] }
//   const localMovies = useSelector((state) => state.movies.localMovies) || []

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev)
//   }

//   const handleSortSelect = (option) => {
//     setSortOption(option)
//     setIsDropdownOpen(false)
//   }

//   const allMovies = [...(movies || []), ...(localMovies || [])]

//   return (
//     <>
//       <Navbar />
//       <div className="flex px-4 sm:px-6 md:px-8 lg:px-20 py-6 sm:py-8 md:py-10 flex-col items-start gap-2 sm:gap-2.5 self-stretch">
//         <div className="w-full h-[20rem] sm:h-[22rem] md:h-[24rem] flex items-end justify-between sm:justify-around bg-[linear-gradient(180deg,rgba(15,16,13,0.00)_0%,rgba(15,16,13,0.80)_65.1%),url('/assets/bannerpage2.svg')] bg-cover bg-no-repeat bg-center">
//           <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-[90%] sm:max-w-[70%] md:max-w-[60%] pb-4 sm:pb-6 pl-4 sm:pl-6 md:pl-8">
//             <h3 className="font-semibold rounded-full bg-primary-50 px-3 sm:px-4 py-1 sm:py-2 text-primary-500 text-xs sm:text-sm md:text-base lg:text-lg">
//               LIST MOVIE OF THE WEEK
//             </h3>
//             <h2 className="font-medium text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
//               Experience the magic of cinema: <span className="text-gray-300">Book your tickets today</span>
//             </h2>
//             <p className="font-normal text-white text-xs sm:text-sm md:text-base lg:text-lg">
//               Sign up and get the ticket with a lot of discount
//             </p>
//           </div>
//           <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 pb-4 sm:pb-6 pr-4 sm:pr-6 md:pr-8">
//             <img src="/assets/chevron-up.svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
//             <div className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border border-black rounded-full"></div>
//             <div className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border border-black rounded-full bg-primary-500"></div>
//             <div className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border border-black rounded-full"></div>
//             <img src="/assets/chevron-down.svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center self-stretch px-4 sm:px-6 md:px-8 lg:px-20 py-6 sm:py-8 md:py-10 gap-3 sm:gap-0">
//         <h1 className="font-black text-3xl  md:text-4xl lg:text-[4rem] leading-tight sm:leading-[3rem] md:leading-[4rem] lg:leading-[4.75rem] text-black-500">
//           Now showing in cinemas
//         </h1>
//         <div className="relative w-full sm:w-auto">
//           <Button
//             variant="primary"
//             onClick={toggleDropdown}
//             className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto text-xs sm:text-sm md:text-base"
//           >
//             {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
//             <img src="/assets/chevron-down.svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
//           </Button>
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-1 sm:mt-2 w-full sm:w-36 md:w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
//               <button
//                 onClick={() => handleSortSelect('Popular')}
//                 className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base hover:bg-gray-100"
//               >
//                 Popular
//               </button>
//               <button
//                 onClick={() => handleSortSelect('Latest')}
//                 className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base hover:bg-gray-100"
//               >
//                 Latest
//               </button>
//               <button
//                 onClick={() => handleSortSelect('Name (A-Z)')}
//                 className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base hover:bg-gray-100"
//               >
//                 Name A-Z
//               </button>
//               <button
//                 onClick={() => handleSortSelect('Name (Z-A)')}
//                 className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base hover:bg-gray-100"
//               >
//                 Name Z-A
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <ListMovie sortOption={sortOption} movies={allMovies} />
//       <NewsletterSection />
//       <FooterSection />
//     </>
//   )
// }

// export default MoviePage;
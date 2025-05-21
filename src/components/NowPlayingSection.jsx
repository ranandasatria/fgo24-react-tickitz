import FetchMovieAPI from './FetchMovie';
import { useRef, useState } from 'react';
import Button from './Button';
import GenreTag from './GenreTag';

export default function NowPlayingSection() {
  const { movies, genres } = FetchMovieAPI()

  
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0)

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    const position = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
    setScrollPosition(position)
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="flex w-full items-center justify-between px-4 py-5 md:px-10">
        <button
          onClick={scrollLeft}
          className="flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full border"
        >
          <img src="/assets/arrowblack24.svg" alt="Left Arrow" className="h-6 w-6" />
        </button>
        <h2 className="headline-1-bold">Now Showing in Cinemas</h2>
        <button
          onClick={scrollRight}
          className="flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full bg-orange-500"
        >
          <img src="/assets/arrowwhite24.svg" alt="Right Arrow" className="h-6 w-6" />
        </button>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto gap-6 scroll-smooth hide-scrollbar"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex w-70 flex-col items-center justify-start gap-5 flex-shrink-0"
          >
            <div className="flex h-[328px] flex-col items-center justify-center">
              <img
                className="h-full w-full rounded-2xl object-cover"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <GenreTag movieGenreIds={movie.genre_ids} genres={genres} />
            <h4
              className="headline-3-eb text-center uppercase text-clip"
              title={movie.title}
            >
              {movie.title.length > 24 ? `${movie.title.slice(0, 24)}...` : movie.title}
            </h4>
          </div>
        ))}
      </div>
      <div className="slider w-full h-3 bg-gray-700 rounded-2xl overflow-hidden">
        <div
          className="bg-orange-500 h-full rounded-2xl"
          style={{ width: `${Math.min(scrollPosition, 100)}%` }}
        ></div>
      </div>
      <Button variant="primary" to="/nowshowing">
        View All
      </Button>
    </div>
  );
}
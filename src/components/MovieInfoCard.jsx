import React from 'react';
import Button from './Button';

const MovieCard = ({ movie, genres, time }) => {
  const movieGenres = genres
    .filter((genre) => movie?.genre_ids?.includes(genre.id))
    .map((genre) => genre.name)
    .slice(0, 2)

  return (
    <div className="flex gap-3 sm:gap-4 items-start mb-4 sm:mb-6">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-20 sm:w-24 h-28 sm:h-36 rounded sm:rounded-md object-cover"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold">{movie?.title || 'Loading...'}</h2>
          <div className="flex gap-1.5 sm:gap-2 my-1 sm:my-2">
            {movieGenres.map((genre, idx) => (
              <span key={idx} className="text-xs sm:text-sm bg-neutral-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {genre}
              </span>
            ))}
          </div>
          <p className="text-xs sm:text-sm md:text-base text-neutral-500">Regular - {time || 'Time'}</p>
        </div>
        <Button to="/movie" className="w-fit mt-2 sm:mt-3" variant="primary">
          Change
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
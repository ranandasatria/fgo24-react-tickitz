import React from 'react';
import Button from './Button';

const MovieCard = ({ movie, genres, time }) => {
  const movieGenres = genres
    .filter((genre) => movie?.genre_ids?.includes(genre.id))
    .map((genre) => genre.name)
    .slice(0, 2)

  return (
    <div className="flex gap-4 items-start mb-6">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-24 h-36 rounded-md object-cover"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold">{movie?.title || 'Loading...'}</h2>
          <div className="flex gap-2 my-2">
            {movieGenres.map((genre, idx) => (
              <span key={idx} className="text-xs bg-neutral-200 px-2 py-1 rounded-full">
                {genre}
              </span>
            ))}
          </div>
          <p className="text-sm text-neutral-500">Regular - {time || 'Time'}</p>
        </div>
        <Button to="/movie" className="w-fit mt-3" variant="primary">
          Change
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
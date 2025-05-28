import React from 'react';
import { Link } from 'react-router-dom';
import FetchMovieAPI from './FetchMovie';
import GenreTag from './GenreTag';


function ListMovie() {
  const { movies, genres } = FetchMovieAPI();

  return (
    <div>
      <div className="w-full grid grid-cols-4 items-center gap-8 px-20 py-10">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="flex w-[18.5rem] flex-col items-center justify-center gap-5 flex-shrink-0">
            <div className="flex h-[27.75rem] w-full flex-col items-center justify-center">
              <img
                className="h-[27.75rem] w-full rounded-2xl object-cover"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <GenreTag movieGenreIds={movie.genre_ids} genres={genres} />
            <h4 className="headline-3-eb text-center uppercase text-clip">
              {movie.title.length > 24 ? `${movie.title.slice(0, 24)}...` : movie.title}
            </h4>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center gap-5">
        <button
          className="flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full bg-orange-500"
        >
          <h2 className="headline-2-bold text-white">1</h2>
        </button>
        <button
          className="flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full border"
        >
          <h2 className="headline-2-bold text-black-500">2</h2>
        </button>
        <button
          className="flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full border"
        >
          <h2 className="headline-2-bold text-black-500">3</h2>
        </button>
        <button
          className="flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full border"
        >
          <h2 className="headline-2-bold text-black-500">4</h2>
        </button>
        <button
          className="flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full border bg-orange-500"
        >
          <img src="/assets/arrowwhite24.svg" alt="Right Arrow" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default ListMovie; 
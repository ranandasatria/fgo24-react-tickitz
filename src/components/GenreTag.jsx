import React from 'react';

function GenreTag({ movieGenreIds, genres, className = '' }) {
  const genreNames = genres
    .filter((genre) => movieGenreIds.includes(genre.id))
    .map((genre) => genre.name)
    .slice(0, 2)

  return (
    <div className="flex gap-1 sm:gap-2">
      {genreNames.length > 0 ? (
        genreNames.map((name, index) => (
          <div
            key={index}
            className={`font-semibold text-xs sm:text-sm md:text-base leading-tight bg-grey-50 text-black-200 flex px-2 sm:px-3 py-1 sm:py-2 justify-center items-center rounded-[3rem] sm:rounded-[6.25rem] ${className}`}
          >
            {name}
          </div>
        ))
      ) : (
        <div
          className={`font-semibold text-xs sm:text-sm md:text-base leading-tight bg-grey-50 text-black-200 flex px-2 sm:px-3 py-1 sm:py-2 justify-center items-center rounded-[3rem] sm:rounded-[6.25rem] ${className}`}
        >
          Unknown Genre
        </div>
      )}
    </div>
  )
}

export default GenreTag;
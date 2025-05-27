import React from 'react';

function GenreTag({ movieGenreIds, genres, className = '' }) {

  const genreNames = genres
    .filter((genre) => movieGenreIds.includes(genre.id))
    .map((genre) => genre.name)
    .slice(0, 2)

  return (
    <div className="flex gap-2">
      {genreNames.length > 0 ? (
        genreNames.map((name, index) => (
          <div
            key={index}
            className={`font-semibold text-[1rem] leading-[1.5rem] bg-grey-50 text-black-200 flex px-3 py-2 justify-center items-center rounded-[6.25rem] ${className}`}
          >
            {name}
          </div>
        ))
      ) : (
        <div
          className={`font-semibold text-[1rem] leading-[1.5rem] bg-grey-50 text-black-200 flex px-3 py-2 justify-center items-center rounded-[6.25rem] ${className}`}
        >
          Unknown Genre
        </div>
      )}
    </div>
  )
}

export default GenreTag;
import FetchMovieAPI from './FetchMovie';
import Button from './Button';
import { Link } from 'react-router-dom';


export default function UpcomingMoviesSection() {
  const { upcoming: upcomingMovies, genres } = FetchMovieAPI()

  return (
    <div className="flex w-full rounded-[3rem] px-4 py-10 md:px-6 lg:px-20 flex-col items-center gap-2.5 ">
      <div className="main-container flex w-full p-4 sm:p-10 lg:p-4 flex-col items-start gap-2.5 ">
        <div className="group flex flex-col lg:flex-row items-center justify-center lg:items-center gap-6 lg:gap-[3.75rem] self-stretch">
          <div className="left-group flex w-full lg:w-[50.375rem] flex-col items-start gap-6 lg:gap-10 justify-between">
            <div className="movie-group grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-center items-start gap-4 lg:gap-[1.125rem] self-stretch">
              {upcomingMovies.slice(0, 4).map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="movie-card flex w-full max-w-[11.75rem] flex-col items-start justify-start gap-5"
                >
                  <div className="poster flex w-full h-55 flex-col justify-start items-center self-stretch bg-black rounded-2xl">
                    <img
                      className="h-full w-full rounded-2xl"
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                  <div className="movie-name-date flex flex-col items-center gap-2 self-stretch">
                    <p
                      className="body-2-bold text-center uppercase"
                      title={movie.title}
                    >
                      {movie.title.length > 15 ? `${movie.title.slice(0, 15)}...` : movie.title}
                    </p>
                    <p className="body-2-bold rounded-full bg-orange-50 px-4 py-2 text-orange-500">
                      {movie.release_date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 self-stretch">
              {genres.slice(0, 4).map((genre) => (
                <Button key={genre.id} variant="secondary">
                  {genre.name.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
          <div className="right-group flex flex-col wl-150 h-150 justify-around gap-14 lg:gap-10">
            <div className="flex flex-col items-start gap-6">
              <h3 className="headline-3 rounded-full bg-orange-50 px-4 py-2 text-orange-500">
                UPCOMING MOVIES
              </h3>
              <h1 className="font-black text-[3rem] text-black-500">
                Exciting Movie Coming Soon
              </h1>
            </div>
            <div className="flex items-center gap-4 lg:gap-[7.6875rem]">
              <div className="flex items-center gap-4">
                <button className="flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full border">
                  <img
                    src="/assets/arrowblack24.svg"
                    alt="Left Arrow"
                    className="h-6 w-6"
                  />
                </button>
                <button className="flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full border bg-orange-500">
                  <img
                    src="/assets/arrowwhite24.svg"
                    alt="Right Arrow"
                    className="h-6 w-6"
                  />
                </button>
              </div>
              <Button variant="primary" to="/movie">
                View All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
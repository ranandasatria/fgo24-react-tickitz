import React from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import InputStyle from '../components/InputStyle';
import NewsletterSection from '../components/NewsletterSection';
import FooterSection from '../components/FooterSection';
import ListMovie from '../components/ListMovie';
import FetchMovieAPI from '../components/FetchMovie';

function MoviePage() {
  const { genres } = FetchMovieAPI()

  return (
    <>
      <Navbar />
      <div className="flex px-20 py-10 flex-col items-start gap-2.5 self-stretch">
        <div className="w-full h-[25.25rem] flex items-end flex-shrink-0 justify-around bg-[linear-gradient(180deg,rgba(15,16,13,0.00)_0%,rgba(15,16,13,0.80)_65.1%),url('/assets/bannerpage2.svg')] bg-cover bg-no-repeat bg-center">
          <div className="flex flex-col items-start gap-4">
            <h3 className="headline-3 rounded-full bg-orange-50 px-4 py-2 text-orange-500">
              LIST MOVIE OF THE WEEK
            </h3>
            <h2 className="headline-2-medium text-white">
              Experience the Magic of Cinema: <span className="text-orange-500"> Book Your Tickets Today</span>
            </h2>
            <p className="body-2-regular text-white">Sign up and get the ticket with a lot of discount</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/chevron-up.svg" />
            <div className="h-4 w-4 border border-black rounded-full"></div>
            <div className="h-4 w-4 border border-black rounded-full bg-orange-500"></div>
            <div className="h-4 w-4 border border-black rounded-full"></div>
            <img src="/assets/chevron-down.svg" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center self-stretch px-20 py-10">
        <h1 className="headline-4 text-black-500">Now Showing in Cinemas</h1>
        <Button variant="primary">
          POPULAR<img src="/assets/chevron-up.svg" />
        </Button>
      </div>
      <div className="flex justify-between items-center self-stretch px-20 py-10 gap-6">
        <div className="flex w-96 flex-col items-start gap-4">
          <InputStyle
            label="Find movie"
            id="movie-search"
            placeholder="Search Your Movies..."
            showChevron
          />
        </div>
        <div className="flex flex-col items-start gap-4 flex-[1_0_0]">
          <label className="headline-2-bold text-black-500">Filters</label>
          <div className="flex items-center gap-4">
            {genres.slice(0, 4).map((genre) => (
              <Button key={genre.id} variant="neutral">
                {genre.name.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <ListMovie />
      <NewsletterSection />
      <FooterSection />
    </>
  );
}

export default MoviePage;
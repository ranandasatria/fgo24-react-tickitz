import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import UpcomingMoviesSection from '../components/UpcomingMoviesSection';
import NewsletterSection from '../components/NewsletterSection';
import FooterSection from '../components/FooterSection';
import NowPlayingSection from '../components/NowPlayingSection';

function Home() {
  return (
    <>
      <Navbar /> 
      <div className="flex flex-col items-center gap-6 px-4 py-10 md:px-6 lg:px-20">
        <div className="flex w-full max-w-7xl flex-col items-center gap-12">
          <HeroSection />
          <NowPlayingSection/>
        </div>
      </div>
      <WhyChooseUsSection />
      <UpcomingMoviesSection/>
      <NewsletterSection />
      <FooterSection />
    </>
  )
}

export default Home;


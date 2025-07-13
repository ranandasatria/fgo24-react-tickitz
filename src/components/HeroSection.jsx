function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 text-center px-4 sm:px-6 md:px-8">
      {/* <h3 className="font-semibold rounded-full bg-primary-50 px-3 sm:px-4 py-1 sm:py-2 text-primary-500 text-xs sm:text-sm md:text-base lg:text-lg">
        MOVIE TICKET PURCHASES #1 IN INDONESIA
      </h3> */}
      <h1 className="font-medium flex flex-col items-center gap-1 sm:gap-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Experience the magic of cinema:{' '}
        <span className="text-primary-500 font-bold text-2xl sm:text-3xl md:text42xl lg:text-5xl">
          Hello from VPS v2
        </span>
      </h1>
      {/* <p className="font-normal max-w-xs sm:max-w-md md:max-w-lg text-neutral-500 text-xs sm:text-sm md:text-base lg:text-lg">
        Sign up and get the ticket with a lot of discount
      </p> */}
    </div>
  );
}

export default HeroSection;
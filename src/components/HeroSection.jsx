function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h3 className="headline-3 rounded-full bg-orange-50 px-4 py-2 text-orange-500">
        MOVIE TICKET PURCHASES #1 IN INDONESIA
      </h3>
      <h1 className="headline-1-medium flex flex-col items-center gap-2">
        Experience the Magic of Cinema:{' '}
        <span className="text-orange-500 headline-4">Book Your Tickets Today</span>
      </h1>
      <p className="body-1-regular max-w-md text-neutral-500">
        Sign up and get the ticket with a lot of discount
      </p>
    </div>
  );
}

export default HeroSection;
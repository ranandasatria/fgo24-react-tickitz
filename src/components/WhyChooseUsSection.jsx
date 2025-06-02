function WhyChooseUsSection() {
  return (
    <div className="flex flex-col md:flex-row p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-[3.75rem] self-stretch rounded-2xl sm:rounded-3xl bg-gray-900">
      <div className="flex w-full md:w-auto flex-col items-start gap-4 sm:gap-5 md:gap-6">
        {/* <h3 className="font-semibold rounded-full bg-orange-50 px-3 sm:px-4 py-1 sm:py-2 text-orange-500 text-xs sm:text-sm md:text-base lg:text-lg">
          Why Choose Us
        </h3> */}
        <h1 className="font-bold text-white text-lg md:text-xl lg:text-3xl">
          Unleashing the Ultimate Movie Experience
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full">
        <div className="flex h-[10rem] sm:h-[13rem] md:h-[18rem] lg:h-[19.125rem] flex-col items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-gray-700 p-4 sm:p-5 md:p-6">
          <img src="/assets/star-flower.svg" alt="Star" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          <h3 className="font-semibold text-white text-base md:text-md lg:text-xl">Guaranteed</h3>
          <p className="font-normal text-neutral-300 text-xs sm:text-sm lg:text-md">
            Secure ticket purchases with a satisfaction guarantee for a worry-free cinema experience.
          </p>
        </div>
        <div className="flex h-[10rem] sm:h-[13rem] md:h-[18rem] lg:h-[19.125rem] flex-col items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-gray-700 p-4 sm:p-5 md:p-6">
          <img src="/assets/star-flower.svg" alt="Star" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          <h3 className="font-semibold text-white text-base md:text-md lg:text-xl">Affordable</h3>
          <p className="font-normal text-neutral-300 text-xs sm:text-sm lg:text-md">
            Enjoy competitive prices and exclusive discounts on movie tickets every day.
          </p>
        </div>
        <div className="flex h-[10rem] sm:h-[13rem] md:h-[18rem] lg:h-[19.125rem] flex-col items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-gray-700 p-4 sm:p-5 md:p-6">
          <img src="/assets/star-flower.svg" alt="Star" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
          <h3 className="font-semibold text-white text-base md:text-md lg:text-xl">24/7 Support</h3>
          <p className="font-normal text-neutral-300 text-xs sm:text-sm lg:text-md">
            Get instant help anytime with our round-the-clock customer support team.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUsSection;
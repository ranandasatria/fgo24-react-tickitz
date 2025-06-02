function NewsletterSection() {
  return (
    <div className="flex p-4 sm:p-6 md:p-8 lg:p-20 flex-col items-center gap-2 sm:gap-4 md:gap-6">
      <div className="flex px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-20 flex-col items-start gap-2 sm:gap-4 rounded-2xl sm:rounded-3xl bg-orange-50 w-full">
        <form className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 w-full">
          <label className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-center w-full">Subscribe to Our Newsletter</label>
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 self-stretch">
            <input
              type="text"
              placeholder="Your First Name"
              className="flex px-4 py-2 items-center gap-2 flex-[1_0_0] rounded-[6.25rem] border border-orange-500 bg-white field-text1-regular text-sm sm:text-base md:text-lg w-full"
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex px-4 py-2 items-center gap-2 flex-[1_0_0] rounded-[6.25rem] border border-black bg-white field-text1-regular text-sm sm:text-base md:text-lg w-full"
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 px-4 py-2 sm:py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 button-medium text-sm sm:text-base md:text-lg"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsletterSection;
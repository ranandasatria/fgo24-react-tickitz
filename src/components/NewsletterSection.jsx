function NewsletterSection() {
  return (
    <div className="flex p-20 flex-col items-center gap-2.5">
      <div className="flex px-[10rem] py-20 flex-col items-start gap-2.5 rounded-[3rem] bg-orange-50">
        <form className="flex flex-col items-start gap-[3.75rem]">
          <label className="headline-4-bold">Subscribe to Our Newsletter</label>
          <div className="flex flex-col items-start gap-6 self-stretch">
            <div className="flex items-center gap-6 self-stretch">
              <input
                type="text"
                placeholder="Your First Name"
                className="flex px-6 py-[0.9375rem] items-center gap-2.5 flex-[1_0_0] rounded-[6.25rem] border border-orange-500 bg-white"
              />
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex px-6 py-[0.9375rem] items-center gap-2.5 flex-[1_0_0] rounded-[6.25rem] border border-black bg-white"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-[0.625rem] px-6 py-[1.1875rem] rounded-full bg-orange-500 text-white hover:bg-orange-600"
            >
              Subscribe Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsletterSection;
function FooterSection() {
  return (
    <div className="flex p-4 sm:p-6 md:p-8 lg:p-20 flex-col items-start gap-6 sm:gap-8 self-stretch rounded-tl-2xl sm:rounded-tl-3xl rounded-tr-2xl sm:rounded-tr-3xl bg-black-500">
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex flex-col items-start gap-4 w-full sm:w-[39.25rem]">
          <img src="/assets/tickitzfooter.svg" alt="Tickitz Logo" className="w-28 sm:w-32 md:w-40" />
          <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg">
            Stop waiting in line. Buy tickets conveniently, watch movies quietly.
          </p>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 w-full">
          <div className="flex flex-col items-start gap-2 sm:gap-8">
            <h3 className="font-bold text-xl lg:text-2xl leading-tight text-white">EXPLORE</h3>
            <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4 self-stretch">
              <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg">Cinemas</p>
              <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg">Movies List</p>
              <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg">My Ticket</p>
              <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg">Notification</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:gap-8">
            <h3 className="font-bold text-xl lg:text-2xl leading-tight text-white">OUR SPONSOR</h3>
            <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4 self-stretch">
              <img src="/assets/ebu.svg" alt="EBU Sponsor" className="w-20 sm:w-24 md:w-36" />
              <img src="/assets/cine1.svg" alt="Cine1 Sponsor" className="w-20 sm:w-24 md:w-36" />
              <img src="/assets/hiflix.svg" alt="Hiflix Sponsor" className="w-20 sm:w-24 md:w-36" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:gap-8">
            <h3 className="font-bold text-xl lg:text-2xl leading-tight text-white">FOLLOW US</h3>
            <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4 self-stretch">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img src="/assets/facebook.svg" alt="Facebook" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg">Facebook</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img src="/assets/instagram.svg" alt="Instagram" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg">Instagram</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img src="/assets/twitter.svg" alt="Twitter" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg">Twitter</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img src="/assets/youtube.svg" alt="Youtube" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg">Youtube</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-normal text-neutral-100 text-xs sm:text-sm md:text-base lg:text-lg text-center sm:text-left w-full">
        © 2025 Tickitz. All Rights Reserved.
      </p>
    </div>
  );
}

export default FooterSection;
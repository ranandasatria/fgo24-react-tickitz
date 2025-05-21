function FooterSection() {
  return (
    <div className="flex p-20 flex-col items-start gap-2.5 self-stretch rounded-tl-[3rem] rounded-tr-[3rem] bg-black-500">
      <div className="flex items-center gap-20 self-stretch">
        <div className="flex w-[39.25rem] flex-col items-start">
          <img src="/assets/tickitzfooter.svg" alt="Tickitz Logo" />
          <p className="body-1-regular text-neutral-100">
            Stop waiting in line. Buy tickets conveniently, watch movies quietly.
          </p>
        </div>
        <div className="flex h-[16.88106rem] flex-col justify-between items-end flex-[1_0_0]">
          <div className="flex justify-between items-start self-stretch">
            <div className="flex flex-col items-start gap-8">
              <h3 className="headline-3-eb text-white">EXPLORE</h3>
              <div className="flex flex-col items-start gap-4 self-stretch">
                <p className="body-2-regular text-neutral-100">Cinemas</p>
                <p className="body-2-regular text-neutral-100">Movies List</p>
                <p className="body-2-regular text-neutral-100">My Ticket</p>
                <p className="body-2-regular text-neutral-100">Notification</p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-8">
              <h3 className="headline-3-eb text-white">OUR SPONSOR</h3>
              <div className="flex flex-col items-start gap-4 self-stretch">
                <img src="/assets/ebu.svg" alt="EBU Sponsor" />
                <img src="/assets/cine1.svg" alt="Cine1 Sponsor" />
                <img src="/assets/hiflix.svg" alt="Hiflix Sponsor" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-8">
              <h3 className="headline-3-eb text-white">FOLLOW US</h3>
              <div className="flex flex-col items-start gap-4 self-stretch">
                <div className="flex items-center gap-2.5">
                  <img src="/assets/facebook.svg" alt="Facebook" />
                  <p className="body-2-regular text-neutral-100">Facebook</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <img src="/assets/instagram.svg" alt="Instagram" />
                  <p className="body-2-regular text-neutral-100">Instagram</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <img src="/assets/twitter.svg" alt="Twitter" />
                  <p className="body-2-regular text-neutral-100">Twitter</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <img src="/assets/youtube.svg" alt="Youtube" />
                  <p className="body-2-regular text-neutral-100">Youtube</p>
                </div>
              </div>
            </div>
          </div>
          <p className="body-2-regular text-neutral-100">
            © 2025 Tickitz. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
function WhyChooseUsSection() {
  return (
    <div className="flex p-20 justify-center items-center gap-[3.75rem] self-stretch rounded-[3rem] bg-black-800 md:flex-row md:gap-[3.75rem] md:px-20">
      <div className="flex w-full flex-col items-start gap-6 md:w-auto">
        <h3 className="headline-3-bold rounded-full bg-orange-50 px-4 py-2 text-orange-500">
          Why Choose Us
        </h3>
        <h1 className="headline-4-bold text-white">
          Unleashing the Ultimate Movie Experience
        </h1>
      </div>
      <div className="grid items-center gap-5 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex h-[19.125rem] flex-[1_0_0] flex-col items-start gap-4 rounded-2xl bg-gray-300 p-6">
          <img src="/assets/star-flower.svg" alt="Star" />
          <h3 className="headline-3-bold">Guaranteed</h3>
          <p className="body-3-medium">
            Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
            proin faucibus nibh et sagittis a.
          </p>
        </div>
        <div className="flex h-[19.125rem] flex-[1_0_0] flex-col items-start gap-4 rounded-2xl bg-gray-300 p-6">
          <img src="/assets/star-flower.svg" alt="Star" />
          <h3 className="headline-3-bold">Affordable</h3>
          <p className="body-3-medium">
            Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
            proin faucibus nibh et sagittis a.
          </p>
        </div>
        <div className="flex h-[19.125rem] flex-[1_0_0] flex-col items-start gap-4 rounded-2xl bg-gray-300 p-6">
          <img src="/assets/star-flower.svg" alt="Star" />
          <h3 className="headline-3-bold">24/7 Customer Support</h3>
          <p className="body-3-medium">
            Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
            proin faucibus nibh et sagittis a.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUsSection;
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
<div className="text-center text-2xl pt-10 text-dark-muted">
        <p>
          CONTACT <span className="text-dark-text font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px] rounded-lg"
          src={assets.contact_image}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6 text-dark-muted">
          <p className="font-semibold text-lg text-dark-text">OUR OFFICE</p>
          <p>
            1st floor, Sayaji Business Park, Gargoti
             <br />
             Tal: Bhudargad, District: Kolhapur
          </p>
          <p>
            Tel: +12345689 <br /> Email: xyz@gmail.com
          </p>
          <p className="font-semibold text-lg text-dark-text uppercase">
            CAREERS AT Desai&apos;s Hospital
          </p>
          <p>
            Learn more about our teams and job openings.
          </p>
          <button className="border border-dark-border px-8 py-4 text-sm text-dark-text hover:bg-gradient-to-r hover:from-sky-600 hover:to-teal-500 hover:border-transparent hover:text-white transition-all duration-500 rounded-lg">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

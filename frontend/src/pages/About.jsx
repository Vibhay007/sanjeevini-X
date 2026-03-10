import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-dark-muted">
        <p>
          ABOUT <span className="text-dark-text font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px] rounded-lg"
          src={assets.about_image}
          alt="Desai Hospital"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-dark-muted">
          <p>
            Welcome to <b>Desai Hospital</b>, a trusted healthcare institution
            serving Kolhapur and surrounding areas. We specialize in delivering
            quality medical care with compassion, backed by modern technology
            and expert doctors.
          </p>
          <p>
            With decades of service, Desai Hospital has become a cornerstone for
            families seeking reliable healthcare — from routine check-ups to
            advanced treatments. Our commitment is simple: accessible, affordable,
            and patient-focused care.
          </p>
          <b className="text-dark-text">Our Vision</b>
          <p>
            At Desai Hospital, our vision is to ensure that every individual has
            access to world-class healthcare without having to travel far. We aim
            to combine advanced medical facilities with a caring environment,
            making healing easier and more effective.
          </p>
        </div>
      </div>

      <div className="text-xl my-4 text-dark-muted">
        <p>
          WHY <span className="text-dark-text font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border border-dark-border bg-dark-card px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r hover:from-sky-600 hover:to-teal-500 hover:text-white hover:border-transparent transition-all duration-300 text-dark-muted cursor-pointer">
          <b>Experienced Doctors:</b>
          <p>
            A team of MBBS and MD specialists providing expert care in multiple
            fields of medicine.
          </p>
        </div>
        <div className="border border-dark-border bg-dark-card px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r hover:from-sky-600 hover:to-teal-500 hover:text-white hover:border-transparent transition-all duration-300 text-dark-muted cursor-pointer">
          <b>Modern Facilities:</b>
          <p>
            Equipped with advanced diagnostic tools, operation theaters, and
            emergency care services.
          </p>
        </div>
        <div className="border border-dark-border bg-dark-card px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r hover:from-sky-600 hover:to-teal-500 hover:text-white hover:border-transparent transition-all duration-300 text-dark-muted cursor-pointer">
          <b>Community Focus:</b>
          <p>
            Regular free health camps and affordable treatment options for
            workers and families in need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

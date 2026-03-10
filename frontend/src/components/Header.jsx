import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-sky-500 via-sky-500 to-teal-400">
          
          <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-24 gap-12">
            
            {/* LEFT SIDE: Content */}
            <div className="md:w-3/5 text-white space-y-8">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1]">
                Healthcare held to <br />
                <span className="text-white/90 font-medium">higher standards.</span>
              </h1>
              <p className="text-white/80 text-lg max-w-md">
                Every doctor on our platform is carefully verified to ensure 
                expert care and complete peace of mind at every step.
              </p>
              
              <div className="flex items-center gap-4">
                <img src={assets.group_profiles} className="w-24" alt="" />
                <span className="text-sm font-medium">Trusted by 50,000+ patients</span>
              </div>

  <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-black text-sm w-fit md:m-0 hover:scale-105 transition-all duration-300'>
  Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
</a>
            </div>

            {/* RIGHT SIDE: Scaled Image */}
            <div className="md:w-2/5 flex justify-center">
              <div className="relative max-w-[360px] w-full"> {/* Controls the photo size */}
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-[2.5rem] border border-white/30 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <img 
                      src={assets.header_img} 
                      className="w-full h-auto object-contain max-h-[420px]" 
                      alt="Doctors" 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
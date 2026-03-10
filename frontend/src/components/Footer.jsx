import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ------------ Left Section ------------ */}
        <div>
 <img
  className="mb-5 w-40 h-40 rounded-full object-cover transition-shadow duration-300 hover:shadow-[0_0_25px_skyblue]"
  src={assets.logo}
  alt="Sanjeevini X Logo"
/>
          <p className="w-full md:w-2/3 text-dark-muted leading-6">
           “Sanjeevini X is your one-stop platform for connecting with trusted doctors and managing your healthcare effortlessly. Whether you need a specialist consultation or a routine check-up, our platform allows you to browse verified doctors, read reviews, and schedule appointments with just a few clicks. With Sanjeevini X, expert care is always within reach, making your health our top priority.”
          </p>
        </div>

        {/* ------------ Center Section ------------ */}
        <div>
          <p className="text-xl font-medium mb-5 text-dark-text">COMPANY</p>
          <ul className="flex flex-col gap-2 text-dark-muted">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------------ Right Section ------------ */}
        <div>
          <p className="text-xl font-medium mb-5 text-dark-text">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-dark-muted">
            <li>+250-784-652-570</li>
            <li>xyz@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ------------ Copyright Text ------------ */}
      <div>
        <hr className="border-dark-border" />
        <p className="py-5 text-sm text-center text-dark-muted">
          Copyright © 2026 Nixantsingh943 - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

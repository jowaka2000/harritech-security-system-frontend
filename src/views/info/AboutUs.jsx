import React from "react";

const AboutUs = () => {
  return (
    <div className="space-y-10">
      <section className="flex w-full bg-pink-700 h-52 text-white rounded-br-full items-center   justify-center">
        <div className="font-serif">
          <h1 className="flex justify-center text-3xl font-black w-11/12 text-center">
            ABOUT HARRITECH
          </h1>
        </div>
      </section>

      <section className="p-3 space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-800">Harritech: Your Security, Our Priority</h1>
          <p className="text-slate-800 indent-10">
            At Harritech, we believe that security should never be compromised.
            Established with the goal of providing cutting-edge, reliable
            security solutions, we have grown into a trusted partner for homes,
            businesses, and industrial sites across Kenya. From sophisticated
            camera systems to advanced biometric access control and perimeter
            security, we offer a comprehensive range of products designed to
            protect what matters most to you.
          </p>
        </div>

        <div>
            <h1 className="font-black text-2xl text-gray-800">Our Mission</h1>
            <p className="text-slate-800 indent-10">To deliver innovative and reliable security solutions that guarantee peace of mind for our clients.            </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

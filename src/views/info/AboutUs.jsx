import React, { useEffect } from "react";
import {
  ShieldCheck,
  Users,
  Zap,
  Globe2,
  Lock,
  Headphones,
} from "lucide-react";

import ServiceDescription from "../../data/ServicesDescriptionData";
const AboutUs = () => {

    useEffect(() => {
      window.scrollTo(0, 0); // scroll to top when page loads
    }, []);
    
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative bg-pink-700 h-60 flex items-center justify-center rounded-br-[8rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-600 opacity-90"></div>
        <h1 className="relative z-10 text-white text-4xl md:text-5xl font-extrabold text-center">
          About Harristech
        </h1>
      </section>

      {/* Company story */}
      <section className="px-6 md:px-12 lg:px-24 space-y-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-gray-800">
          Harristech: Your Security, Our Priority
        </h2>
        <p className="text-gray-700 leading-relaxed indent-10">
          At Harristech, we believe that security should never be compromised.
          Established with the goal of providing cutting-edge, reliable
          solutions, we have grown into a trusted partner for homes, businesses,
          and industrial sites across Kenya. From sophisticated camera systems
          to advanced biometric access control and perimeter protection, our
          comprehensive range of products is designed to protect what matters
          most to you.
        </p>
      </section>




      {/* Mission / Vision */}
      <section className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            <p className="text-gray-700 mt-3 indent-10 leading-relaxed">
              To deliver innovative and reliable security solutions that
              guarantee peace of mind for our clients.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            <p className="text-gray-700 mt-3 indent-10 leading-relaxed">
              To be the leading security technology provider in Africa, known
              for excellence, innovation, and trust.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Explore Our Professional Security Solutions
          </h2>
          <p className="text-gray-600 mb-10">
            After defining our <strong>Mission</strong> and{" "}
            <strong>Vision</strong>, here’s what makes us stand out — a full
            range of security and technology solutions designed to protect and
            empower your home, business, and community.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(ServiceDescription).map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-2xl border hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Our Core Values</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <li className="bg-white shadow-md rounded-xl p-6 flex items-start gap-4">
            <ShieldCheck className="text-pink-600 w-6 h-6 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800">Integrity</h4>
              <p className="text-gray-600 text-sm">
                We uphold honesty and transparency in everything we do.
              </p>
            </div>
          </li>
          <li className="bg-white shadow-md rounded-xl p-6 flex items-start gap-4">
            <Users className="text-pink-600 w-6 h-6 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800">Customer Focus</h4>
              <p className="text-gray-600 text-sm">
                We listen, understand, and prioritize our clients’ needs.
              </p>
            </div>
          </li>
          <li className="bg-white shadow-md rounded-xl p-6 flex items-start gap-4">
            <Zap className="text-pink-600 w-6 h-6 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800">Innovation</h4>
              <p className="text-gray-600 text-sm">
                We embrace technology to deliver cutting-edge solutions.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose Harristech?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <Lock className="mx-auto text-pink-600 w-10 h-10 mb-4" />
              <h4 className="font-semibold text-gray-800">Trusted Security</h4>
              <p className="text-gray-600 text-sm mt-2">
                Our solutions are tested and trusted across diverse industries.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <Globe2 className="mx-auto text-pink-600 w-10 h-10 mb-4" />
              <h4 className="font-semibold text-gray-800">Wide Coverage</h4>
              <p className="text-gray-600 text-sm mt-2">
                Serving clients across Kenya with scalable solutions for every
                need.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <Headphones className="mx-auto text-pink-600 w-10 h-10 mb-4" />
              <h4 className="font-semibold text-gray-800">24/7 Support</h4>
              <p className="text-gray-600 text-sm mt-2">
                Our dedicated team is available anytime you need assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

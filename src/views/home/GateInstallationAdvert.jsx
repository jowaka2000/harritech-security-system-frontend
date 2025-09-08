import React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { useEffect } from "react";

const GateInstallationAdvert = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when page loads
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="flex w-full bg-pink-700 h-56 text-white items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-black">
            Automatic Gate Installation
          </h1>
          <p className="mt-2 text-lg font-medium">
            Professional security automation solutions by Harristech
          </p>
        </div>
      </section>

      {/* About the Service */}
      <section className="p-6 md:p-12 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Reliable Automatic Gate Installation in Kenya
          </h2>
          <p className="text-slate-700 leading-relaxed indent-10">
            At Harristech, we specialize in professional{" "}
            <strong>automatic gate installation</strong> for both homes and
            businesses across Kenya. Our team installs high-quality swing and
            sliding gate motors designed for durability, safety, and
            convenience. Whether you’re securing a residential compound, office,
            or industrial facility, our gates ensure controlled access and peace
            of mind.
          </p>
        </div>

        {/* Benefits Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Why Choose Harristech?
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Certified technicians with years of experience</li>
            <li>Durable and weather-resistant gate motors</li>
            <li>
              Custom solutions for residential, commercial, and industrial use
            </li>
            <li>Integration with access control and CCTV systems</li>
            <li>24/7 customer support and maintenance services</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="bg-pink-50 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-gray-900">
            Get a Free Consultation
          </h3>
          <p className="text-slate-700 mt-2">
            Ready to automate your gate? Contact our team today and we’ll guide
            you through the best solution for your property.
          </p>

          {/* Contact Options */}
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="tel:+254712345678"
              className="flex items-center gap-2 px-4 py-2 bg-pink-700 text-white rounded-lg shadow-md hover:bg-pink-800 transition"
            >
              <Phone className="w-4 h-4" /> +254 712 345 678
            </a>

            <a
              href="mailto:info@harristech.com"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
            >
              <Mail className="w-4 h-4" /> info@harristech.com
            </a>

            <a
              href="https://wa.me/254712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GateInstallationAdvert;

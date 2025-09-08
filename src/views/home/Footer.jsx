import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTools,
  FaCamera,
} from "react-icons/fa";
import { Link } from "react-router-dom";
  
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-600 to-pink-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h1 className="text-3xl font-black italic">{process.env.REACT_APP_WEBSITE_NAME}</h1>
          <p className="italic text-sm">Security Systems</p>
          <p className="mt-4 text-gray-200 text-sm">
            We provide trusted and reliable security solutions for homes,
            offices, and businesses.
          </p>
        </div>

        {/* Contacts */}
        <div>
          <h2 className="font-bold text-lg mb-3">Contact</h2>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> 0706 074 540
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> {process.env.REACT_APP_API_PUBLIC_EMAIL}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> Nairobi, Kenya
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="font-bold text-lg mb-3">Services</h2>
          <p className="flex items-center gap-2">
            <FaCamera /> CCTV Installation
          </p>
          <p className="flex items-center gap-2">
            <FaTools /> Electric Fence Installation
          </p>
          <p className="flex items-center gap-2">
            <FaTools /> Alarm Systems
          </p>
          <p className="flex items-center gap-2">
            <FaTools /> Access Control
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-bold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/security-systems/create-posts"
                className="hover:underline"
              >
                Request Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media + Copyright */}
      <div className="mt-10 border-t border-pink-400 pt-6 text-center space-y-4">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-xl">
          <a href="/" className="hover:text-pink-300">
            <FaFacebook />
          </a>
          <a href="/" className="hover:text-pink-300">
            <FaTwitter />
          </a>
          <a href="/" className="hover:text-pink-300">
            <FaInstagram />
          </a>
        </div>

        {/* Developed By */}
        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} {process.env.REACT_APP_WEBSITE_NAME} Security Systems. All Rights
          Reserved.
        </p>
        <p className="text-xs text-gray-300">
          Developed by <a href="https://github.com/jowaka2000" className="font-bold">John Kimemia</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

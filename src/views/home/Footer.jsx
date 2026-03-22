import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Video,
  Zap,
  Shield,
  UserCheck,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const websiteName = process.env.REACT_APP_WEBSITE_NAME || "Harristech";
  const email = process.env.REACT_APP_API_PUBLIC_EMAIL || "info@harristech.com";

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              {websiteName}
            </span>
            <span className="font-bold text-lg text-slate-400 -mt-1 italic">
              Security Systems
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            We provide trusted, advanced, and reliable security solutions tailored 
            to protect homes, offices, and businesses across the region.
          </p>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            Contact Us
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 group cursor-pointer">
              <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Phone</p>
                <a href="tel:+254706074540" className="text-slate-200 hover:text-white transition-colors">
                  0706 074 540
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3 group cursor-pointer">
              <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Email</p>
                <a href={`mailto:${email}`} className="text-slate-200 hover:text-white transition-colors">
                  {email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 p-2 bg-slate-800 rounded-lg">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Location</p>
                <p className="text-slate-200">Nairobi, Kenya</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Services Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Our Services
          </h3>
          <ul className="space-y-3">
            {[
              { icon: Video, text: "CCTV Installation" },
              { icon: Zap, text: "Electric Fencing" },
              { icon: Shield, text: "Alarm Systems" },
              { icon: UserCheck, text: "Access Control" },
            ].map((service, index) => (
              <li key={index} className="flex items-center gap-3 text-sm group cursor-default">
                <service.icon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">{service.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { name: "About Us", path: "/info/about-us" },
              { name: "Our Services", path: "/services" },
              { name: "Contact Us", path: "/info/contact-us" },
              { name: "Request Quote", path: "/security-systems/create-posts" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="flex items-center justify-between group text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {link.name}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 border-t border-slate-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Linkedin, href: "#" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Social Media"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right space-y-1">
            <p className="text-sm text-slate-500">
              © {currentYear} {websiteName} Security Systems. All Rights Reserved.
            </p>
            <p className="text-xs text-slate-600">
              Developed by{" "}
              <a
                href="https://github.com/jowaka2000"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-slate-400 hover:text-blue-500 transition-colors"
              >
                John Kimemia
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
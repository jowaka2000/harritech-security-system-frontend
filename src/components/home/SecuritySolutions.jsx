import React from "react";
import { Fingerprint, Shield, Bell, HelpCircle, ArrowRight } from "lucide-react";

const SecuritySolutions = () => {
  // Centralized data for easy management
  const solutions = [
    {
      title: "Biometric Systems",
      description: "Secure access control with cutting-edge fingerprint and facial recognition technology.",
      icon: Fingerprint,
      color: "bg-indigo-100 text-indigo-600",
      link: "/",
      label: "Explore Biometrics"
    },
    {
      title: "Perimeter Security",
      description: "Electric fences, automatic gates, and razor wire to protect your boundaries.",
      icon: Shield,
      color: "bg-blue-100 text-blue-600",
      link: "/",
      label: "View Perimeter Solutions"
    },
    {
      title: "Alarm Systems",
      description: "Advanced fire and intruder alarms designed to safeguard your property 24/7.",
      icon: Bell,
      color: "bg-red-100 text-red-600",
      link: "/",
      label: "Protect Your Home"
    },
    {
      title: "System Guidance",
      description: "Expert consultancy and professional installation guides for seamless system integration.",
      icon: HelpCircle,
      color: "bg-emerald-100 text-emerald-600",
      link: "/",
      label: "Get Guidance"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Our Security Solutions
          </h2>
          <p className="text-lg text-slate-600">
            Explore our range of reliable, modern, and professional security systems designed to safeguard your home, business, and community.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                {item.description}
              </p>

              {/* Link / Arrow */}
              {/* <div className="mt-auto flex items-center text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                {item.label}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div> */}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SecuritySolutions;
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ImageOff } from "lucide-react";

const SystemList = ({ systems }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {systems.map((system) => {
        const { id, name, public_url, front_image, shortDes } = system;

        return (
          <Link
            to={`/security-systems/${public_url}`}
            key={id}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
          > 
            {/* Image Container */}
            <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
              {front_image ? (
                <img
                  src={front_image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-slate-300">
                  <ImageOff className="w-8 h-8 mb-2" />
                  <span className="text-xs font-medium">No Image</span>
                </div>
              )}

              {/* Hover Overlay Gradient */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {name}
              </h3>

              <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1 leading-relaxed">
                {shortDes ||
                  "No description available for this system."}
              </p>

              <div className="flex items-center text-sm font-semibold text-slate-900 mt-auto group-hover:translate-x-1 transition-transform">
                View Details
                <ArrowRight className="w-4 h-4 ml-1 text-blue-600" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SystemList;

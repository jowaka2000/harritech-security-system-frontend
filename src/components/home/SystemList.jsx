import React from "react";
import { Link } from "react-router-dom";

const SystemList = ({systems}) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {systems.map((system) => {
        const { public_id, name, shortDescription, front_image } = system;

        return (
          <Link
            to={`/security-systems/${public_id}`}
            key={public_id}
            aria-label={`View ${name}`}
            className="relative group bg-white rounded-2xl shadow-md border border-slate-200 p-5 flex flex-col hover:shadow-xl transition-all duration-300"
          >
            {/* Badge */}
            <span className="absolute top-3 left-3 text-xs font-semibold bg-pink-600 text-white rounded-full px-3 py-1 shadow-sm">
              {name}
            </span>

            {/* Image */}
            <div className="flex justify-center items-center w-full h-40 md:h-48 overflow-hidden rounded-lg bg-slate-50">
              {front_image ? (
                <img
                  src={front_image}
                  alt={name}
                  className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <span className="text-slate-400 italic text-sm">
                  No image available
                </span>
              )}
            </div>

            {/* Info */}
            <div className="mt-4 flex-1 flex flex-col justify-between">
              <h3 className="text-base md:text-lg font-semibold text-slate-800 line-clamp-3">
                {shortDescription}
              </h3>

              {/* Learn More */}
              <div className="mt-4 flex justify-center">
                <span className="text-sm font-semibold text-green-700 group-hover:text-green-800 transition-colors">
                  Learn more →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default SystemList;

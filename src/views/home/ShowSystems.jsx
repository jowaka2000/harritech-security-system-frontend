import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ServiceDescription from "../../data/ServicesDescriptionData";
import loading from "../../assets/loading.gif";

const ShowSystems = () => {
  const params = useParams();
  const [currentSystem, setCurrentSystem] = useState({});
  const [currentSystemFunction, setCurrentSystemFunction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [testimonials, setTestimonials] = useState([
    {
      quote:
        "This system made our site safer and easier to manage — fast install, reliable, and excellent support.",
      name: "Sarah M.",
      role: "Facility Manager",
      project: "Commercial Property Client",
    },
    {
      quote:
        "The installation team was professional, and the system works flawlessly. I can now monitor my business remotely with complete peace of mind.",
      name: "James K.",
      role: "Business Owner",
      project: "Retail Security Project",
    },
  ]);

  const deSlugify = (slug) => {
    return slug
      .split("-") // break words by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize
      .join(" "); // join back with spaces
  };

  useEffect(() => {
    setCurrentSystem(ServiceDescription[deSlugify(params.system)]);
    setIsLoading(false);
  }, [params.system]);

  useEffect(() => {
    if (currentSystem !== undefined) {
      setCurrentSystemFunction(currentSystem.systemFunctions);
    }
  }, [currentSystem]);

  return (
    <div className="space-y-8">
      <div className="space-y-10">
        {/* HERO */}
        <section className="w-full bg-pink-700 text-white rounded-br-[10rem] md:rounded-br-none">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-12 ">
            {/* Left: Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black font-serif">
                {deSlugify(params.system).toUpperCase()}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-pink-100">
                Explore secure and modern solutions with Harritech.
              </p>
            </div>

            {/* Right: Extra Element for large screen */}
            <div className="flex-1 hidden md:flex justify-center">
              <img
                src="/hero-illustration.svg"
                alt="Hero Illustration"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </section>

        {isLoading && (
          <section className="flex justify-center pb-32 pt-20">
            <img src={loading} alt="loading" className="w-10 h-10" />
          </section>
        )}

        {/* LOADING */}
        {isLoading && (
          <section className="flex justify-center pb-32 pt-20">
            <img src={loading} alt="loading" className="w-10 h-10" />
          </section>
        )}

        {/* MAIN CONTENT: grid with max 2 columns on md+ (so each row ≤ 2 items) */}
        {!isLoading && currentSystem !== undefined && (
          <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Row 1: Name + Short description (left) | Image (right) */}
            <article className="space-y-3">
              <h2 className="font-black text-2xl mb-1 text-gray-800">
                {currentSystem.name}
              </h2>
              <p className="text-base md:text-lg leading-relaxed indent-6 text-gray-700">
                {currentSystem.shortDescription}
              </p>
            </article>

            <figure className="flex flex-col items-center">
              <img
                src={currentSystem.image.url}
                alt={currentSystem.image.alt}
                className="w-full max-h-80 object-cover rounded-xl shadow-md"
              />
              <figcaption className="text-xs italic text-gray-600 mt-2">
                {currentSystem.image.alt}
              </figcaption>
            </figure>

            {/* Row 2: Full Description (left) | Benefits (right) */}
            <article className="rounded-2xl rounded-tr-full rounded-bl-full bg-opacity-[0.1] p-4 bg-gradient-to-r from-pink-100 to-pink-200 ">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                Overview
              </h3>
              <p className="leading-relaxed text-gray-700">
                {currentSystem.fullDescription}
              </p>
            </article>

            <article></article>
            <article></article>

            <aside className="bg-pink-700 rounded-xl p-4  rounded-tl-full rounded-br-full bg-opacity-[0.1]">
              <h3 className="font-black text-lg mb-3 text-gray-800">
                {deSlugify(params.system)} Benefits
              </h3>
              <ol className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700">
                {currentSystemFunction &&
                  currentSystemFunction.map((b, i) => <li key={i}>{b}</li>)}
              </ol>
            </aside>

            {/* Row 3: Posts (left) | How it works (right) */}
            <article className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">
                Posts
              </h3>
              <div className="space-y-3">
                {/* Map real posts here; placeholders below */}
                <div className="border rounded-md p-3">
                  <h4 className="font-medium text-gray-800">
                    Sample post title
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Short excerpt from post...
                  </p>
                </div>

                <div className="border rounded-md p-3">
                  <h4 className="font-medium text-gray-800">Another post</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Short excerpt from post...
                  </p>
                </div>

                <div className="text-sm italic text-gray-500">
                  More posts coming soon...
                </div>
              </div>
            </article>

            {currentSystem && currentSystem.howItWorks && (
              <article className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  How it works
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {currentSystem.howItWorks.description}
                </p>
                <ul className="mt-3 list-inside list-decimal text-sm space-y-1 text-gray-700">
                  {currentSystem.howItWorks.keyPoints.map((point, index) => {
                    return <li key={index}>{point}</li>;
                  })}
                </ul>
              </article>
            )}

            {/* Row 4: Use Cases (left) | Testimonials (right) */}
            {currentSystem && currentSystem.useCases && (
              <article className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  Use cases
                </h3>
                <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                  {currentSystem.useCases.map((cases, index) => {
                    return <li key={index}>{cases}</li>;
                  })}
                </ul>
              </article>
            )}

            <article className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  Testimonials ({testimonials.length})
                </h3>
                <button
                  className="bg-pink-600 text-white text-xs md:text-sm px-3 py-1 rounded-lg shadow hover:bg-pink-700 transition"
                  onClick={() =>
                    alert("Feature coming soon: Add your testimony!")
                  }
                >
                  Share Testimony
                </button>
              </div>

              <div className="space-y-6">
                {testimonials.map((t, index) => (
                  <div key={index}>
                    <blockquote className="border-l-4 border-pink-600 pl-4 italic text-sm md:text-base text-gray-700">
                      "{t.quote}"
                    </blockquote>
                    <p className="mt-3 text-xs md:text-sm font-medium text-gray-600">
                      — {t.name}, {t.role}
                    </p>
                    <p className="text-xs text-gray-500">{t.project}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Row 5: About Harritech (left) | CTA / Request Quote (right) */}
            <aside className="bg-gradient-to-tr from-green-50 to-blue-50 rounded-lg p-4 shadow-sm rounded-tr-full rounded-bl-full bg-opacity-[0.1]">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                About Harritech
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Harritech specializes in security and automation solutions
                across East Africa. We design user-friendly systems that are
                robust enough for enterprise use but simple enough for
                homeowners.
              </p>
            </aside>

            <div className="flex flex-row gap-4 items-center justify-center md:flex-col md:items-end">
              <Link
                to="/contact"
                className="px-3 py-2 bg-pink-600 text-white rounded-md text-sm font-medium hover:bg-pink-700"
              >
                Contact Us
              </Link>
              <Link
                to="/security-systems/create-posts"
                className="px-3 py-2 border border-pink-600 text-pink-600 rounded-md text-sm font-medium hover:bg-pink-50"
              >
                Request Quote
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ShowSystems;

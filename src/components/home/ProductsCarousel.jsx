import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductsCarousel = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [products.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {title}
            </h3>
            <p className="text-slate-500 mt-1">Top selections from our catalog</p>
          </div>
          
          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-3 bg-white border border-slate-200 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-white border border-slate-200 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((product, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                {/* On mobile: 1 card, Tablet: 2 cards, Desktop: 4 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-8 bg-blue-600" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCarousel;
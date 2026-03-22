import React from "react";
import ProductCard from "./ProductCard";

const FeaturedProductsGrid = ({ products }) => {
  // Take the first 4 products for the grid
  const displayProducts = products.slice(0, 4);

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
          Trending Now
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsGrid;
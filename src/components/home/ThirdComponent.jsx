import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSecuritySystemsContextProvider } from "../../contexts/SecuritySystemsContextProvider";
import SystemList from "./SystemList";
import ProductsCarousel from "./ProductsCarousel";
import FeaturedProductsGrid from "./FeaturedProductsGrid";
import RequestServiceComponent from "./RequestServiceComponent";
import axiosClient from "../../axiosClient";

const ThirdComponent = () => {
  // Context for Categories
  const { productsAndSolutions } = useSecuritySystemsContextProvider();

  // State for Backend Products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // Helper function to capitalize first letter and lowercase the rest
  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  // Fetch Products from Backend
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/products")
      .then(({ data }) => {
        setProducts(data);
        // console.log(products)
        // setError(null);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        // setError("Failed to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Complete Security{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Solutions
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Explore our wide range of professional systems designed to secure
            every aspect of your property.
          </p>
        </div>

        {/* Loading State for Products */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* Dynamic Categories Loop */}
        <div className="space-y-8">
          {productsAndSolutions.map((category, index) => {
            // Format the name here
            const formattedName = capitalizeFirstLetter(category.name);
            const displayName =
              category.name === "guidance"
                ? formattedName
                : `${formattedName} System`;

            return (
              <div key={category.id}>
                {/* --- CATEGORY HEADER --- */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 whitespace-nowrap">
                      {/* Use the formatted name */}
                      {displayName}
                    </h2>
                    <div className="h-[3px] flex-1 bg-gradient-to-r from-blue-600 to-blue-200/20 rounded-full mt-3" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">
                    {category.elements?.length || 0} Products Available
                  </p>
                </div>

                {/* --- STANDARD PRODUCT GRID --- */}
                {category.elements && category.elements.length > 0 ? (
                  <SystemList systems={category.elements} />
                ) : (
                  <div className="p-8 bg-slate-50 rounded-xl text-center text-slate-500 border border-dashed border-slate-200">
                    Coming Soon
                  </div>
                )}

                {/* --- NEW: DYNAMIC INSERTIONS BETWEEN CATEGORIES --- */}

                {/* Insertion 1: After 1st Category (Index 0) */}
                {index === 0 && !loading && products.length > 0 && (
                  <ProductsCarousel
                    title="Top Rated Perimeter Security"
                    products={products.slice(0, 6)}
                  />
                )}

                {/* Insertion 2: After 2nd Category (Index 1) */}
                {index === 1 && <RequestServiceComponent />}

                {/* Insertion 3: After 3rd Category (Index 2) */}
                {index === 2 && !loading && products.length > 6 && (
                  <FeaturedProductsGrid products={products.slice(6, 10)} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThirdComponent;

import React from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Handle Image: Backend returns array `images[]`, Context returns string `front_image`
  const imageUrl = 
    (product.images && product.images.length > 0) 
      ? product.images[0] 
      : product.front_image; 

  // Handle Price: Backend returns number, Context might not have it
  const displayPrice = product.price 
    ? `KES ${Number(product.price).toLocaleString()}` 
    : "Contact for Price";

  // Determine Link: Backend has `public_id`, Context has `url` or `id`
  const linkTo = product.public_id 
    ? `/products/${product.public_id}` 
    : `/security-systems/${product.public_id || product.url}`;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-slate-100 overflow-hidden rounded-t-2xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">No Image</div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-slate-400 font-medium mb-2">{product.category || "Security System"}</p>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1 leading-relaxed">
          {product.shortDescription || "High quality security solution for your protection needs."}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-lg font-extrabold text-blue-600">{displayPrice}</span>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Order <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
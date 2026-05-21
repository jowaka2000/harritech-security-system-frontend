import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import { Loader2, Trash2 } from "lucide-react";

const CategoryPostBanner = ({ category }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { token, isAdmin } = useAuthContextProvider();

  // --- Fetch Post by Category ---
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // Call the index endpoint with category query param
        const response = await axiosClient.get(`/posts?category=${category}`);
        setPost(response.data);
      } catch (error) {
        console.error(`Error fetching post for category ${category}:`, error);
        // If 404 or any error, we just don't render anything
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchPost();
    }
  }, [category]);

  // --- Handle Delete ---
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      await axiosClient.delete(`/posts/${post.id}`);
      // Remove post from view so the component disappears gracefully
      setPost(null);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 bg-slate-200 rounded-2xl flex items-center justify-center animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
      </div>
    );
  }

  // --- Empty State (No post found) ---
  if (!post) {
    return null; // Return nothing to keep the layout clean
  }

  // --- Render Post Banner ---
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl group my-8 md:my-12 ">
      
      {/* Background Image */}
      <div className="w-full h-[350px] md:h-[500px] relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>
      </div>

      {/* Delete Button (Admin Only) */}
      {isAdmin && token && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-4 right-4 bg-white/10 backdrop-blur-md hover:bg-red-600/90 text-white p-3 rounded-full transition-all duration-300 z-20 border border-white/20"
          title="Delete Post"
        >
          {isDeleting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-10">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-md mb-3 shadow-lg">
            {post.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg mb-3">
            {post.title}
          </h2>
          <p className="text-slate-200 text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-3xl leading-relaxed">
            {post.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPostBanner;
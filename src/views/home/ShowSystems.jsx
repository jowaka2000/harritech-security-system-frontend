import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react"; // nice spinner icon
import axiosClient from "../../axiosClient";
import { Pencil } from "lucide-react";
import EditSystemModelComponent from "../../components/show/EditSystemModelComponent";
import { AddPost } from "../../components/show/AddPost";
const ShowSystems = () => {
  const { public_id } = useParams();

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

  const isAdmin = true;
  const [system, setSystem] = useState({ top_image: null, name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [topImage, setTopImage] = useState(
    system.top_image || "/hero-illustration.svg"
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [posts, setPosts] = useState([]); // optional:

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get(`/systems/${public_id}`)
      .then((res) => {
        setSystem(res.data);
        setTopImage(res.data.top_image);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching system:", err);
        setError("Failed to load system details. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [public_id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        <span className="ml-2 text-slate-600">Loading system...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        {error}
      </div>
    );
  }

  // Empty state
  if (!system) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        No system found.
      </div>
    );
  }

  // Handle saving a new post
  const handleSavePost = (formData) => {
    formData.append("system_id", system.public_id);

    axiosClient
      .post(`/posts/create/${system.public_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        // update local posts if you’re tracking them
        setPosts((prev) => [data, ...prev]);

        // close modal
        setIsPostModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    // Prepare upload
    const formData = new FormData();
    formData.append("top_image", file);

    setUploading(true);

    axiosClient
      .post(`/systems/${system.public_id}/upload-top-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setTopImage(res.data.top_image); // update state with new image URL
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        alert("Failed to upload image. Try again.");
      })
      .finally(() => setUploading(false));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageUpload = (file, type) => {
    if (!file) return;

    const formData = new FormData();
    formData.append(type, file);

    setUpdating(true);

    axiosClient
      .post(`/systems/${system.public_id}/upload-${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // Update state dynamically after successful upload
        if (type === "top-image") {
          system.top_image = res.data[type];
        } else if (type === "intermediate-image") {
          system.intermediate_image = res.data[type];
        }
      })
      .catch((err) => {
        console.error(`Error uploading ${type}:`, err);
        alert("Failed to upload image. Please try again.");
      })
      .finally(() => setUpdating(false));
  };

  // Handle front image upload
  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Only JPG, PNG, and WEBP images are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("front-image", file);

    setUploading(true);

    axiosClient
      .post(`/systems/${system.public_id}/upload-front-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        setSystem((prev) => ({ ...prev, front_image: data.front_image }));
      })
      .catch((err) => {
        console.error("Error uploading front image:", err);
        alert("Failed to upload image. Try again.");
      })
      .finally(() => setUploading(false));
  };

  // Save system details from modal
  const handleSaveDetails = (updatedData) => {
    axiosClient
      .put(`/systems/update/${system.public_id}`, updatedData)
      .then(({ data }) => {
        setSystem(data.system); // update parent state
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error("Error updating system:", err);
        alert("Failed to update system details.");
      });
  };
  const renderImageSection = (src, alt, type) => (
    <div className="relative flex flex-col items-center w-full">
      <img
        src={src || "/placeholder.png"}
        alt={alt}
        className="w-full max-h-80 object-cover rounded-xl shadow-md"
      />
      <figcaption className="text-xs italic text-gray-600 mt-2">
        {alt}
      </figcaption>

      {isAdmin && (
        <label className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100">
          <Pencil size={18} className="text-gray-700" />
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            disabled={updating}
            onChange={(e) => handleImageUpload(e.target.files[0], type)}
          />
        </label>
      )}
    </div>
  );

  return (
    <div className="space-y-8 relative">
      <div className="space-y-10">
        {/* HERO */}
        <section className="w-full bg-pink-700 text-white rounded-br-[10rem] md:rounded-br-none relative">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-12">
            {/* Left: Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black font-serif">
                {system.name}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-pink-100">
                Explore secure and modern solutions with Harritech.
              </p>
            </div>

            {/* Right: Image Section */}
            <div className="flex-1 flex justify-center relative">
              <img
                src={topImage || "/hero-illustration.svg"}
                alt="System Hero"
                className="w-64 h-64 object-contain rounded-lg shadow-lg border border-slate-200"
              />

              {/* Pencil Button (Only Admin) */}
              {isAdmin && (
                <>
                  <button
                    onClick={triggerFileInput}
                    className="absolute top-2 right-2 bg-white text-pink-700 p-2 rounded-full shadow hover:bg-pink-100 transition"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <span className="animate-spin w-4 h-4 border-2 border-pink-700 border-t-transparent rounded-full inline-block"></span>
                    ) : (
                      <Pencil size={16} />
                    )}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* MAIN CONTENT: grid with max 2 columns on md+ (so each row ≤ 2 items) */}
        <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Row 1: Name + Short description (left) | Image (right) */}
          {/* Text Info */}
          {/* Text (sticks to bottom on large screens) */}
          <article className="lg:flex-1 lg:self-end space-y-3  md:pb-12">
            <h2 className="font-black text-2xl mb-1 text-gray-800">
              {system.name}
            </h2>
            <p className="text-base md:text-lg leading-relaxed indent-6 text-gray-700">
              {system.shortDescription}
            </p>
          </article>

          {/* Intermediate Image */}
          <figure>
            {renderImageSection(
              system.intermediate_image,
              system.name,
              "intermediate-image"
            )}
          </figure>

          {/* Row 2: Full Description (left) | Benefits (right) */}
          <article className="rounded-2xl rounded-tr-full rounded-bl-full bg-opacity-[0.1] p-4 bg-gradient-to-r from-pink-100 to-pink-200 ">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              Overview
            </h3>
            <p className="leading-relaxed text-gray-700">
              {system.fullDescription}
            </p>
          </article>

          <article></article>
          <article></article>

          <aside className="bg-pink-700 rounded-xl p-4  rounded-tl-full rounded-br-full bg-opacity-[0.1]">
            <h3 className="font-black text-lg mb-3 text-gray-800">
              {system.name} Benefits
            </h3>
            <ol className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700">
              {system.systemFunctions.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ol>
          </aside>

          {/* Row 3: Posts (left) | How it works (right) */}
          <article className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">Posts</h3>
            <div className="space-y-3">
              {/* Map real posts here; placeholders below */}
              <div className="border rounded-md p-3">
                <h4 className="font-medium text-gray-800">Sample post title</h4>
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

          {system && system.howItWorks && (
            <article className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                How it works
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {system.howItWorks.description}
              </p>
              <ul className="mt-3 list-inside list-decimal text-sm space-y-1 text-gray-700">
                {system.howItWorks.keyPoints.map((point, index) => {
                  return <li key={index}>{point}</li>;
                })}
              </ul>
            </article>
          )}

          {/* Row 4: Use Cases (left) | Testimonials (right) */}
          {system && system.useCases && (
            <article className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                Use cases
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                {system.useCases.map((cases, index) => {
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
              Harritech specializes in security and automation solutions across
              East Africa. We design user-friendly systems that are robust
              enough for enterprise use but simple enough for homeowners.
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
      </div>

      {/* Bottom Action Buttons */}
      <div className="fixed bottom-6 left-0 right-0 flex flex-col md:flex-row justify-center gap-4 px-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Edit Front Image */}
          <label className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 shadow-md w-full md:w-auto">
            <Pencil className="w-4 h-4" />
            {uploading ? "Uploading..." : "Edit Front Image"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFrontImageChange}
              className="hidden"
              disabled={uploading}
            />
          </label>

          {/* Edit System Details */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 shadow-md w-full md:w-auto"
          >
            <Pencil className="w-4 h-4" />
            Edit Details
          </button>

          {/* Add Post (New Button) */}
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md w-full md:w-auto"
          >
            <Pencil className="w-4 h-4" />
            Add Post
          </button>
        </div>
      </div>

      {/* Edit System Modal */}
      <EditSystemModelComponent
        system={system}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDetails}
      />

      {/* Add Post Modal */}
      <AddPost
        systemId={system.public_id}
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSave={handleSavePost}
      />
    </div>
  );
};

export default ShowSystems;

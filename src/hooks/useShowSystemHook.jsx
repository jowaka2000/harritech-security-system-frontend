import { useState } from "react";
import axiosClient from "../axiosClient";

export const useShowSystemHook = () => {
  // System State
  const [system, setSystem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topImage, setTopImage] = useState("");
  const [uploading, setUploading] = useState(false);
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Product State
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // Add Product Form State
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    device: "", // Added to match backend schema
    description: "", // Mapped from shortDes
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the actual file object

  // --- Fetch Products for a specific System ---
  const fetchProducts = (systemId) => {
    if (!systemId) return;
    
    setProductsLoading(true);
    setProductsError(null);
    
    axiosClient
      .get(`/products?system_id=${systemId}`)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
        setProductsError("Failed to load products.");
      })
      .finally(() => setProductsLoading(false));
  };

  // --- Create Product ---
  const createProduct = async (e) => {
    e.preventDefault();

    // 1. Prepare Data
    const formData = new FormData();
    
    // Backend expects a 'payload' JSON string
    const payload = {
      system_id: system.id, // Must be the integer ID
      name: productForm.name,
      device: productForm.device,
      price: productForm.price,
      description: productForm.description,
    };
    
    formData.append("payload", JSON.stringify(payload));

    // Append images (backend accepts array)
    if (imageFile) {
      formData.append("images[]", imageFile); 
    }

    try {
      // 2. Send to Backend
      const { data } = await axiosClient.post("/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 3. Update Local State (Optimistic UI)
      // The backend returns the created product with images array
      setProducts((prev) => [data.product, ...prev]);
      
      // 4. Reset & Close
      setIsProductModalOpen(false);
      resetProductForm();
    } catch (err) {
      console.error(err);
      alert("Failed to create product. Check console for errors.");
    }
  };

  // --- Delete Product ---
  const deleteProduct = async (public_id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axiosClient.delete(`/products/${public_id}`);
      // Remove from state
      setProducts((prev) => prev.filter((p) => p.public_id !== public_id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const resetProductForm = () => {
    setProductForm({ name: "", price: "", device: "", description: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  return {
    // System State
    system,
    setSystem,
    loading,
    setLoading,
    error,
    setError,
    topImage,
    setTopImage,
    uploading,
    setUploading,
    
    // Modals
    isModalOpen,
    setIsModalOpen,
    isRequestModalOpen,
    setIsRequestModalOpen,
    isProductModalOpen,
    setIsProductModalOpen,

    // Products Data
    products,
    setProducts,
    productsLoading,
    setProductsLoading,
    productsError,
    setProductsError,
    
    // Product Actions
    fetchProducts,
    createProduct,
    deleteProduct,

    // Product Form
    productForm,
    setProductForm,
    imagePreview,
    setImagePreview,
    imageFile,
    setImageFile,
    resetProductForm,
  };
};
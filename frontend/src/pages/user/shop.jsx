import React, { useState, useEffect } from "react";
import { FaSort, FaThLarge, FaList } from "react-icons/fa";
import Navbar from "../../components/user/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import summaryApi from "../../common/user";
import ProductCard from "../../components/user/ProductCard";

const Shop = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(12);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // Categories Array
  const categories = [
    "All",
    "Saree",
    "Boys wear",
    "Girls wear",
    "Ganzy clothes",
    "Sleep wear",
    "Summer wear",
  ];

  // Fetch all products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(summaryApi.allProducts.url, {
          method: summaryApi.allProducts.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          setProducts(data.data); // Storing fetched products
          setFilteredProducts(data.data); // Setting filtered products initially
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
    setLoadMore(8);
  };

  const sortProducts = (sortBy) => {
    let sorted = [...filteredProducts];
    switch (sortBy) {
      case "price":
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "rating":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleLoadMore = () => setLoadMore((prevLoadMore) => prevLoadMore + 8);

  return (
    <>
      <Helmet>
        <title>Shop | SaiFashionZone By Raiba</title>
      </Helmet>
      <div className="bg-white min-h-screen">
        {/* Filters Section */}
        <div className="max-w-7xl mx-auto px-12 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left Section - Category Filters */}
            <div className="flex items-center space-x-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => filterProducts(category)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === category
                      ? "bg-pink-500 text-white"
                      : "bg-pink-100 text-pink-800"
                  } hover:bg-pink-500 hover:text-white transition`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right Section - Sorting and View Modes */}
            <div className="flex items-center space-x-4">
              {/* Sorting Dropdown */}
              <div className="flex items-center">
                <FaSort className="mr-2 text-pink-800" />
                <select
                  className="border-pink-300 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 transition"
                  onChange={(e) => sortProducts(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* View Mode Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-pink-500 text-white"
                      : "bg-pink-100 text-pink-800"
                  } hover:bg-pink-500 hover:text-white transition`}
                >
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-pink-500 text-white"
                      : "bg-pink-100 text-pink-800"
                  } hover:bg-pink-500 hover:text-white transition`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="max-w-6xl px-10  py-8 ">
          <AnimatePresence>
            <motion.div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 "
                  : "grid-cols-1 gap-6"
              }`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.2,
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredProducts.slice(0, loadMore).map((product) => (
                <div key={product._id} className="flex justify-center">
                  <ProductCard
                    product={product}
                    onClick={() => navigate(`/product/${product._id}`)} // Navigate to Product Details
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-12">
            {loadMore < filteredProducts.length ? (
              <button onClick={handleLoadMore}>Load More</button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

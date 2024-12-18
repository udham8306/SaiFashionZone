// components/user/ProductCard.js
import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div
      key={product._id}
      className="bg-white shadow-sm  rounded-xl overflow-hidden relative cursor-pointer"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
      }}
      onClick={onClick} // Navigate to Product Details on click
    >
      <div className="relative w-full h-72 bg-white">
        <img
          src={product.imgFiles[0]} // Display the first image of the product
          alt={product.name}
          className="w-full h-full object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-lg overflow-hidden text-ellipsis line-clamp-2">{product.name}</h4>
        <p className="text-lg font-bold text-gray-800">₹{product.price}</p>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStockValue > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

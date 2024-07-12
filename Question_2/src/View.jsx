import React, { useEffect, useState } from "react";
import axios from "axios";

const View = () => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchProduct() {
      const productId = JSON.parse(localStorage.getItem("id"));
      try {
        const response = await axios.get(`http://localhost:8080/categories/xy/products/${productId}`);
        
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="flex items-center justify-center p-4 bg-blue-600">
          <img src="https://img.freepik.com/premium-photo/collection-headphones-laptop-table-with-wall-them_662214-541086.jpg" alt={product.productName} className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md" />
        </div>
        <div className="p-6 bg-blue-600">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">{product.productName}</h2>
          <p className="text-blue-200 text-center">ID: {product.id}</p>
        </div>
        <div className="px-6 py-4">
          <p className="text-lg text-gray-800 mb-2">
            Price: <span className="font-semibold text-green-600">Rs.{product.price}</span>
          </p>
          <p className="text-lg text-gray-800 mb-2">
            Rating: <span className="font-semibold text-yellow-500">{product.rating}</span>
          </p>
          <p className="text-lg text-gray-800 mb-2">
            Discount: <span className="font-semibold text-red-600">{product.discount}%</span>
          </p>
          <p className="text-lg text-gray-800 mb-2">
            Availability: <span className="font-semibold">{product.availability}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default View;

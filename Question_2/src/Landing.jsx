import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  async function view_item(id) {
    localStorage.setItem("id", JSON.stringify(id));
    navigate("/view");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let categoryname = e.target.category.value;
    let n = e.target.n.value;
    let parameter = e.target.parameter.value;
    let method = e.target.method.value;
    let companyName = e.target.company.value;

    if (n > 10) {
      alert("Enter page number");
      return;
    }

    try {
      let response = await axios.get(
        `http://localhost:8080/categories/${categoryname}/products?parameter=${parameter}&n=${n}&method=${method}&companyName=${companyName}`
      );
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md"
            onClick={toggleFormVisibility}
          >
            {formVisible ? "Hide Form" : "Show Form"}
          </button>
        </div>
        {formVisible && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-white p-6 rounded-lg shadow-lg">
            <fieldset className="border p-4 rounded-lg shadow-md bg-gray-50">
              <legend className="text-xl font-semibold mb-2">Category</legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["Phone", "Computer", "Tv", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"].map(category => (
                  <div key={category}>
                    <input
                      type="radio"
                      name="category"
                      id={category.toLowerCase()}
                      value={category}
                      className="mr-2"
                    />
                    <label htmlFor={category.toLowerCase()}>{category}</label>
                  </div>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="n" className="block font-semibold mb-1">
                No of Items
              </label>
              <input
                type="number"
                name="n"
                id="n"
                className="border rounded py-2 px-3 w-full"
              />
            </div>

            <fieldset className="border p-4 rounded-lg shadow-md bg-gray-50">
              <legend className="text-xl font-semibold mb-2">Filter Basis</legend>
              <div className="space-y-2">
                {["price", "rating", "discount"].map(param => (
                  <div key={param}>
                    <input
                      type="radio"
                      name="parameter"
                      id={param}
                      value={param}
                      className="mr-2"
                    />
                    <label htmlFor={param}>{param.charAt(0).toUpperCase() + param.slice(1)}</label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="border p-4 rounded-lg shadow-md bg-gray-50">
              <legend className="text-xl font-semibold mb-2">Order</legend>
              <div className="space-y-2">
                {["Ascending", "Descending"].map(order => (
                  <div key={order}>
                    <input
                      type="radio"
                      name="method"
                      id={order.toLowerCase()}
                      value={order}
                      className="mr-2"
                    />
                    <label htmlFor={order.toLowerCase()}>{order}</label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="border p-4 rounded-lg shadow-md bg-gray-50">
              <legend className="text-xl font-semibold mb-2">Company</legend>
              <div className="grid grid-cols-2 gap-4">
                {["AMZ", "FLP", "SNP", "MYN", "AZO"].map(company => (
                  <div key={company}>
                    <input
                      type="radio"
                      name="company"
                      id={company}
                      value={company}
                      className="mr-2"
                    />
                    <label htmlFor={company}>{company}</label>
                  </div>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300 shadow-md"
            >
              Filter
            </button>
          </form>
        )}

        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Products List</h2>
          <ul className="space-y-4">
            {products.map(product => (
              <li key={product.id} className="border rounded-lg p-4 shadow-md flex flex-col md:flex-row md:items-center md:justify-between bg-white">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                  <img src="https://img.freepik.com/premium-photo/collection-headphones-laptop-table-with-wall-them_662214-541086.jpg" alt={product.productName} className="w-32 h-32 object-cover rounded-lg" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-gray-800">{product.productName}</h3>
                  <p className="text-lg text-gray-700">Price: Rs.{product.price}</p>
                  <p className="text-gray-700">Rating: {product.rating}</p>
                  <p className="text-gray-700">Discount: {product.discount}%</p>
                  <p className="text-gray-700">Availability: {product.availability}</p>
                </div>
                <button
                  onClick={() => view_item(product.id)}
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0 transition duration-300 shadow-md"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;

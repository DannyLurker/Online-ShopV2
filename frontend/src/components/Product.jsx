import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product`);
      setProductData(response.data);
      console.log(response);
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
      setError(e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <button className="flex items-center button mt-10 ml-8">
        <Link to={"/product/add"}>
          <span className="font-bold text-xl">+</span> Add Product
        </Link>
      </button>

      {error && (
        <div className="flex flex-col justify-center text-center items-center h-[78vh] sm:h-[80vh] font-bold text-5xl ">
          <h1>! 404 !</h1>
          <div> {error}</div>
        </div>
      )}

      {productData.length > 0 && (
        <div>
          <h1 className="text-3xl font-bold">Product List</h1>
          <ul>
            {productData.map((product) => (
              <li key={product._id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Product;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescrition] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/product/add`,
        {
          name,
          description,
          price,
        },
        { withCredentials: true }
      );
      navigate("/product");
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[78vh] sm:[80vh] ">
        <div className="w-[320px] sm:w-[50%] sm:h-[60%] max-w-[1240px] max-h-[960px] bg-[#cdb4db] opacity-85 rounded-md shadow-sm p-2">
          <div className="flex justify-center flex-col text-center mt-4">
            <h1 className="text-2xl font-bold mb-16">Add a new product</h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 w-full"
            >
              <input
                type="text"
                className="input sm:w-[60%]"
                placeholder="Product name..."
                minLength={3}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="input sm:w-[60%]"
                placeholder="Description..."
                minLength={3}
                required
                value={description}
                onChange={(e) => setDescrition(e.target.value)}
              />
              <input
                type="number"
                className="input sm:w-[60%]"
                placeholder="Price..."
                minLength={1}
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <button className="button-submit w-[20%] mt-8" type="sumbit">
                Sumbit
              </button>
            </form>
            <div className="ml-4 mt-8">
              <Link to="/product">
                <FaArrowLeft />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

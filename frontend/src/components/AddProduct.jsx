import React, { useState } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescrition] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/product/add`,
        {
          name,
          description,
          price,
        },
        { withCredentials: true }
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/product");
      }
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
      const errorData = e.response?.data;

      setError(
        Array.isArray(errorData?.error)
          ? errorData.error.map((err) => err.msg)
          : [errorData?.message || "An error occurred"]
      );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[78vh] sm:[80vh] flex-col">
        <ErrorMessage error={error} />
        <div className="w-[400px] h-[400px] sm:w-[50%] max-w-[1240px] max-h-[960px] bg-[#cdb4db] opacity-85 rounded-md shadow-sm p-2">
          <div className="flex justify-center flex-col text-center mt-4 relative">
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
              <textarea
                type="text"
                className="input sm:w-[60%]"
                placeholder="Description..."
                minLength={3}
                required
                value={description}
                onChange={(e) => setDescrition(e.target.value)}
              />
              <div className="relative sm:w-[60%] ">
                <input
                  type="number"
                  className="input w-full pl-6"
                  placeholder="Price..."
                  minLength={1}
                  min={1}
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <p className="absolute left-0 top-0">Rp</p>
              </div>

              <button type="submit" className="button-submit w-[20%] mt-4">
                Sumbit
              </button>
              <div className="absolute bottom-4 left-2">
                <Link to={"/product"}>
                  <FaArrowLeft />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

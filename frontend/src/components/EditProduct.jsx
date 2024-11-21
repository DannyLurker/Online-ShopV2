import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescrition] = useState("");
  const [price, setPrice] = useState(0);
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("userId", userId);
      const response = await axios.put(
        `http://localhost:3000/product/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/product");
      }
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/product/edit/${id}`
      );
      setName(response.data.product.name);
      setDescrition(response.data.product.description);
      setPrice(response.data.product.price);
      setUserId(response.data.product._id);
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-[78vh] sm:[80vh] flex-col mt-16">
        <div className="w-[320px] max-h-[310px] sm:w-[50%] sm:max-w-[1240px] sm:max-h-[960px] bg-[#cdb4db] opacity-85 rounded-md shadow-sm p-2">
          <div className="flex justify-center flex-col text-center mt-4 relative">
            <h1 className="text-2xl font-bold mb-2">Edit Product</h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 w-full"
            >
              <input
                type="file"
                name="image"
                className="input w-[68%] sm:pl-0 sm:w-[60%]"
                placeholder="Image file..."
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
              <input
                type="text"
                className="input w-[68%] sm:pl-0 sm:w-[60%] "
                placeholder="Product name..."
                minLength={3}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                type="text"
                className="w-[68%] sm:w-[60%] outline-none bg-transparent border-gray-500 border-2 px-1 py-0.5"
                minLength={3}
                placeholder="Description Box"
                required
                value={description}
                onChange={(e) => setDescrition(e.target.value)}
              />
              <div className="relative sm:w-[60%]">
                <input
                  type="number"
                  className="input w-full pl-6 m-0"
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

export default EditProduct;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const Information = () => {
  const [productData, setProductData] = useState({});
  const { id } = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/information/${id}`
      );
      setProductData(response.data.product);
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[78vh] sm:h-[80vh] mt-16">
        <h1 className="text-5xl font-bold mb-4">Information</h1>
        <div className="bg-[#bde0fe] min-h-fit w-[270px] sm:w-[550px]  md:w-[650px] lg:w-[960px] rounded-md shadow-md p-2">
          <img
            src={`http://localhost:3000${productData.imageUrl}`}
            alt={`${productData.imageUrl}`}
            className="rounded-md  max-h-[200px]  sm:max-h-[250px]  md:max-h-[300px]  lg:max-h-[400px] mx-auto mt-2"
          />
          <h2 className="sm:text-xl font-medium">{productData.name}</h2>
          <h3 className="font-medium">Description : </h3>
          <p className="bg-[#cfe7fc] h-20 text-wrap text-sm overflow-y-auto">
            {productData.description}
          </p>
          <p className=" sm:text-xl font-medium">{productData.price}</p>
          <Link to={"/marketplace"}>
            <FaArrowLeft className="mt-1.5" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Information;

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
      <div className="flex justify-center items-center h-[78vh] sm:h-[80vh]">
        <div className="bg-[#bde0fe] w-[270px] h-max-[350px] rounded-md shadow-md p-2">
          <img src="../photo-1701338678701-c053ba5d6ee1.jpeg" alt="PHT" />
          <h2 className="sm:text-xl font-medium">{productData.name}</h2>
          <h3>Description : </h3>
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

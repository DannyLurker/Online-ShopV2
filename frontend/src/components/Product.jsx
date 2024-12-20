import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../componetsPart/Card.jsx";
import { IoPencilOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Popup from "../componetsPart/Popup.jsx";

const Product = () => {
  const [productDatas, setProductDatas] = useState([]);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product`, {
        withCredentials: true,
      });
      setProductDatas(response?.data?.product);
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
      setError(e.response?.data?.message || e.message);
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:3000/product/delete`, {
        params: {
          id: id,
        },
      });
      setIsOpen(false);
      window.location.reload();
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
      setIsOpen(false);
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
          <div>{error}</div>
        </div>
      )}

      {isOpen && <Popup togglePopup={togglePopup} deleteData={deleteData} />}

      {productDatas.length > 0 && (
        <div className="grid place-content-around grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-2 gap-2">
          {productDatas.map((product, index) => (
            <div key={index}>
              <Card
                name={product.name}
                price={product.price}
                imgUrl={product.proId}
              >
                <div className="flex mt-1.5">
                  <Link to={`/product/edit/${product._id}`}>
                    <IoPencilOutline className="w-10 h-6 sm:w-12 sm:h-8" />
                  </Link>
                  <div
                    onClick={() => {
                      setId(product._id);
                      togglePopup();
                    }}
                    className="cursor-pointer"
                  >
                    <MdDelete className="w-10 h-6 sm:w-12 sm:h-8" />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Product;

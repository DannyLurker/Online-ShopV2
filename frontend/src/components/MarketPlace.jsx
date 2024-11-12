import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";

const MarketPlace = () => {
  const [productDatas, setProductDatas] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/marketplace`);
      setProductDatas(response?.data?.products);
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {productDatas.length > 0 && (
        <div className="grid place-content-around grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-2 gap-2 pt-10">
          {productDatas.map((product, index) => (
            <div key={index}>
              <Card name={product.name} price={product.price}>
                <Link to={`/information/${product._id}`}>
                  <BsInfoCircle className="w-10 h-6 sm:w-12 sm:h-8 mt-1.5" />
                </Link>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MarketPlace;

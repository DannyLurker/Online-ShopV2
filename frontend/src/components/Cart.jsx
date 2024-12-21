import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../componetsPart/Card";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";

const Cart = () => {
  const [cartsData, setCartsData] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cart`, {
        withCredentials: true,
      });

      setCartsData(response.data.formattedCarts);
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
      setError(e.response?.data?.message || e.message);
      console;
    }
  };

  useEffect(() => {
    getData();
  }, [cartsData]);
  return (
    <>
      {error && (
        <div className="flex flex-col justify-center text-center items-center h-[78vh] sm:h-[80vh] font-bold text-5xl ">
          <h1>! 404 !</h1>
          <div>{error}</div>
        </div>
      )}

      <div className="grid p-2 place-content-around grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6  gap-2 pt-10">
        {cartsData &&
          cartsData.map((cart) => (
            <Card name={cart.name} price={cart.price}>
              <Link to={`/information/${cart.informationId}`}>
                <BsInfoCircle className="w-10 h-6 sm:w-12 sm:h-8 mt-1.5" />
              </Link>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Cart;

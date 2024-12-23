import axios from "axios";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const BuyPopup = ({ setIsOpen, setName, setPrice, setCart_Id }) => {
  const name = setName;
  const price = setPrice;
  const _id = setCart_Id;
  const [error, setError] = useState("");

  const postDataToHistory = async () => {
    try {
      await axios.post(
        `http://localhost:3000/history/addData`,
        {
          name,
          price,
        },
        {
          withCredentials: true,
        }
      );
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
    }
  };

  const deleteDataCart = async () => {
    try {
      await axios.delete(`http://localhost:3000/cart/deleteData`, {
        params: {
          _id,
        },
      });
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
    }
  };

  const putDataWallet = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/wallet/changeData`,
        {
          price,
        },
        {
          withCredentials: true,
        }
      );

      return response;
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
      setError(e.response.data.message);
      throw e;
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await putDataWallet();
      if (response?.status === 400) {
        return;
      }

      await postDataToHistory();
      await deleteDataCart();
      window.location.reload();
    } catch (e) {
      console.error("Error during purchase:", e.response?.data || e.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="text-center w-[180px] h-fit sm:w-[300px] bg-[#ffc8dd] rounded-md  m-1 p-1.5 shadow-md">
        <p className="flex justify-end cursor-pointer" onClick={setIsOpen}>
          <IoCloseSharp className="w-5 h-5 sm:w-10 sm:h-10 font-bold" />
        </p>
        <h2 className="mb-4 sm:mb-8 sm:text-xl">
          {error.length === 0
            ? `Are you sure to buy ${name}? It will cost ${price}`
            : error}
        </h2>

        {error.length === 0 ? (
          <button
            className="button rounded-sm w-70% h-11 bg-green-500 hover:bg-green-400"
            onClick={handlePurchase}
          >
            buy
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BuyPopup;

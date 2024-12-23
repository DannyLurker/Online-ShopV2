import axios from "axios";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const CartPopup = ({
  setIsOpen,
  setProductName,
  setProductPrice,
  setProductDescription,
  setProductId,
  setInformationId,
}) => {
  const postData = async () => {
    try {
      await axios.post(
        `http://localhost:3000/cart/postData`,
        {
          name: setProductName,
          price: setProductPrice,
          description: setProductDescription,
          productId: setProductId,
          informationId: setInformationId,
        },
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="text-center w-[180px] h-[130px] sm:w-[300px] sm:h-[200px] bg-[#ffc8dd] rounded-md  m-1 p-1.5 shadow-md">
        <p className="flex justify-end cursor-pointer" onClick={setIsOpen}>
          <IoCloseSharp className="w-5 h-5 sm:w-10 sm:h-10 font-bold" />
        </p>
        <h2 className="mb-4 sm:mb-8 sm:text-xl">
          Are you sure to add {setProductName} into cart ?
        </h2>
        <button
          onClick={postData}
          className="button rounded-sm w-70% h-11 bg-green-500 hover:bg-green-400"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CartPopup;

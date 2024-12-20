import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const PopupBuy = ({ setTogglePopup, OSV2_Point }) => {
  const [formatBalance, setFormatBalance] = useState("");
  const [unFormatBalance, setUnFormatBalance] = useState(0);

  const formatNumber = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/wallet/formatNumber`,
        {
          balance: OSV2_Point,
        }
      );
      console.log(response);
      setFormatBalance(response.data.balance);
      setUnFormatBalance(response.data.unFormatBalance);
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    }
  };

  const postData = async () => {
    try {
      await axios.post(
        "http://localhost:3000/wallet/topup",
        {
          balance: unFormatBalance,
        },
        {
          withCredentials: true,
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    }
  };

  useEffect(() => {
    formatNumber();
  }, [OSV2_Point]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="text-center w-[180px] h-fit sm:w-[300px] bg-[#ffc8dd] rounded-md  m-1 p-1.5 shadow-md">
        <p className="flex justify-end cursor-pointer" onClick={setTogglePopup}>
          <IoCloseSharp className="w-5 h-5 sm:w-10 sm:h-10 font-bold" />
        </p>
        <h2 className="mb-4 sm:mb-8 sm:text-xl">
          Are you sure to buy {OSV2_Point.toLocaleString()} Points ? It will
          cost {formatBalance}
        </h2>
        <button
          className="button rounded-sm w-70% h-11 bg-green-500 hover:bg-green-400"
          onClick={postData}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default PopupBuy;

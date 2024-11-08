import React from "react";
import { BsCart2 } from "react-icons/bs";

const Card = ({ name, price }) => {
  return (
    <div className="max-w-[420px] max-h-[470px] p-2 rounded-md shadow-sm bg-[#bde0fe]">
      <img
        src="../dea3499418a115708ebd31a95c89789b.jpg"
        className="rounded-md overflow-hidden"
        alt=""
      />
      <h2 className="font-medium sm:text-2xl">{name}</h2>
      <p className="sm:text-xl">{price}</p>
      <BsCart2 className="bg-[#a2d2ff] w-10 h-6 sm:w-12 sm:h-8 rounded-md py-1 cursor-pointer mt-1.5" />
    </div>
  );
};

export default Card;

import React from "react";

const Card = ({ children, name, price }) => {
  return (
    <div className="max-w-[420px] max-h-[470px] p-2 rounded-md shadow-sm bg-[#bde0fe]">
      <img
        src="../dea3499418a115708ebd31a95c89789b.jpg"
        className="rounded-md overflow-hidden"
        alt=""
      />
      <h2 className="sm:text-xl clamp-text">{name}</h2>
      <p className="sm:text-xl font-medium clamp-text">{price}</p>
      <div className="flex">{children}</div>
    </div>
  );
};

export default Card;

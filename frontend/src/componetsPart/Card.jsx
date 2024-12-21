import React from "react";

const Card = ({ children, name, price, imgUrl }) => {
  return (
    <div className="border-[#ffc8dd] border-2 min-w-[140px] min-h-[150px] sm:max-w-[420px] sm:max-h-[470px] p-2 rounded-md shadow-sm bg-[#bde0fe]">
      <img
        src={imgUrl}
        className="rounded-md overflow-hidden object-cover w-[280px] h-[190px] sm:max-w-[260px] sm:max-h-[470px] md:max-w-[230px] lg:max-w-[235px] xl:max-w-[190px] 2xl:max-w-[240px] mx-auto"
        alt={`${imgUrl}`}
      />
      <h2 className="sm:text-xl clamp-text">{name}</h2>
      <p className="sm:text-xl font-medium clamp-text">{price}</p>
      <div className="flex">{children}</div>
    </div>
  );
};

export default Card;

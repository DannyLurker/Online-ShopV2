import React from "react";

const TopupCard = ({ children, onClick }) => {
  return (
    <div className="flex justify-between bg-[#ffc8dd] h-[30px] p-0.5 pl-1 font-semibold cursor-pointer">
      <p>{children}</p>
      <button className="bg-[#bde0fe] button" onClick={onClick}>
        Buy
      </button>
    </div>
  );
};

export default TopupCard;

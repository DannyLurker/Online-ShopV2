import React from "react";

const Spinner = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="w-20 h-20 rounded-full border-4 border-[#cdb4db] border-dashed animate-spin-slow"></div>
    </div>
  );
};

export default Spinner;

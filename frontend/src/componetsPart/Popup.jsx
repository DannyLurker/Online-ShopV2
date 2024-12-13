import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const Popup = ({ togglePopup, deleteData }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="text-center w-[180px] h-[130px] sm:w-[300px] sm:h-[200px] bg-[#ffc8dd] rounded-md  m-1 p-1.5 shadow-md">
        <p className="flex justify-end cursor-pointer" onClick={togglePopup}>
          <IoCloseSharp className="w-5 h-5 sm:w-10 sm:h-10 font-bold" />
        </p>
        <h2 className="mb-4 sm:mb-8 sm:text-xl">
          Are you sure to delete this ?
        </h2>
        <button
          onClick={deleteData}
          className="button rounded-sm w-70% h-11 bg-red-500 hover:bg-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Popup;

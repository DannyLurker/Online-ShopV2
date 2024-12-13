import React from "react";

const ErrorMessage = ({ error }) => {
  if (error.length === 0) return null;

  return (
    <div className="flex justify-center items-center font-medium bg-red-400 w-[250px] h-auto rounded-md shadow-sm opacity-85 p-2 mb-5">
      {error.map((msg, index) => (
        <p key={index}>{msg}!</p>
      ))}
    </div>
  );
};

export default ErrorMessage;

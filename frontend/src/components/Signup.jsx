import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/signup`, {
        name,
        email,
        password,
      });
      navigate(`/login`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-gradient-to-t from-[#a2d2ff] to-[#bde0fe] min-h-screen flex justify-center items-center">
      <div className="bg-[#cdb4db] w-[250px] h-[320px] rounded-md shadow-md opacity-75 p-2">
        <div className="flex justify-center mt-2 flex-col text-center px-2 mb-3">
          <h1 className="text-3xl font-bold ">Sign Up</h1>
          <p>
            Already Have an Account?
            <a href="/login" className="text-blue-500">
              &nbsp; Log In
            </a>
          </p>
        </div>
        <div className="flex justify-center text-center mt-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="bg-[#cdb4db] placeholder-gray-500 outline-none border-b-2 border-gray-500 mb-5 invalid:focus:border-red-600 "
              placeholder="Name..."
              required
              minLength={3}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="bg-[#cdb4db] placeholder-gray-500 outline-none border-b-2 border-gray-500 mb-5 invalid:focus:border-red-600 "
              placeholder="Email..."
              required
              minLength={3}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="bg-[#cdb4db] placeholder-gray-500 outline-none border-b-2 border-gray-500 mb-5 invalid:focus:border-red-600 "
              placeholder="Password..."
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="sumbit"
              className="w-[63%] h-10 bg-[#b68ccf] rounded-md text-white font-semibold mt-2"
            >
              Sumbit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

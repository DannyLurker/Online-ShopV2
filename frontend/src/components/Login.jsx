import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );

      navigate("/");
    } catch (e) {
      navigate("/login");
      console.error("Error :", e.response?.data || e.message);
      const errorData = e.response?.data;

      setError(
        Array.isArray(errorData?.error)
          ? errorData.error.map((err) => err.msg)
          : [errorData?.message || "An error occurred"]
      );
    }
  };

  return (
    <div className="bg-gradient-to-t from-[#a2d2ff] to-[#bde0fe] min-h-screen flex flex-col justify-center items-center">
      <ErrorMessage error={error} />

      <div className="bg-[#cdb4db] w-[250px] h-[300px] rounded-md shadow-md opacity-75 p-2">
        <div className="flex justify-center mt-2 flex-col text-center px-2 mb-3">
          <h1 className="text-3xl font-bold ">Login</h1>
          <p>
            Don't Have an Account yet?
            <a href="/signup" className="text-blue-500">
              Sign Up
            </a>
          </p>
        </div>
        <div className="flex justify-center text-center mt-4">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="input"
              placeholder="Email..."
              required
              minLength={3}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Password..."
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="button-submit">
              Submit
            </button>
            <div className="ml-4 mt-2">
              <Link to="/">
                <FaArrowLeft />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

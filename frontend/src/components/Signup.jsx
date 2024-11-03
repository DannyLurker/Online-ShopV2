import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
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
              className="input"
              placeholder="Name..."
              required
              minLength={3}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="input"
              placeholder="Email..."
              required
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

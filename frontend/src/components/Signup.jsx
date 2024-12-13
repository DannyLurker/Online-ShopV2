import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../componetsPart/ErrorMessage";
import { FaArrowLeft, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Spinner from "../componetsPart/Spinner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [isCheck, setIsCheck] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleIsCheck = () => {
    setIsCheck((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      await axios.post(`http://localhost:3000/signup`, {
        name,
        email,
        password,
      });
      navigate(`/login`);
    } catch (e) {
      setIsSubmitting(false);
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
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
      <ErrorMessage error={error} />

      <div className="relative bg-[#cdb4db] w-[280px] h-[330px] sm:w-[320px] sm:h-[370px] md:w-[350px] md:h-[400px] rounded-md shadow-md opacity-75 p-2">
        <div className="flex justify-center mt-2 flex-col text-center px-2 mb-3">
          <h1 className="text-3xl md:text-4xl">Sign Up</h1>
          <p className="sm:text-xl md:text-2xl mt-2">
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
              className="input sm:mt-4 md:w-[250px] sm:text-xl"
              placeholder="Name..."
              required
              minLength={3}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="input md:w-[250px] sm:text-xl mt-2 sm:mt-0"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={isCheck ? "password" : "text"}
                className="input md:w-[250px] sm:text-xl mt-2 sm:mt-0"
                placeholder="Password..."
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isCheck ? (
                <FaRegEyeSlash
                  className="absolute top-0 right-10 sm:right-16 md:right-12 cursor-pointer"
                  onClick={handleIsCheck}
                />
              ) : (
                <FaRegEye
                  className="absolute top-0 right-10 sm:right-16 md:right-12 cursor-pointer"
                  onClick={handleIsCheck}
                />
              )}
            </div>

            <button type="submit" className="button-submit mt-6 sm:mt-0">
              Submit
            </button>
            <Link to="/">
              <FaArrowLeft className="absolute bottom-4 left-4" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

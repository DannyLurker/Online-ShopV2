import React, { useState, Suspense, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";
import { LuDoorOpen } from "react-icons/lu";

const NavWrapper = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  function check(e) {
    e.preventDefault();
    setIsCheck((prev) => !prev);
  }

  let formatterDate = "Date...";
  if (userData.createdAt) {
    const date = new Date(userData.createdAt);

    if (!isNaN(date.getTime())) {
      const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      });
      formatterDate = formatter.format(date);
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/`, {
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (e) {
      console.error("Error:", e.response?.data || e.message);
      setError(e.response?.data || e.message);
    }
  };

  const logOut = async (e) => {
    try {
      e.preventDefault();
      await axios.delete(`http://localhost:3000/logout`, {
        withCredentials: true,
      });
      navigate(`/login`);
    } catch (e) {
      console.error("Error:", e.response?.data || e.message);
      setError(e.response?.data || e.message);
    }
  };

  const refreshToken = async (e) => {
    try {
      await axios.post(
        `http://localhost:3000/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (e) {
      console.error("Error :", e.response?.data || e.message);
      setError(e.response?.data || e.message);
    }
  };

  useEffect(() => {
    getData();
    const intervalId = setInterval(refreshToken, 13 * 60 * 1000);
    return () => {
      setUserData({});
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-gradient-to-t from-[#a2d2ff] to-[#bde0fe] min-h-screen h-full pt-16">
      <header className="fixed top-0 left-0 w-full bg-[#cdb4db] z-20">
        <nav className="flex justify-between items-center p-5 w-[92%] mx-auto">
          <div>
            <Link to="/">
              <h1 className="relative font-bold font-mono text-3xl">OSV2</h1>
            </Link>
          </div>
          <div
            className={
              isCheck
                ? "left-[0%] top-[100%] navbar z-10 transition-all duration-500"
                : "left-[-100%] top-[100%] navbar transition-all duration-500"
            }
          >
            <ul className="flex flex-col md:flex-row md:items-center gap-8 md:gap-[4vw]">
              <li>
                <a className="underline-link" href="#">
                  Marketplace
                </a>
              </li>
              <li>
                <a className="underline-link" href="#">
                  Cart
                </a>
              </li>
              <li>
                <a className="underline-link" href="#">
                  Sells
                </a>
              </li>
              <li>
                <a className="underline-link" href="#">
                  History
                </a>
                {userData.createdAt ? (
                  ""
                ) : (
                  <button className="block md:hidden mt-8 button">
                    <h2>
                      <Link to="/signup">Sign In</Link>
                    </h2>
                  </button>
                )}
              </li>
            </ul>
          </div>
          <div className="hidden md:flex">
            {userData.createdAt ? (
              ""
            ) : (
              <button className="block button mr-2">
                <h2>
                  <Link to="/signup">Sign In</Link>
                </h2>
              </button>
            )}
            <div>
              <label htmlFor="user-modal" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </label>
              <input
                type="checkbox"
                id="user-modal"
                className="peer fixed appearance-none opacity-0"
              />
              <label htmlFor="user-modal" className="modal">
                <label
                  htmlFor=""
                  className="h-fit w-64 scale-90 overflow-y-auto overscroll-contain rounded-lg bg-[#ffc8dd] p-6 text-black shadow-2xl transition"
                >
                  <h3 className="text-lg font-bold">
                    {userData.name ? userData.name : "user"}
                  </h3>
                  <p className="py-4">{`Created when: ${formatterDate}`}</p>
                  {userData.createdAt ? (
                    <LuDoorOpen
                      onClick={logOut}
                      className="w-8 h-8 cursor-pointer"
                    />
                  ) : (
                    ""
                  )}
                </label>
              </label>
            </div>
          </div>

          <div className="md:hidden flex hamburger mr-1 cursor-pointer">
            <div>
              <label htmlFor="user-modal1" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </label>
              <input
                type="checkbox"
                id="user-modal1"
                className="peer fixed appearance-none opacity-0"
              />
              <label htmlFor="user-modal1" className="modal z-10">
                <label
                  htmlFor="user-modal1"
                  className="h-fit w-64 scale-90 overflow-y-auto overscroll-contain rounded-lg bg-[#ffc8dd] p-6 text-black shadow-2xl transition "
                >
                  <h3 className="text-lg font-bold">
                    {userData.name ? userData.name : "user"}
                  </h3>
                  <p className="py-4">{`Created when: ${formatterDate}`}</p>
                  {userData.name ? (
                    <LuDoorOpen
                      onClick={logOut}
                      className="w-8 h-8 cursor-pointer"
                    />
                  ) : (
                    ""
                  )}
                </label>
              </label>
            </div>
            <div
              className={
                isCheck ? "active hamburger ml-3 mt-2" : "hamburger ml-3 mt-2"
              }
              onClick={check}
            >
              <span className="span_1 block w-8 h-2 bg-[#FFFBE9] mb-1 transition-transform duration-300 ease-in-out rounded"></span>
              <span className="span_2 block w-8 h-2 bg-[#FFFBE9] mb-1 transition-opacity duration-300 ease-in-out rounded"></span>
              <span className="span_3 block w-8 h-2 bg-[#FFFBE9] rounded mb-1 transition-transform duration-300 ease-in-out"></span>
            </div>
          </div>
        </nav>
      </header>
      <div>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default NavWrapper;

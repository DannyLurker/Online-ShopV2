import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const NavWrapper = () => {
  const [isCheck, setIsCheck] = useState(false);

  function check() {
    setIsCheck((prev) => !prev);
  }

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
                <button className="block md:hidden mt-8 button">
                  <h2>
                    <a href="/signup">Sign In</a>
                  </h2>
                </button>
              </li>
            </ul>
          </div>
          <div className="hidden md:flex">
            <button className="block button mr-2">
              <h2>
                <a href="/signup">Sign In</a>
              </h2>
            </button>
            <div>
              <label htmlFor="user-modal" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="{1.5}"
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
                  <h3 className="text-lg font-bold">osas</h3>
                  <p className="py-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
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
                  strokeWidth="{1.5}"
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
                  <h3 className="text-lg font-bold">osas</h3>
                  <p className="py-4 ">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </label>
              </label>
            </div>
            <div
              className={
                isCheck
                  ? "active hamburger ml-3 mt-2 cursor-pointer lg:hidden"
                  : "hamburger ml-3 mt-2 cursor-pointer lg:hidden"
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

import { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === 3) setCurrent(0);
    else setCurrent(current + 1);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  });

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex transition ease-out duration-500`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, index) => (
          <img
            className="w-full h-[60%]"
            key={index}
            src={s}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white">
        <button onClick={previousSlide}>
          <FaArrowCircleLeft className="ml-1 w-8 h-6" />
        </button>
        <button onClick={nextSlide}>
          <FaArrowCircleRight className="mr-1 w-8 h-6" />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

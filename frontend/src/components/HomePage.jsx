import React from "react";
import Carousel from "./Carousel";

const HomePage = () => {
  let slides = [
    `../dea3499418a115708ebd31a95c89789b.jpg`,
    `../hhkb-hybrid-type-s.jpg`,
    `../https___hybrismediaprodblobcorewindowsnet_sys-master-phoenix-images-container_h1e_h94_9311020875806_22.jpg`,
    `../photo-1701338678701-c053ba5d6ee1.jpeg`,
  ];

  return (
    <div className="w-[90%] 2xl:w-[1400px] h-[60%] mx-auto mt-12 border-black rounded-md shadow-md">
      <Carousel slides={slides} autoSlide={true} />
    </div>
  );
};

export default HomePage;

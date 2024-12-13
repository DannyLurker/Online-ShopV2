import { React, lazy, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
const Carousel = lazy(() => import("../componetsPart/Carousel"));
const Card = lazy(() => import("../componetsPart/Card"));

const HomePage = () => {
  let slides = [
    `../dea3499418a115708ebd31a95c89789b.jpg`,
    `../hhkb-hybrid-type-s.jpg`,
    `../https___hybrismediaprodblobcorewindowsnet_sys-master-phoenix-images-container_h1e_h94_9311020875806_22.jpg`,
    `../photo-1701338678701-c053ba5d6ee1.jpeg`,
  ];
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/marketplace`);
      setProducts(response.data.products);
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="w-[90%] 2xl:w-[1400px] h-[60%] mx-auto mt-12 border-black rounded-md shadow-md mb-5">
        <Carousel slides={slides} autoSlide={true} />
      </div>
      {products.length > 0 && (
        <div className="grid place-content-around grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-2 gap-2 pt-10">
          {products.map((product, index) => (
            <div key={index}>
              <Card
                name={product.name}
                price={product.price}
                imgUrl={product.imageUrl}
              >
                <Link to={`/information/${product._id}`}>
                  <BsInfoCircle className="w-10 h-6 sm:w-12 sm:h-8 mt-1.5" />
                </Link>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

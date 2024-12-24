import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../componetsPart/Card";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import BuyPopup from "../componetsPart/BuyPopup";
import { MdDelete } from "react-icons/md";
import DeleteCartPopup from "../componetsPart/DeleteCartPopup";

const Cart = () => {
  const [cartsData, setCartsData] = useState([]);
  const [error, setError] = useState("");
  const [cartName, setCartName] = useState("");
  const [cartPrice, setCartPrice] = useState("");
  const [cart_Id, setCart_Id] = useState("");
  const [IsOpen, setIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  function checkIsOpen() {
    setIsOpen((prev) => !prev);
  }

  const toggleDeleteCartPopup = (name, id) => {
    setCartIsOpen((prev) => !prev);
    setCartName(name);
    setCart_Id(id);
  };

  function setItemInformation(name, price, _id) {
    setCartName(name);
    setCartPrice(price);
    setCart_Id(_id);
    checkIsOpen();
  }

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cart`, {
        withCredentials: true,
      });

      setCartsData(response.data.formattedCarts);
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
      setError(e.response?.data?.message || e.message);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/downloadManyImage`,
        {
          responseType: "blob",
        }
      );

      const imageSrc = URL.createObjectURL(response.data);
      setImageUrls((prev) => [...prev, imageSrc]);
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
    }
  };

  const fetchAllData = async () => {
    await getData();
    await fetchImages();
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <>
      {error && (
        <div className="flex flex-col justify-center text-center items-center h-[78vh] sm:h-[80vh] font-bold text-5xl ">
          <h1>! 404 !</h1>
          <div>{error}</div>
        </div>
      )}

      <div className="grid p-2 place-content-around grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6  gap-2 pt-10">
        {cartsData &&
          cartsData.map((cart, index) => (
            <div key={index}>
              <Card
                name={cart.name}
                price={cart.price}
                imgUrl={imageUrls[index]}
              >
                <Link to={`/information/${cart.productId}`}>
                  <BsInfoCircle className="w-10 h-6 sm:w-12 sm:h-8 mt-1.5" />
                </Link>
                <button
                  onClick={() => toggleDeleteCartPopup(cart.name, cart._id)}
                >
                  <MdDelete className="w-10 h-6 sm:w-12 sm:h-8 mt-1.5" />
                </button>
                <button
                  onClick={() =>
                    setItemInformation(cart.name, cart.price, cart._id)
                  }
                  className="button"
                >
                  Buy
                </button>
              </Card>
            </div>
          ))}
      </div>

      {cartIsOpen && (
        <DeleteCartPopup
          setIsOpen={toggleDeleteCartPopup}
          setName={cartName}
          setId={cart_Id}
        />
      )}

      {IsOpen && (
        <BuyPopup
          setIsOpen={() => checkIsOpen(false)}
          setName={cartName}
          setPrice={cartPrice}
          setCart_Id={cart_Id}
        />
      )}
    </>
  );
};

export default Cart;

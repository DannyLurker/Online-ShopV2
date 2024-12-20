import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../componetsPart/Card";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const MarketPlace = () => {
  const [productDatas, setProductDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [productsLength, setProductsLength] = useState(0);
  const [imageUrls, setImageUrls] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/marketplace`, {
        params: {
          search: search,
          page: page,
        },
      });
      setProductDatas(response?.data?.products);
      setProductsLength(response?.data?.productsLength);
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
    }
  };

  const fetchImages = async () => {
    try {
      const productIds = productDatas.map((product) => product.productId);

      productIds.forEach(async (id) => {
        const response = await axios.get(
          `http://localhost:3000/imageDownload`,
          {
            responseType: "blob",
            params: { productId: id },
          }
        );

        const imageUrl = URL.createObjectURL(response);
        setImageUrls((prev) => ({
          ...prev,
          [id]: imageUrl,
        }));
      });
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
    }
  };

  console.log(imageUrls);

  useEffect(() => {
    const fetchAllData = async () => {
      await getData();
      await fetchImages();
    };
    fetchAllData();
  }, [search, page]);

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-[#ffafcc] w-[80%] sm:w-[60%] md:w-[50%] h-[60px] rounded-full mt-10 py-3 px-2">
          <div className="flex h-full align-middle">
            <CiSearch className="h-[30px] w-[30px] mr-2" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none placeholder-white text-lg w-full"
            />
          </div>
        </div>
      </div>

      {productDatas.length > 0 && (
        <div className="grid p-2 place-content-around grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6  gap-2 pt-10">
          {productDatas.map((product, index) => (
            <div key={index}>
              <Card
                name={product.name}
                price={product.price}
                imgUrl={imageUrls[product.productId]}
              >
                <Link to={`/information/${product._id}`}>
                  <BsInfoCircle className="w-10 h-6 sm:w-12 sm:h-8 mt-1.5" />
                </Link>
              </Card>
            </div>
          ))}
        </div>
      )}

      {productsLength > 24 && (
        <div className="fixed bottom-4 left-1/2">
          <button
            className="button w-[102px] rounded-sm shadow-sm"
            onClick={() => setPage(page + 1)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default MarketPlace;

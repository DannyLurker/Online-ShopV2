import axios from "axios";
import React, { useEffect, useState } from "react";
import TopupCard from "../componetsPart/TopupCard";
import PopupBuy from "../componetsPart/PopupBuy";

const Wallet = () => {
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTopup = (value) => {
    setTotalBalance(value);
    togglePopup();
  };

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/wallet`, {
        withCredentials: true,
      });
      setName(response.data.name);
      setWallet(response.data.wallet);
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [wallet]);

  const topupOptions = [25000, 100000, 250000, 1000000, 3000000, 5000000];

  return (
    <>
      <div className="flex w-full h-screen flex-col items-center mt-16">
        <div>
          <h1 className="text-3xl font-bold">Wallet</h1>
        </div>
        <div className="bg-[#a2d2ff] mt-2 w-[280px] sm:w-[500px] md:w-[650px] lg:w-[800px] max-h-fit p-2">
          <h2 className="font-semibold text-xl">Name: {name}</h2>
          <p className="font-semibold mb-2">OSV2 Wallet: {wallet}</p>
          <div className="border-t-2 border-black">
            <h2 className="font-bold text-2xl mt-2 mb-3">Top Up</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {topupOptions.map((value) => (
                <TopupCard key={value} onClick={() => handleTopup(value)}>
                  {value.toLocaleString()} Points
                </TopupCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <PopupBuy setTogglePopup={togglePopup} OSV2_Point={totalBalance} />
      )}
    </>
  );
};

export default Wallet;

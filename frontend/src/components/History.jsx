import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/history`, {
        withCredentials: true,
      });
      setHistoryData(response.data.historyData);
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete("http://localhost:3000/history/deleteData", {
        params: {
          id,
        },
      });

      window.location.reload();
    } catch (e) {
      console.log("Error:", e.response?.data || e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className="text-center text-5xl mt-16 font-bold mb-8">History</h1>
      <div className="flex justify-center p-5">
        <table className="w-[80%] sm:w-[70%] md:w-[65%] bg-[#ffc8dd]">
          <thead className="border-2">
            <tr>
              <th className="border-r-2 text-left px-1">Id</th>
              <th className="border-r-2 text-left px-1">Time</th>
              <th className="border-r-2 text-left px-1">Item</th>
              <th className="text-left px-1">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {historyData.length > 0 ? (
              historyData.map((data, index) => (
                <tr key={index} className="border-2">
                  <td className="border-r-2 text-left px-1">{data._id}</td>
                  <td className="border-r-2 text-left px-1">
                    {data.createdAt}
                  </td>
                  <td className="border-r-2 text-left px-1">{data.name}</td>
                  <td className="text-left px-1">{data.price}</td>
                  <td>
                    <button onClick={() => deleteData(data._id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center font-bold">
                  Data not found or user hasn't bought anything
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;

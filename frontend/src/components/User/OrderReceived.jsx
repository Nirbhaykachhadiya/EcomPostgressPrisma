import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderReceived = () => {
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/orderReceived",
        {},
        { withCredentials: true }
      );
      setProduct(res.data.products);
      console.log("OrderReceived fetch successfully", res);
    } catch (error) {
      console.log("OrderReceived fetch Unsuccessfully", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      {" "}
      <div className="bg-orange-100 mt-[50px] h-[500px] mx-[100px]">
        <div className="m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {product &&
            product.map((item) => {
              return (
                <div
                  key={item.seller.id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
                >
                  <img
                    src={item.seller.photo}
                    alt={item.seller.title}
                    className="w-full h-48  rounded-t-lg"
                  />
                  <div className="mt-4 text-lg font-semibold">{item.seller.title}</div>
                  <div className="mt-2 text-gray-700">{item.seller.desc}</div>
                  <div className="mt-2 font-bold text-lg">${item.seller.price}</div>
                  <div className="mt-2 font-bold text-lg">
                    buyer : {item.buyer.userName}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderReceived;
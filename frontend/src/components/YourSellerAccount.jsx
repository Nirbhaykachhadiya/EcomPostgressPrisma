import React, { useState } from "react";
import Create from "./User/Create";
import YourListing from "./User/YourListing";
import OrderReceived from "./User/OrderReceived";

const YourSellerAccount = () => {
  const [activeState, setActiveState] = useState("Create");
  return (
    <div className="bg-orange-100 mt-[50px] h-[500px] mx-[100px]">
      <div className="text-center font-semibold text-xl mt-5">
        YourSellerAccount
      </div>
      <div className="mt-5 flex justify-center">
        <div className="ml-3">
          <button
            className={` shadow-lg px-7 py-1 ${activeState === "Create" ? "bg-orange-300" : "bg-white"}`}
            onClick={() => setActiveState("Create")}
          >
            Create a Listing
          </button>
        </div>
        <div className="ml-3">
          <button
            className={` shadow-lg px-7 py-1 ${activeState === "YourListing" ? "bg-orange-300" : "bg-white"}`}
            onClick={() => setActiveState("YourListing")}
          >
            Your Listing
          </button>
        </div>
        <div className="ml-3">
          <button
            className={` shadow-lg px-7 py-1 ${activeState === "OrderReceived" ? "bg-orange-300" : "bg-white"}`}
            onClick={() => setActiveState("OrderReceived")}
          >
            Order Received
          </button>
        </div>
      </div>
      <div>
        {activeState === "Create" && <Create />}
        {activeState === "YourListing" && <YourListing />}
        {activeState === "OrderReceived" && <OrderReceived />}
      </div>
    </div>
  );
};

export default YourSellerAccount;

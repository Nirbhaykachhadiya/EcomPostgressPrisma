import axios from "axios";
import React, { useEffect, useState } from "react";


import HomeList from "./HomeList";

const HomeListing = () => {
  const [product, setProduct] = useState([]);

  const productOnMarketplace = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/users/productOnMarketplace"
      );
      setProduct(response.data.products);
      console.log("productOnMarketplace success", response.data);
    } catch (error) {
      console.log("productOnMarketplace failed");
    }
  };

  useEffect(() => {
    productOnMarketplace();
  }, []);

  return (
    <>
      {" "}
      <div className="bg-orange-100 mt-[50px] h-[500px] mx-[100px]">
        <div className="text-center font-semibold text-xl mt-5">
          Product On Marketplace
        </div>
        <div className="m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {product && product.map((item) => <HomeList item={item} />)}
        </div>
      </div>
    </>
  );
};

export default HomeListing;

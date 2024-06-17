import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { insideLoginAtom } from "../store/atoms/userAtoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingIcon from "../assets/LoadingIcon";

const HomeList = ({ item }) => {
  const [AddToCartText, setAddToCartText] = useState(false);
  const [inside, setInside] = useRecoilState(insideLoginAtom);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const AddToCart = async (id) => {
    if (!inside) {
      navigate("/LogInSignUp");
    }
    setLoading(true);
    const response = await axios.post(
      "http://localhost:3001/api/v1/users/buyProduct",
      { id },
      { withCredentials: true }
    );
    setLoading(false);
    setAddToCartText(true);
    console.log("add to cart successfully", response);
  };

  return (
    <div
      key={item.id}
      className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
    >
      <img
        src={item.photo}
        alt={item.title}
        className="w-full h-48  rounded-t-lg"
      />
      <div className="mt-4 text-lg font-semibold">{item.title}</div>
      <div className="mt-2 text-gray-700">{item.desc}</div>
      <div className="mt-2 font-bold text-lg">${item.price}</div>
      <div className="mt-2 font-bold text-lg">
        seller : {item.seller.userName}
      </div>
      {!AddToCartText ? (
        <>
          <button
            onClick={() => AddToCart(item.id)}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Add+
          </button>
          <div>{!loading ? "" : <LoadingIcon />}</div>
        </>
      ) : (
        <div className="mt-2 font-bold text-lg text-orange-500">
          ✅ Your Item addtocart Successfully
        </div>
      )}
    </div>
  );
};

export default HomeList;

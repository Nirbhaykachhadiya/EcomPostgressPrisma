import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  insideLoginAtom,
  loginAtom,
  userNameAtom,
} from "../store/atoms/userAtoms.jsx";
import { useNavigate } from "react-router-dom";
import DownIcon from "../assets/DownIcon.jsx";
import UpIcon from "../assets/UpIcon.jsx";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = useRecoilValue(userNameAtom);
  const [insideLogin, setInsideLogin] = useRecoilState(insideLoginAtom);
  const setLogin = useSetRecoilState(loginAtom);
  const [downClick, setDownClick] = useState(true);
  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setInsideLogin(false);
      navigate("/");
      console.log("logout successful", res);
    } catch (error) {
      console.log("logout Unsuccessful", error);
    }
  };

  const yourorder = () => {
    navigate("/YourOrder");
    setDownClick(true);
  };

  const yourselleraccount = () => {
    navigate("/YourSellerAccount");
    setDownClick(true);
  };

  const logInSignUp = (data) => {
    if (data === "login") {
      setLogin(true);
      navigate("/LogInSignUp");
    } else if ((data = "signup")) {
      navigate("/LogInSignUp");
      setLogin(false);
    }
  };
  const home = () => {
    navigate("/");
  };

  return (
    <>
      <div className="bg-orange-300 shadow-lg h-[100px] flex justify-evenly">
        <div
          className="text-2xl font-bold pt-[30px] cursor-pointer"
          onClick={home}
        >
          Amazon
        </div>
        {!insideLogin ? (
          <div className=" pt-[30px]">
            <button
              className="bg-white shadow-lg px-7 py-2"
              onClick={() => logInSignUp("login")}
            >
              LogIn
            </button>
            <button
              className="bg-white shadow-lg px-5 py-2 ml-2"
              onClick={() => logInSignUp("signup")}
            >
              SignUp
            </button>
          </div>
        ) : (
          <div className=" pt-[30px] flex">
            <div> Welcome ${userName}</div> {}
            {!downClick ? (
              <div className="ml-3 ">
                <div>
                  <button
                    className="bg-white shadow-lg px-7 py-1 "
                    onClick={() => setDownClick(!downClick)}
                  >
                    {<DownIcon />}
                  </button>
                </div>
                <div>
                  <button
                    className="bg-white shadow-lg px-7 py-1 w-[200px]"
                    onClick={() => yourorder()}
                  >
                    YourOrder
                  </button>
                </div>
                <div>
                  <button
                    className="bg-white shadow-lg px-7 py-1 w-[200px]"
                    onClick={() => yourselleraccount()}
                  >
                    YourSellerAccount
                  </button>
                </div>

                <div>
                  <button
                    className="bg-white shadow-lg px-7 py-1 w-[200px]"
                    onClick={logout}
                  >
                    LogOut
                  </button>
                </div>
              </div>
            ) : (
              <div className="ml-3">
                <button
                  className="bg-white shadow-lg px-7 py-1"
                  onClick={() => setDownClick(!downClick)}
                >
                  {<UpIcon />}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

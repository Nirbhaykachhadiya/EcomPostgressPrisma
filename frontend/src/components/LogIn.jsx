import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  insideLoginAtom,
  loginAtom,
  userNameAtom,
} from "../store/atoms/userAtoms";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../assets/LoadingIcon.jsx";

const LogIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const setInsideLogin = useSetRecoilState(insideLoginAtom);
  const setLogin = useSetRecoilState(loginAtom);
  const setUserName = useSetRecoilState(userNameAtom);
  const userNamew = useRecoilValue(userNameAtom);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const logInUser = async (userName, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        {
          userName,
          password,
        },
        { withCredentials: true }
      );

      setLoading(false);
      setUserName(response.data.user.userName);

      setInsideLogin(true);
      navigate("/");

      console.log("logIn successfull", response);
    } catch (error) {
      console.log("logIn failed", error);
    }
  };
  const signup = () => {
    setLogin(false);
  };

  const onSubmit = (data) => {
    setLoading(true);
    logInUser(data.userName, data.password);
    reset();

    // setInsideLogin(true);
  };
  return (
    <div className="mx-[50px]">
      <div className="text-center font-semibold text-xl pt-10 shadow-lg">
        LogIn
      </div>
      <div className="pt-10 flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5 ">
            <label className="text-xl ">UserName</label>
            <input
              type="text"
              className="ml-7 border"
              {...register("userName", { required: true })}
            />
            {errors.userName && <span>userName is must</span>}
          </div>

          <div className="my-5">
            <label className="text-xl ">PassWord</label>
            <input
              className="ml-9 border"
              type="text"
              {...register("password", { required: true })}
            />
            {errors.password && <span>password is must</span>}
          </div>

          <div className="">
            <button
              className="text-xl bg-black text-white shadow-lg rounded-lg px-5 py-2 "
              type="submit"
            >
              LogIn
            </button>
          </div>
          <div className="underline mt-3 cursor-pointer" onClick={signup}>
            New User click here for SignUp
          </div>
          <div>{!loading ? "" : <LoadingIcon />}</div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

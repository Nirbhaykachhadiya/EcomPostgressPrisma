import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "../store/atoms/userAtoms";
import axios from "axios";

const SignUp = () => {
  const setLogin = useSetRecoilState(loginAtom);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const login = () => {
    setLogin(true);
  };

    const registerUser = async (userName, password) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/v1/users/register",
          {
            userName,
            password,
          }
        );
        console.log("registration successfull", response);
      } catch (error) {
        console.log("registration failed", error);
      }
    };

  const onSubmit = (data) => {
    registerUser(data.userName, data.password);
    reset();
  };
  return (
    <div className="mx-[50px]">
      <div className="text-center font-semibold text-xl pt-10 shadow-lg">
        SignUp
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
              SignUp
            </button>
          </div>
          <div className="underline mt-3 cursor-pointer" onClick={login}>
            Already Register Click here for LogIn
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

import React from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../store/atoms/userAtoms";

const LogInSignUp = () => {
  const login = useRecoilValue(loginAtom);
  return (
    <div className="mx-[350px] bg-orange-200 mt-[50px] h-[400px] shadow-lg">
      {login ? <LogIn /> : <SignUp />}
    </div>
  );
};

export default LogInSignUp;

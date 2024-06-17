import { atom } from "recoil";

export const loginAtom = atom({
  key: "loginAtom",
  default: true,
});

export const insideLoginAtom = atom({
  key: "insideLoginAtom",
  default: false,
});

export const userNameAtom = atom({
  key: "useNameAtom",
  default: "",
});

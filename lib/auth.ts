// TODO: @yigitkeremoktay

import { createStore, set, get } from "../lib/store/store";
import Router from "next/router";

export const login = async (email: string, password: string) => {
  await createStore("__sk_store");
  set("isAuthenticated", true);
  console.log(await get("isAuthenticated"));
  // ^^^ DO THIS ONLY IF SUCCESSFULLY AUTHENTICATED
  console.log(email, password, "login");
  Router.replace("/");
  return;
};

export const signup = async (email: string, password: string) => {
  await createStore("__sk_store");
  set("isAuthenticated", true);
  console.log(await get("isAuthenticated"));
  // ^^^ DO THIS ONLY IF SUCCESSFULLY AUTHENTICATED
  console.log(email, password, "signup");
  Router.replace("/");
  return;
};

export const logout = async () => {
  await createStore("__sk_store");
  set("isAuthenticated", false);
  console.log(await get("isAuthenticated"));
  Router.replace("/");
  // ^^^ ONLY IF LOGOUT IS CONFIRMED TO BE SUCCESSFUL
};

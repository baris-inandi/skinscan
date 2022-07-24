// TODO: @yigitkeremoktay

import { createStore, set } from "../lib/store/store";

export const login = async (email: string, password: string) => {
  await createStore("__sk_store");
  set("isAuthenticated", true);
  // ^^^ DO THIS ONLY IF SUCCESSFULLY AUTHENTICATED
  console.log(email, password, "login");
  return;
};

export const signup = async (email: string, password: string) => {
  await createStore("__sk_store");
  set("isAuthenticated", true);
  // ^^^ DO THIS ONLY IF SUCCESSFULLY AUTHENTICATED
  console.log(email, password, "signup");
  return;
};

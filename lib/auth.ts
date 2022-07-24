import { createStore, set, get } from "../lib/store/store";
import Router from "next/router";
import { initializeApp } from "firebase/app";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

export const login = async (email: string, password: string) => {
  try {
    await createStore("__sk_store");
    try {
      await FirebaseAuthentication.signInWithEmailAndPassword({
        email,
        password,
      });
    } catch (any) {
      return false;
    }
    let tk = await FirebaseAuthentication.getIdToken();
    set("currentUserToken", tk.token);
    set("currentUserEmail", email);
    set("isAuthenticated", true);
    Router.replace("/");

    return true;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export const signup = async (email: string, password: string) => {
  try {
    await createStore("__sk_store");
    await FirebaseAuthentication.createUserWithEmailAndPassword({
      email,
      password,
    });
    let result = await FirebaseAuthentication.getIdToken();
    set("currentUserToken", result.token);
    set("currentUserEmail", email);
    set("isAuthenticated", true);
    Router.replace("/");
    return true;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export const logout = async () => {
  await createStore("__sk_store");
  set("currentUserToken", undefined);
  set("currentUserEmail", undefined);
  set("isAuthenticated", false);
  Router.reload();
};

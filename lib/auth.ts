// TODO: @yigitkeremoktay

import { createStore, set, get } from "../lib/store/store";
import Router from "next/router";
import { initializeApp } from 'firebase/app';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);

export const login = async (email: string, password: string) => {
  await createStore("__sk_store");
  try{
    await FirebaseAuthentication.signInWithEmailAndPassword({
      email,
      password
    });
  } catch(any){
    return false
  }

  let tkresult = await FirebaseAuthentication.getIdToken();
  set("currentUserToken", tkresult.token);  
  set("isAuthenticated", true);
  Router.replace("/");

  return true
};

export const signup = async (email: string, password: string) => {
  await createStore("__sk_store");
  await FirebaseAuthentication.createUserWithEmailAndPassword({
    email,
    password
  });
  let result = await FirebaseAuthentication.getIdToken();
  set("currentUserToken", result.token);  
  set("isAuthenticated", true);
  Router.replace("/");
  return true
};

export const logout = async () => {
  await createStore("__sk_store");
  set("isAuthenticated", false);
  console.log(await get("isAuthenticated"));
  Router.replace("/");
  // ^^^ ONLY IF LOGOUT IS CONFIRMED TO BE SUCCESSFUL
};

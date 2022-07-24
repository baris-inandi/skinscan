// TODO: @yigitkeremoktay

import { createStore, set, get } from "../lib/store/store";
import Router from "next/router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const login = async (email: string, password: string) => {
  await createStore("__sk_store");
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    userCredential.user.getIdToken(true).then(function(idToken) {
      set("currentUserToken", idToken);  
      set("isAuthenticated", true);
      Router.replace("/");
      console.log(idToken)
    }).catch(function(error) {
      return false
    });
  })
  .catch((error) => {
    return false
  });
  return false
};

export const signup = async (email: string, password: string) => {
  await createStore("__sk_store");
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    userCredential.user.getIdToken(true).then(function(idToken) {
      set("currentUserToken", idToken);  
      set("isAuthenticated", true);
      Router.replace("/");
    }).catch(function(error) {
      return false
    });
  })
  .catch((error) => {
    return false
  });
  return false
};

export const logout = async () => {
  await createStore("__sk_store");
  set("isAuthenticated", false);
  console.log(await get("isAuthenticated"));
  Router.replace("/");
  // ^^^ ONLY IF LOGOUT IS CONFIRMED TO BE SUCCESSFUL
};

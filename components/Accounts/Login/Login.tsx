import React from "react";
import AuthView from "../global/AuthView";
import Router from "next/router";
import { login } from "../../../lib/auth";

const Login: React.FC = () => {
  return (
    <AuthView
      title="Log in to your account"
      emailInputText="Enter your email"
      passwordInputText="Enter your password"
      authHandler={login}
      primaryButtonText="Login"
      secondaryButtonText="Don't have an account?"
      secondaryButtonFunction={() => {
        Router.replace("/accounts/create");
      }}
    />
  );
};

export default Login;

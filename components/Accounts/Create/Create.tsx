import React from "react";
import AuthView from "../global/AuthView";
import Router from "next/router";
import { signup } from "../../../lib/auth";

const Create: React.FC = () => {
  return (
    <AuthView
      title="Create your account"
      emailInputText="Enter your email"
      passwordInputText="Choose your password"
      authHandler={signup}
      primaryButtonText="Create account"
      secondaryButtonText="Already have an account?"
      secondaryButtonFunction={() => {
        Router.replace("/accounts/login");
      }}
    />
  );
};

export default Create;

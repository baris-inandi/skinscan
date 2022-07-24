import React, { useState } from "react";
import SkButton from "../../global/SkButton";
import NotchLogo from "../../global/NotchLogo";
import SkErr from "../../global/SkErr";

interface Props {
  title: string;
  emailInputText: string;
  passwordInputText: string;
  authHandler: (email: string, password: string) => Promise<boolean>;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryButtonFunction: () => void;
}

const AuthView: React.FC<Props> = (props) => {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(true);
  const [passwordEmpty, setPasswordEmpty] = useState(true);
  const [virgin, setVirgin] = useState(true);
  const [authErr, setAuthErr] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    setAuthErr(false);
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const authSuccess = await props.authHandler(email, password);
    if (!authSuccess) {
      setAuthErr(true);
    }
  };
  const handleChange: React.FormEventHandler<HTMLFormElement> = (event) => {
    const validateEmail = (email: string) => {
      const re = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      return re.test(email);
    };
    const validatePassword = (password: string) => {
      return password.length > 6;
    };
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    setEmailValid(validateEmail(email));
    setPasswordValid(validatePassword(password));
    setPasswordEmpty(!(password.length > 0));
    setEmailEmpty(!(email.length > 0));
    setVirgin(false);
  };
  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <NotchLogo />
      <div className="text-center h-screen w-screen flex items-center justify-center flex-col px-7 gap-3">
        <h1 className="font-medium text-4xl font-sk pb-7">{props.title}</h1>
        <input
          className={`${
            emailValid || emailEmpty
              ? "text-sk-sub focus:border-sk-fg border-gray-200"
              : "focus:border-sk-err-fg border-sk-err-bg bg-sk-err-bg text-sk-err-fg"
          }
          bg-transparent transition-all ease-in-out duration-300 py-3 px-6 w-full border-2 font-sk rounded-xl focus:outline-none`}
          type="email"
          name="email"
          placeholder={props.emailInputText}
        />
        <input
          className={`${
            passwordValid || passwordEmpty
              ? "text-sk-sub focus:border-sk-fg border-gray-200"
              : "focus:border-sk-err-fg border-sk-err-bg bg-sk-err-bg text-sk-err-fg"
          }
          bg-transparent transition-all ease-in-out duration-300 py-3 px-6 w-full border-2 font-sk rounded-xl focus:outline-none`}
          type="password"
          name="password"
          placeholder={props.passwordInputText}
        />
        <div
          className={`transition duration-200 h-0 ${
            authErr ? "" : "opacity-0"
          }`}
        >
          <SkErr
            level="err"
            content="Authentication failed. Please check your email and password."
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-screen h-fit-contents flex items-center justify-center">
        <div className="w-full py-8 px-7 flex flex-col gap-3">
          <div className={virgin ? "pointer-events-none" : ""}>
            <SkButton
              onClick={() => {}}
              fill
              disabled={(!passwordValid || !emailValid) && !virgin}
              type="submit"
            >
              {props.primaryButtonText}
            </SkButton>
          </div>
          <SkButton
            onClick={props.secondaryButtonFunction}
            fill
            outlined
            type="button"
          >
            {props.secondaryButtonText}
          </SkButton>
        </div>
      </div>
    </form>
  );
};

export default AuthView;

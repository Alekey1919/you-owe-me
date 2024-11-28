"use client";

import React, { useCallback, useMemo, useState } from "react";
import UserIcon from "../svgs/UserIcon";
import { useTranslations } from "next-intl";
import LockIcon from "../svgs/LockIcon";
import Button from "../components/Button";
import TwoStatesText from "../components/TwoStatesText";
import useAuth from "../hooks/useAuth";
import { twMerge } from "tailwind-merge";

const ErrorMessage = ({ text }: { text: string }) => {
  return (
    <span
      className={twMerge(
        "text-background text-center transition-height translate-y-1/3 !my-0",
        text && "open"
      )}
    >
      {text}
    </span>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const {
    handleEmailLogin,
    handleEmailRegistration,
    emailError,
    passwordError,
    handleGoogleLogin,
  } = useAuth();

  const t = useTranslations("login");

  const handleClick = useCallback(() => {
    if (isLogin) {
      handleEmailLogin(email, password);
    } else {
      handleEmailRegistration(email, password);
    }
  }, [email, handleEmailLogin, handleEmailRegistration, isLogin, password]);

  const buttonDisabled = useMemo(() => {
    return !email || !password || password.length < 6;
  }, [email, password]);

  return (
    <div className="layout flex items-center justify-center">
      <div className="max-w-[500px] flex flex-col space-y-4">
        <div className="bg-accent rounded-lg flex flex-col space-y-4 p-4 max-w-[500px]">
          <div className="bg-background p-4 flex space-x-4 rounded-lg items-center">
            <UserIcon className="w-5 h-5" />
            <input
              type="text"
              className="bg-transparent text-accent placeholder:text-accent selection:!bg-accent selection:text-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <ErrorMessage text={emailError} />

          <div className="bg-background p-4 flex space-x-4 rounded-lg items-center">
            <LockIcon className="w-5 h-5" />
            <input
              type="password"
              className="bg-transparent text-accent placeholder:text-accent selection:!bg-accent selection:text-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <ErrorMessage text={passwordError} />

          <Button
            text={
              <TwoStatesText
                text1={t("login")}
                text2={t("register")}
                showSecondText={!isLogin}
              />
            }
            styles="subtitle text-center"
            disabled={buttonDisabled}
            invertColors
            onClick={handleClick}
          />

          <TwoStatesText
            text1={t("youDontKnowMe")}
            text2={t("youKnowMe")}
            showSecondText={!isLogin}
            styles="text-background cursor-pointer"
            onClick={() => setIsLogin((curr) => !curr)}
          />
        </div>

        <Button
          text={t("loginWithGoogle")}
          styles="w-full"
          onClick={handleGoogleLogin}
        />
      </div>
    </div>
  );
};

export default Login;

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";

const AuthButton = () => {
  return (
    <div className="flex items-center gap-4">
      <SignInButton
        mode="modal"
        fallbackRedirectUrl={"/dashboard"}
        forceRedirectUrl={"/dashboard"}
      >
        <Button variant={"ghost"}>ログイン</Button>
      </SignInButton>
      <SignUpButton
        mode="modal"
        fallbackRedirectUrl={"/dashboard"}
        forceRedirectUrl={"/dashboard"}
      >
        <Button variant={"secondary"}>新規登録</Button>
      </SignUpButton>
    </div>
  );
};

export default AuthButton;

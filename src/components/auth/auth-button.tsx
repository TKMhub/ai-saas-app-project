import { SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";

const AuthButton = () => {
  return (
    <div className="flex items-center gap-4">
      <SignInButton>
        <Button variant={"ghost"}>ログイン</Button>
      </SignInButton>
      <SignUpButton>
        <Button variant={"secondary"}>新規登録</Button>
      </SignUpButton>
    </div>
  );
};

export default AuthButton;

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";

const AuthButton = () => {
  return (
    <div className="flex items-center gap-4">
      <SignInButton>ログイン</SignInButton>
      <SignUpButton>新規登録</SignUpButton>
    </div>
  );
};

export default AuthButton;

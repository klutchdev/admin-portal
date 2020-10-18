import React from "react";
import { Router } from "@reach/router";

import SignInForm from "./sign-in";
import PasswordReset from "./password-reset";

const AuthPage = () => (
  <Router>
    <SignInForm path="/" />
    <PasswordReset path="passwordReset" />
  </Router>
);

export default AuthPage;

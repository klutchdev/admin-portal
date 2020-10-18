import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth } from "../firebase";

import Header from "./header";
import Button from "./button";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const sendResetEmail = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
      })
      .catch((error) => {
        setError("Error resetting password", error);
        setTimeout(() => setError(null), 3000);
      });
  };

  return (
    <div className="text-center">
      {emailSent && <Header content="An email has been sent!" />}
      {error !== null && <Header content={error} />}
      <form action="" className="form-signin card p-4 shadow">
        <Header content="Password reset" />
        <input
          type="email"
          name="userEmail"
          className="form-control form-control-lg my-3"
          value={email}
          placeholder="Enter your email"
          onChange={setEmail(email)}
        />
        <Button
          className="button btn btn-dark btn-block mt-3"
          type="submit"
          labelText="Send reset link"
          onClick={sendResetEmail(e)}
        />
        <Link className="mt-4 mb-2" to="/">
          Back to sign in page
        </Link>
      </form>
    </div>
  );
};

export default PasswordReset;

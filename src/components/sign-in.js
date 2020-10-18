import React, { useState, useContext } from "react";
import { Link, Router } from "@reach/router";
import "./sign-in.css";

import { auth } from "../firebase";
import Header from "./header";
import Button from "./button";
import Dashboard from "./dashboard";
import UserContext from "../providers/UserProvider";

const AdminDashboard = () => {
  const user = useContext(UserContext);
  return user ? (
    <Dashboard />
  ) : (
    <Router>
      <SignInForm path="/" />
      <PasswordReset path="passwordReset" />
    </Router>
  );
};

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  const signInHandler = (e, email, password) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in");
      console.error("Error signing in", error);
    });
  };

  // Component
  return (
    <div className="text-center">
      <form className="form-signin  card p-4 shadow-lg">
        {!error ? (
          <Header content="Admin portal" />
        ) : (
          <Header content={error} />
        )}
        {/* {error !== null && <Header content={error} />} */}
        <input
          type="email"
          name="userEmail"
          value={email}
          className="form-control form-control-lg my-3"
          placeholder="Email"
          onChange={(e) => onChangeHandler(e)}
        />

        <input
          type="password"
          name="userPassword"
          value={password}
          placeholder="Password"
          className="form-control form-control-lg my-3"
          onChange={(e) => onChangeHandler(e)}
        />

        <Button
          className="button btn btn-dark btn-block mt-3"
          type="button"
          labelText="Sign in"
          onClick={(e) => signInHandler(e, email, password)}
        />
        <Link to="passwordReset" className="mt-4">
          Forgot password?
        </Link>
      </form>
    </div>
  );
};

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  return (
    <div className="text-center">
      <form action="" className="form-signin card p-4 shadow">
        {error === null && <Header content="Password reset" />}
        {emailHasBeenSent && <Header content="An email has been sent!" />}
        {error !== null && <Header content={error} />}
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          className="form-control form-control-lg my-3"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => onChangeHandler(e)}
        />
        <Button
          className="button btn btn-dark btn-block mt-3"
          type="submit"
          labelText="Send reset link"
          onClick={sendResetEmail}
        />
        <Link className="mt-4 mb-2" to="/">
          Back to sign in page
        </Link>
      </form>
    </div>
  );
};

export default AdminDashboard;

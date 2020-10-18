import React, { useState } from "react";
import { Link } from "@reach/router";
import { Router } from "@reach/router";
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

  const signInHandler = (e, email, password) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in");
      console.error("Error signing in", error);
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  // Component
  return (
    <div className="text-center">
      {error !== null && <Header content={error} />}
      <Header content="Sign in" />
      <form className="form-signin bg-light card p-4 shadow-lg">
        <input
          type="email"
          name="userEmail"
          value={email}
          id="userEmail"
          className="form-control form-control-lg my-3"
          placeholder="Email"
          onChange={(e) => onChangeHandler(e)}
        />

        <input
          type="password"
          name="userPassword"
          value={password}
          id="userPassword"
          placeholder="Password"
          className="form-control form-control-lg my-3"
          onChange={(e) => onChangeHandler(e)}
        />

        <Button
          className="button btn btn-lg btn-dark btn-block mt-3"
          type="submit"
          labelText="Sign in"
          onClick={(e) => {
            signInHandler(e, email, password);
          }}
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
      });
  };

  return (
    <div className="container text-center">
      <Header content="Reset your password" />
      {emailHasBeenSent && <Header content="An email has been sent!" />}
      {error !== null && <Header content={error} />}
      <form action="" className="bg-gradient bg-light card p-4 shadow-lg">
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
          className="button btn btn-lg btn-dark btn-block mt-3"
          type="submit"
          labelText="Send reset link"
          onClick={sendResetEmail}
        />
      </form>

      <Link className="mt-4" to="/">
        Back to sign in page
      </Link>
    </div>
  );
};

export default AdminDashboard;

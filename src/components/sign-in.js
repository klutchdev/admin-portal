import React from "react";
import { Link } from "@reach/router";
import "./sign-in.css";

import Header from "./header";
import Button from "./button";
import { auth } from "../firebase";

const SignInForm = () => (
  <div className="text-center">
    <Header content={error} />
    <form className="form-signin  card p-4 shadow-lg">
      <Header content="Admin portal" />
      <input
        type="email"
        name="userEmail"
        value={email}
        className="form-control form-control-lg my-3"
        placeholder="Email"
        onChange={setEmail(email)}
      />

      <input
        type="password"
        name="userPassword"
        value={password}
        placeholder="Password"
        className="form-control form-control-lg my-3"
        onChange={setPassword(password)}
      />

      <Button
        className="button btn btn-dark btn-block mt-3"
        type="submit"
        labelText="Sign in"
        onClick={() =>
          auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => setError("Error signing in", error))
        }
      />
      <Link to="passwordReset" className="mt-4">
        Forgot password?
      </Link>
    </form>
  </div>
);

export default SignInForm;

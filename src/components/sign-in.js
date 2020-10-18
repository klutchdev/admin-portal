import React from "react";
import "./sign-in.css";

import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { auth } from "../firebase";

import Button from "./button";
import Header from "./header";

const styles = {
  container: {
    maxWidth: `960px`,
    margin: "0 auto",
    background: `whitesmoke`,
    borderRadius: 6,
  },
  input: {
    width: "100%",
    borderRadius: 6,
  },
};

const SignInForm = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onSubmit",
  });

  const signIn = (data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .catch((error) => {
        console.log(error.code, error.message);
      })
      .then((data) => {
        console.log(data.user.email);
      });
  };

  return (
    // Component
    <>
      <Header content="Sign into your account" />

      <div className="form-signin text-center">
        <form
          className="bg-gradient bg-light card p-4 shadow-lg"
          onSubmit={handleSubmit(signIn)}
        >
          <input
            type="email"
            name="email"
            className="form-control form-control-lg my-3"
            placeholder="Login ID"
            ref={register({
              required: true,
              validate: (input) => isEmail(input),
            })}
            style={{
              ...styles.input,
              borderColor: errors.email && "red",
            }}
            autoFocus
          />

          <input
            type="password"
            name="password"
            className="form-control form-control-lg my-3"
            placeholder="Password"
            ref={register({
              required: true,
            })}
            style={{
              ...styles.input,
              borderColor: errors.password && "red",
            }}
          />

          <Button
            className="button btn btn-lg btn-dark btn-block mt-3"
            type="submit"
            labelText="Sign in"
            disabledAction={formState.isSubmitting}
          />

          <a href="/" className="mt-4">
            Forgot password?
          </a>
        </form>
      </div>
    </>
  );
};

export default SignInForm;

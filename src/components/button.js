import React from "react";
import "./button.css";

const Button = ({ disabledAction, labelText, type, className, onClick }) => (
  <button
    type={type}
    className={className}
    disabled={disabledAction}
    onClick={onClick}
  >
    {labelText}
  </button>
);

export default Button;

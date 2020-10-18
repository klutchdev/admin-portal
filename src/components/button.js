import React from "react";
import "./button.css";

const Button = ({
  disabledAction,
  labelText,
  type,
  className,
  onClick,
  onSubmit,
}) => (
  <button
    type={type}
    className={className}
    disabled={disabledAction}
    onClick={onClick}
    onSubmit={onSubmit}
  >
    {labelText}
  </button>
);

export default Button;

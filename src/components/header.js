import React from "react";
import "./header.css";

const Header = ({ content }) => (
  <div className="pt-2 pb-3 mb-2 text-center">
    <h1 className="header-h1" style={{ color: "#212121" }}>
      {content}
    </h1>
  </div>
);

export default Header;

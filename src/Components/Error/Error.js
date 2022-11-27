import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";
import animation from "./../../assets/error_animation.png";

const Error = () => {
  return (
    <div className="error">
      <div className="e-image">
        <img src={animation} alt="pic" />
      </div>
      <h1>You'vs found a page that doesn't exist</h1>
      <h3>Something went wrong</h3>
      <Link className="e-btn" to={"/"}>
        Back To Home
      </Link>
    </div>
  );
};

export default Error;

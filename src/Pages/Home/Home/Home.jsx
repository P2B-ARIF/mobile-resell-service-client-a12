import React from "react";
import "./Home.css";
import BodyHead from "./../HeaderBody/BodyHead";
import AllPhone from "../AllPhone/AllPhone";
import Advertised from "../Advertised/Advertised";
import Gallery from "../Gallery/Gallery";

const Home = () => {
  return (
    <div>
      <BodyHead />
      <Advertised />
      <AllPhone />
      <Gallery />
    </div>
  );
};

export default Home;

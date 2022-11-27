import React, { useState } from "react";
import "./BodyHead.css";
import "swiper/css";
import "swiper/css/pagination";
import {  Carousel } from "flowbite-react";
import { useEffect } from "react";

const BodyHead = () => {
  const [allPhones, setAllPhones] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setAllPhones(data);
      });
  }, []);

  return (
    <>
    <div className="h-80 sm:h-75 xl:h-96 container mx-auto  phone__image-content">
      <Carousel slideInterval={2000}  className="">
        {allPhones?.map((phone, i) => {
          return (
            <div key={i} className="phone__image">
              <img src={phone.category_img} alt="" />
              <h1>{phone.category_name} </h1>
            </div>
          );
        })}
      </Carousel>
    </div>
    </>
  );
};

export default BodyHead;

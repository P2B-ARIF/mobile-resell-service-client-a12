import React, { useEffect } from "react";
import { useState } from "react";

const Gallery = () => {
  const [allPhones, setAllPhones] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setAllPhones(data);
      });
  }, []);

  return (
    <div className="container mx-auto mt-20">
      <div className="flex justify-center">
        <h1 className="text-center text-3xl font-bold inline-block text-slate-600 mb-10 relative gallery">
          Shop Gallery
        </h1>
      </div>
      <div className="gallery_image">
        <div className="gallery_image_left">
          <img src={allPhones[0]?.category_img} alt="category_img" />
        </div>
        <div className="gallery_image_right">
          <img src={allPhones[1]?.category_img} alt="category_img" />
          <img src={allPhones[2]?.category_img} alt="category_img" />
          <img src={allPhones[3]?.category_img} alt="category_img" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;

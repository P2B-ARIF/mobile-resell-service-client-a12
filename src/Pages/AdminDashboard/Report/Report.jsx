import { Button, Card } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const Report = () => {
  const [reportCard, setReportCard] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/reportedPhones`)
      .then((res) => res.json())
      .then((data) => setReportCard(data));
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_PORT}/reportItemDelete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Report item deleted successfully");
        console.log(data);
        const filter = reportCard.filter((report) => report._id !== id);
        setReportCard(filter);
      });
  };

  return (
    <div className="phone__content ">
      {reportCard?.map((phone, i) => {
        const {
          category_name,
          // email,
          _id,
          image,
          location,
          name,
          product_name,
          real_price,
          resell_price,
          verified,
          used_time,
          published_date,
        } = phone;
        return (
          <div key={i} className="max-w-xs mx-auto ">
            <Card
              imgAlt="product_image"
              imgSrc={image}
              className="product_image"
            >
              <h4 className=" text-md text-center font-semibold  text-gray-900 dark:text-white">
                {product_name}
              </h4>
              <h4 className="font-medium  text-gray-900 dark:text-white">
                Category: <strong>{category_name}</strong>
              </h4>
              <h4 className=" mt-0 p-0 font-medium flex items-center  text-gray-900 dark:text-white">
                Name: {name}{" "}
                {verified && (
                  <span className="ml-1 inline-flex items-center p-1 mr-2 text-sm font-semibold text-white bg-blue-400 rounded-full dark:bg-blue-200 dark:text-green-800">
                    <svg
                      aria-hidden="true"
                      className="w-2 h-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only"> Icon description</span>
                  </span>
                )}
              </h4>
              <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                Location: {location}
              </h4>
              <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                Price: {resell_price}
              </h4>
              <h4 className=" mt-0 p-0 font-medium line-through  text-gray-900 dark:text-white">
                Market Price: {real_price}
              </h4>
              <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                Published: {published_date}
              </h4>
              <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                Used: {used_time}
              </h4>

              <React.Fragment>
                <Button
                  onClick={(e) => handleDelete(e, _id)}
                  className="w-1/2 self-center"
                  color="failure"
                >
                  Delete
                </Button>
              </React.Fragment>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Report;

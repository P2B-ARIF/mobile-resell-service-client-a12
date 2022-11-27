import { Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../../Components/AuthProvider/AuthProvider";
// import "./BuyerDashboard.css";
import { toast } from "react-hot-toast";

const MyProducts = () => {
  const { user } = useContext(authContext);
  const [bookedPhones, setBookedPhones] = useState([]);
  console.log(bookedPhones);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/myProducts?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setBookedPhones(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  const handleDeleteProducts = (e, id) => {
    e.preventDefault();

    const permission = window.confirm("Are You sure you want to delete");

    if (permission) {
      fetch(`${process.env.REACT_APP_PORT}/deleteProducts/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Your product has been deleted");
            console.log(data);
            const filter = bookedPhones.filter((phone) => phone._id !== id);
            setBookedPhones(filter);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleAdvertised = (e, id) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_PORT}/advertised/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Your Products have been advertised");
          console.log(data);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container  mx-auto  sm:gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-3  lg:grid-cols-4">
      {bookedPhones?.map((phone, i) => {
        const {
          image,
          resell_price,
          published_date,
          product_name,
          used_time,
          category_name,
          _id,
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
              <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                Price: {resell_price}
              </h4>
              <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                Published: {published_date}
              </h4>
              <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                Used: {used_time}
              </h4>
              <div className=" md:flex md:gap-1">
                <Button
                  color={`${phone?.product_status ? "success" : "gray"}`}
                  className="w-full"
                >
                  {phone?.product_status ? "Sold" : "Unsold"}
                </Button>
                {phone?.product_status === "Sold" ? (
                  " "
                ) : (
                  <Button
                    onClick={(e) => handleAdvertised(e, _id)}
                    color={`${phone?.advertise ? "success" : "dark"}`}
                    className="w-full"
                  >
                    {phone?.advertise ? "Advertised" : "Advertise"}
                  </Button>
                )}
              </div>
              <div className="mx-auto w-1/2">
                <Button
                  onClick={(e) => handleDeleteProducts(e, _id)}
                  color="failure"
                  className="w-full"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default MyProducts;

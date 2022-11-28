import { Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Components/AuthProvider/AuthProvider";
import "./BuyerDashboard.css";

const DashboardData = () => {
  const { user } = useContext(authContext);
  const [bookedPhones, setBookedPhones] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/bookedPhones/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setBookedPhones(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

 

  return (
    <div className="container  mx-auto  sm:gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-3  lg:grid-cols-4">
      {bookedPhones.map((phone, i) => {
        const { img, price, product_name, seller_email, buyer_meeting, _id } =
          phone;
        return (
          <div key={i} className="max-w-xs mx-auto ">
            <Card imgAlt="product_image" imgSrc={img} className="product_image">
              <h4 className=" text-md text-center font-semibold  text-gray-900 dark:text-white">
                {product_name}
              </h4>
              <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                Price: {price}
              </h4>
              <h4 className="font-medium  text-gray-900 dark:text-white">
                Location: {buyer_meeting}
              </h4>
              <h4 className="text-sm text-gray-900 dark:text-white">
                Seller Email: {seller_email}
              </h4>
              <div className="flex justify-center">
                <Link className="w-1/2" to={`/buyerDashboard/payment/${_id}`}>
                  <Button className="w-full" color="purple">
                    Pay
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardData;

import React, { useState } from "react";
import "./Categories.css";
import { useLoaderData } from "react-router-dom";
import { Button, Card, Modal } from "flowbite-react";
import { RoleChecker } from "../Hooks/userChecker";
import { authContext } from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";

const Categories = () => {
  const [visible, setVisible] = useState(false);
  const [modelData, setModelData] = useState([]);
  const { user } = useContext(authContext);
  // const [phoneName, setPhoneNames] = useState('')

  const categories = useLoaderData();
  const isRole = RoleChecker(user);

  console.log(categories);
  const { email, name, product_name, resell_price } = modelData;

  const handleReportAdmin = (e, id) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_PORT}/reportAdmin/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Your report has been sent successfully");
        console.log(data);
      });
  };

  return (
    <div className="categories__head container mx-auto">
      <h1>Lists of {categories[0].category_name}</h1>
      <div className="phone__content">
        {categories?.map((phone, i) => {
          const {
            _id,
            image,
            location,
            name,
            product_name,
            real_price,
            category_name,
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
                <h4 className=" mt-0 p-0 font-medium   text-gray-900 dark:text-white">
                  Price: {resell_price}
                </h4>
                <h4 className=" mt-0 p-0 font-medium  line-through text-gray-900 dark:text-white">
                  Market Price: {real_price}
                </h4>
                <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                  Published: {published_date}
                </h4>
                <h4 className=" mt-0 p-0 font-medium  text-gray-900 dark:text-white">
                  Used: {used_time}
                </h4>

                <React.Fragment>
                  {/* {isRole?.status !== "buyer" && disabled} */}
                  {isRole?.status === "buyer" ? (
                    <div className="mx-auto w-1/2">
                      <Button
                        onClick={() => {
                          setVisible(true);
                          setModelData(phone);
                        }}
                        // onClick={(e) => handleBooked(e, phone?._id)}
                        color="purple"
                        className="w-full"
                      >
                        Book Now
                      </Button>
                    </div>
                  ) : (
                    <button
                      disabled
                      type="button"
                      className="w-full mt-2 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"

                      // className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Buyer Only Book
                    </button>
                  )}
                  <button
                    onClick={(e) => handleReportAdmin(e, _id)}
                    type="button"
                    className="w-full mt-1 py-2.5 px-5 text-sm font-medium text-black  bg-red-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Report to Admin
                  </button>
                </React.Fragment>
              </Card>
            </div>
          );
        })}
      </div>
      <Modal
        show={visible}
        size="xl"
        popup={true}
        onClose={() => setVisible(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-2 px-2 pb-2 sm:pb-2 lg:px-3 xl:pb-2">
            <h3 className="text-xl mb-5 text-center font-bold text-gray-700 dark:text-white">
              Booked Your Products
            </h3>

            <form>
              <div className="grid gap-4 mb-6 ">
                <div>
                  <label
                    htmlFor="seller_name"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Seller name
                  </label>
                  <input
                    type="text"
                    id="seller_name"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    // placeholder={name}
                    defaultValue={name}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={email}
                    readOnly
                  />
                </div>
                <div className="flex">
                  <div className="w-2/3 mr-3">
                    <label
                      htmlFor="product_name"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product name
                    </label>
                    <input
                      type="text"
                      id="product_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={product_name}
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="product_price"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      id="product_price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={resell_price}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Your Phone Number"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="meeting_location"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Meeting Location
                  </label>
                  <input
                    type="text"
                    id="meeting_location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Meeting Location"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center  ">
                <button
                  type="button"
                  className="w-1/2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Categories;

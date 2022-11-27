import { Modal } from "flowbite-react";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { format } from "date-fns";
// import { useContext } from "react";
import { authContext } from "./../../Components/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const AddProducts = ({ setModelData, visible, setVisible, modelData }) => {
  const [allPhones, setAllPhones] = useState([]);
  const [isUser, setIsUser] = useState([]);
  const { user } = useContext(authContext);
  // const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setAllPhones(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/checkVerify?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setIsUser(data));
  }, [user?.email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const published_date = format(new Date(), "PP");
    const sell_price = e.target.sell_price.value;
    const real_price = e.target.real_price.value;
    const product_name = e.target.product_name.value;
    const location = e.target.location.value;
    const used = e.target.used.value;
    const image = e.target.image.files[0];
    const category = e.target.category.value;

    

    const form = new FormData();
    form.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=6226ca30d95b139a79184223cfbc266a`;
    fetch(url, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((dataImg) => {


        // console.log(dataImg)
        const productsDetails = {
          category_name: category,
          name: user?.displayName,
          verified: isUser,
          email: user?.email,
          location: location,
          used_time: `${used} Month`,
          published_date: published_date,
          product_name: product_name,
          image: dataImg.data.url,
          resell_price: `$${sell_price}`,
          real_price: `$${real_price}`,
        };
// console.log(productsDetails);

        fetch(`${process.env.REACT_APP_PORT}/addProducts`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(productsDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast.success("Your new product successfully added");
              setModelData("");
              setVisible(false);
              console.log(data);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.error(err, "Error fetching image"));
  };
  return (
    <div>
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
              Add New Products
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-6 ">
                <div>
                  <label
                    htmlFor="email"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    name="email"
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // placeholder="Enter Meeting Location"
                    defaultValue={user?.displayName}
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
                    name="email"
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // placeholder="Enter Meeting Location"
                    defaultValue={user?.email}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="product_name"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="product_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter product name"
                    name="product_name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="your_location"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="your_location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Meeting Location"
                    required
                  />
                </div>
               
                <div className="flex items-center">
                  <div className="w-1/2 mr-3">
                    <label
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="file_input"
                    >
                      Upload file
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      name="image"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="category"
                    >
                     Select Category
                    </label>

                    <select
                      name="category"
                      id="category"
                      className="w-full rounded-lg focus:outline-none focus:border-none"
                    >
                      {allPhones.map((phone) => (
                        <option value={phone.category_name} >
                          {phone.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-0 sm:gap-2 md:gap-3">
                <div>
                  <label
                    htmlFor="used_phones"
                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Month
                  </label>
                  <input
                    type="number"
                    id="used_phones"
                    name="used"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Type used duration"
                  />
                </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="real_price"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Real Price
                    </label>
                    <input
                      name="number"
                      type="number"
                      id="real_price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Your Phone Number"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="sell_price"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sell Price
                    </label>
                    <input
                      name="number"
                      type="number"
                      id="sell_price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Your Phone Number"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center  ">
                <button
                  type="submit"
                  className="w-1/2 text-gray-900 bg-white border border-gray-300  hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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

export default AddProducts;

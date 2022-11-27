import React, { useContext, useEffect } from "react";
import "./Header.css";
import "flowbite";
import "flowbite-react";
import { Dropdown, Navbar } from "flowbite-react";
// import Login from "./../Login/Login";
// import Register from "./../Register/Register";
import { authContext } from "./../AuthProvider/AuthProvider";
import { RoleChecker } from "./../Hooks/userChecker";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from './../../assets/favicon.png'

const Header = () => {
  const [allPhones, setAllPhones] = useState([]);
  const { user, logOut } = useContext(authContext);

  const isRole = RoleChecker(user);

  console.log(isRole);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setAllPhones(data);
      });
  }, []);

  console.log(allPhones);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        RoleChecker('')
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <nav className="container mx-auto">
        <Navbar fluid={true} rounded={true}>
          <Navbar.Brand href="/">
            <img
              src={logo}
              className="mr-3 h-6 sm:h-9"
              alt="company Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              MRS
            </span>
          </Navbar.Brand>
          <div className="flex  md:order-2">
            {user?.email ? (
              <button
                onClick={handleLogOut}
                type="button"
                className="text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link active={true}>
              <Link to="/">Home</Link>
            </Navbar.Link>
            {isRole?.status === "buyer" && user?.email ? (
              <Navbar.Link href="/buyerDashboard">Buyer Dashboard</Navbar.Link>
            ) : (
              ""
            )}
            {isRole?.status === "seller" && user?.email ? (
              <Navbar.Link href="/sellerDashboard">
                Seller Dashboard
              </Navbar.Link>
            ) : (
              ""
            )}
            {isRole?.status === "admin" && user?.email ? (
              <Navbar.Link href="/adminDashboard">Admin Dashboard</Navbar.Link>
            ) : (
              ""
            )}

            <Dropdown label="Category" inline={true}>
              {allPhones?.map((phone, i) => {
                return (
                  <Dropdown.Item key={i}>
                    <Link to={`/categories/${phone?.category_name}`}>
                      {phone.category_name}
                    </Link>
                  </Dropdown.Item>
                );
              })}
            </Dropdown>

            <Navbar.Link href="/blog">Blogs</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </nav>
    </div>
  );
};

export default Header;

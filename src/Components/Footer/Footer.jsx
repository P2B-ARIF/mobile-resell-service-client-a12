import React from "react";
import "./Footer.css";
import logo from "./../../assets/favicon.png";

const Footer = () => {
  return (
    <>
      <footer className="mt-20 p-4 bg-slate-900  shadow md:px-6 md:py-8 dark:bg-gray-900">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <img src={logo} className="mr-3 h-8" alt="company Logo" />
            <span className="self-center text-slate-300 text-2xl font-semibold whitespace-nowrap">
              Mobile Resell Service
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6 ">
                Facebook
              </a>
            </li>
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6">
                Linkedin
              </a>
            </li>
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6 ">
                Github
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Mobile Resell Service
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
};

export default Footer;

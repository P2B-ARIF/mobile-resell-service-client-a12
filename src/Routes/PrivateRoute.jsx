import { Button, Spinner } from "flowbite-react";
import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Components/AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, spinner } = useContext(authContext);
  const location = useLocation();

  console.log(user);
  console.log("user");
  if (spinner) {
    return (
      <Button color="gray">
        <Spinner aria-label="Alternate spinner button example" />
        <span className="pl-3">Loading...</span>
      </Button>
    );
  }

  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location }} replace>
        {children}
      </Navigate>
    );
  }

  return children;
};

export default PrivateRoute;

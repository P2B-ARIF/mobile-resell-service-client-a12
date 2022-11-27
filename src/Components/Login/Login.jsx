import { Button, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Label } from "flowbite-react";
import { authContext } from "../AuthProvider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { userLogin, loginWithGoogle } = useContext(authContext);
  const provider = new GoogleAuthProvider();
  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });;
      })
      .catch((err) => console.error(err));
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    loginWithGoogle(provider)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });;

        console.log(user);
        const { displayName, email } = user;
        const googleUsers = {
          name: displayName,
          email,
          status: "buyer",
        };
        fetch(`${process.env.REACT_APP_PORT}/addUsers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(googleUsers),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("user created")
            console.log(data)})
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="h-[93vh] flex items-center">
      <form
        onSubmit={handleLogin}
        className="container mx-auto w-[90%] sm:w-[500px] md:w-[500px]"
      >
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-white">
            Log in to get services
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              placeholder="Enter your email"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Enter your password"
              required={true}
            />
          </div>

          <div className="w-full mt-0 pt-0">
            <Button type="submit">Log in to your account</Button>
          </div>
          <div className="text-sm flex font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              to="/register"
              className=" ml-3 cursor-pointer text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
          <div className="w-full flex items-center">
            <span className="w-full h-[1px] bg-slate-500"></span>
            <small className="mx-3">Or</small>
            <span className="w-full h-[1px] bg-slate-500"></span>
          </div>
          <div className="w-full mt-0 pt-0 flex justify-center">
            <Button onClick={handleGoogleLogin} color="success">
              <FaGoogle className="mr-3" /> Continue With Google
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

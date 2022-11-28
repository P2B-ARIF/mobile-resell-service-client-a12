import { GoogleAuthProvider } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";

const Register = ({ modalIssOpen, setModelIssOpen, setLoginModalOpen }) => {
  // const [modalIssOpen, setModelIssOpen] = useState(false);
  const { createNewAccount, userUpdate, loginWithGoogle } =
    useContext(authContext);
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const status = e.target.status.value;

    createNewAccount(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/");
        toast.success("Successfully account created");
        userUpdate({ displayName: name })
          .then(() => {
            getUserToken(email);
            const theUsers = {
              name,
              email,
              status,
              quality: "Not Verified",
            };
            console.log(theUsers);
            fetch(`${process.env.REACT_APP_PORT}/addUsers`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(theUsers),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "data save in server");
              })
              .catch((err) => console.error(err, "data not saved in server"));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.error(err));
  };

  const getUserToken = (email) => {
    fetch(`${process.env.REACT_APP_PORT}/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/");
        }
      });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();


    loginWithGoogle(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const { displayName, email } = user;
        const theGoogleUsers = {
          name: displayName,
          email,
          status: "buyer",
        };
        fetch(`${process.env.REACT_APP_PORT}/addUsers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(theGoogleUsers),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-[90vh] flex items-center">
      <form
        onSubmit={handleRegister}
        className="container mx-auto w-[90%] sm:w-[500px] md:w-[500px]"
      >
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Register to our platform
          </h3>
          <div>
            <div className="ml-1 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              placeholder="Enter your name"
              required={true}
            />
          </div>
          <div>
            <div className="ml-1 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              placeholder="Enter your email"
              required={true}
            />
          </div>
          <div>
            <div className="ml-1 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Enter your password"
              required={true}
            />
          </div>

          <div>
            <h3 className="ml-1 font-semibold text-gray-900 dark:text-white">
              Identification
            </h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="user"
                    type="radio"
                    value="buyer"
                    name="status"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    defaultChecked
                  />
                  <label
                    htmlFor="user"
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Buyer
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="seller"
                    type="radio"
                    value="seller"
                    name="status"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="seller"
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Seller
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div className="w-full flex justify-around">
            <Button type="submit">Create your account</Button>
            <Button onClick={handleGoogleLogin} color="success">
              <FaGoogle className="mr-3" />
              Google
            </Button>
          </div>
          <div className="text-sm flex font-medium text-gray-500 dark:text-gray-300">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="ml-3 cursor-pointer text-blue-700 hover:underline dark:text-blue-500"
            >
              login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

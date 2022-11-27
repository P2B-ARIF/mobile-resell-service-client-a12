import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
// import Login from "./../Pages/Login/Login";
// import Register from "./../Pages/Register/Register";
import Home from "./../Pages/Home/Home/Home";
import Categories from "../Components/Categories/Categories";
import Dashboard from "../Pages/AdminDashboard/Dashboard/Dashboard";
import AllBuyers from "./../Pages/AdminDashboard/AllBuyers/AllBuyers";
import AllUsers from "./../Pages/AdminDashboard/AllUsers/AllUsers";
import AllSellers from "./../Pages/AdminDashboard/AllSellers/AllSellers";
import Error from "./../Components/Error/Error";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import PrivateRoute from "./PrivateRoute";
import BuyerDashboard from "../Pages/BuyerDashboard/BuyerDashboard";
import DashboardData from "../Pages/BuyerDashboard/DashboardData";
import SellerDashboard from "../Pages/SellerDashboard/SellerDashboard";
import MyProducts from "../Pages/SellerDashboard/MyProducts";
import Blog from "../Pages/Blog/Blog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:name",
        element: (
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          fetch(`http://localhost:5000/categories/${params.name}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/buyers",
        element: <AllBuyers />,
      },
      {
        path: "/dashboard/sellers",
        element: <AllSellers />,
      },
    ],
  },
  {
    path: "/buyerDashboard",
    element: <BuyerDashboard />,
    children: [{ path: "/buyerDashboard", element: <DashboardData /> }],
  },
  {
    path: "/sellerDashboard",
    element: <SellerDashboard />,
    children: [{ path: "/sellerDashboard", element: <MyProducts /> }],
  },
]);

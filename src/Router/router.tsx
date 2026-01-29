import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main_Layout from "../Layout/Main_Layout";
import Landing_Page from "../Pages/Landing_Page";
import Login from "../Pages/Login";
import Sign_Up from "../Pages/Sign_Up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_Layout />,
    children: [
      {
        index: true,
        element: <Landing_Page />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Sign_Up />,
      },
    ],
  },
]);

const Router_Pages = () => {
  return <RouterProvider router={router} />;
};

export default Router_Pages;

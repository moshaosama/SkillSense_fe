import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main_Layout from "../Layout/Main_Layout";
import Landing_Page from "../Pages/Landing_Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_Layout />,
    children: [
      {
        index: true,
        element: <Landing_Page />,
      },
    ],
  },
]);

const Router_Pages = () => {
  return <RouterProvider router={router} />;
};

export default Router_Pages;

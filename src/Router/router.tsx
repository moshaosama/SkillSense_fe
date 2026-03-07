import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main_Layout from "../Layout/Main_Layout";
import Landing_Page from "../Pages/Landing_Page";
import Login from "../Pages/Login";
import Sign_Up from "../Pages/Sign_Up";
import UploadCV from "../Features/Cv_Upload/index";
import Templates from "../Pages/Templates";
import Dashboard_Page from "../Pages/Dashboard_Page";
import ComingSoon from "../Pages/ComingSoon";
import Profile_Page from "../Pages/Profile_Page";
import PrivacyPolicy from "../Pages/Legal/PrivacyPolicy";
import TermsOfService from "../Pages/Legal/TermsOfService";
import CookiePolicy from "../Pages/Legal/CookiePolicy";
import RefundPolicy from "../Pages/Legal/RefundPolicy";

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
      {
        path: "/upload-cv",
        element: <UploadCV />,
      },
      {
        path: "/templates",
        element: <Templates/>
      },
      {
        path: "/dashboard",
        element: <Dashboard_Page />
      },
      {
        path: "/my-portfolio",
        element: <ComingSoon />
      },
      {
        path: "/analysis",
        element: <ComingSoon />
      },
      {
        path: "/settings",
        element: <ComingSoon />
      },
      {
        path: "/profile",
        element: <Profile_Page />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />
      },
      {
        path: "/cookie-policy",
        element: <CookiePolicy />
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />
      }
    ],
  },
],
{
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

const Router_Pages = () => {
  return <RouterProvider router={router} />;
};

export default Router_Pages;

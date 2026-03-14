import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main_Layout from "../Layout/Main_Layout";
import Landing_Page from "../Pages/Landing_Page";
import Login from "../Pages/Login";
import Sign_Up from "../Pages/Sign_Up";
import UploadCV from "../Features/Cv_Upload/index";
import Templates from "../Pages/Templates";
import Dashboard_Page from "../Pages/Dashboard_Page";
import Profile_Page from "../Pages/Profile_Page";
import ProtectedRoute from "../Shared/Components/ProtectedRoute";
import MyPortfolioPage from "../Pages/MyPortfolioPage";
import AnalysisPage from "../Pages/AnalysisPage";
import SettingsPage from "../Pages/SettingsPage";
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
        element: <ProtectedRoute><UploadCV /></ProtectedRoute>,
      },
      {
        path: "/templates",
        element: <Templates/>
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard_Page /></ProtectedRoute>,
      },
      {
        path: "/my-portfolio",
        element: <MyPortfolioPage />
      },
      {
        path: "/analysis",
        element: <AnalysisPage />
      },
      {
        path: "/settings",
        element: <SettingsPage />
      },
      {
        path: "/profile",
        element: <ProtectedRoute><Profile_Page /></ProtectedRoute>,
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

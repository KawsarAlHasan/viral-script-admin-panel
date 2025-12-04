import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/NotFound";
import Profile from "../pages/profile/Profile";
import UsersPage from "../pages/users/Users";
import Pricing from "../pages/pricing/Pricing";
import TermsConditions from "../pages/termsConditions/TermsConditions";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";
import PrivateRoute from "./PrivateRoute";
import Templates from "../pages/templates/Templates";
import ResearchSheets from "../pages/research-sheets/ResearchSheets";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  //   {
  //     path: "/forget-password",
  //     element: <ForgotPassword />,
  //   },
  //   {
  //     path: "/check-code",
  //     element: <CheckCode />,
  //   },
  //   {
  //     path: "/set-new-password",
  //     element: <SetNewPassword />,
  //   },
  //   {
  //     path: "/password-update-login",
  //     element: <PasswordUpdateLogin />,
  //   },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/user-management",
        element: <UsersPage />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/templates",
        element: <Templates />,
      },
      {
        path: "/research-sheets",
        element: <ResearchSheets />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

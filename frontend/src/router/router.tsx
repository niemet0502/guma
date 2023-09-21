import { AuthPage } from "@/domains/auth/AuthPage";
import { SignIn } from "@/domains/auth/SignIn";
import { SignUp } from "@/domains/auth/SignUp";
import { NotificationsList } from "@/domains/notifications/NotificationsList";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { Documents } from "../domains/documents/Documents";
import {
  AuthenticationGuard,
  UnAuthenticationGuard,
} from "./components/AuthenticationGuard";

const NotFoundPage = () => {
  return <div>Not found</div>;
};

export const router = createBrowserRouter([
  {
    element: <AuthenticationGuard />,
    children: [
      {
        path: "/org",
        element: <Layout />,
        children: [
          {
            index: true,
            path: "documents",
            element: <Documents />,
          },
          {
            path: "notifications",
            element: <NotificationsList />,
          },
          {
            path: "*", // Matches any path not covered by previous routes
            element: <NotFoundPage />, // Display a "Not Found" page or error message
          },
        ],
      },
    ],
  },
  {
    element: <UnAuthenticationGuard />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
        children: [
          {
            path: "signin",
            element: <SignIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);

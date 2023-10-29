import { AuthPage } from "@/domains/auth/AuthPage";
import { SignIn } from "@/domains/auth/SignIn";
import { SignUp } from "@/domains/auth/SignUp";
import { NotificationsList } from "@/domains/notifications/NotificationsList";
import { OrganizationForm } from "@/domains/organization/OrganizationForm";
import { TaskDetails } from "@/domains/tasks/pages/Details";
import { TaskList } from "@/domains/tasks/pages/List";
import { Documents } from "@/domains/wiki/documents/Documents";
import { Wiki } from "@/domains/wiki/pages/List";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
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
        path: "/:orgaId",
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
            path: "team/:teamId/issues",
            children: [
              {
                index: true,
                element: <TaskList />,
              },
              {
                path: "/:orgaId/team/:teamId/issues/:issueId",
                element: <TaskDetails />,
              },
            ],
          },
          {
            path: "team/:teamId/documents",
            children: [
              {
                index: true,
                element: <Wiki />,
              },
            ],
          },
          {
            path: "*", // Matches any path not covered by previous routes
            element: <NotFoundPage />, // Display a "Not Found" page or error message
          },
        ],
      },
      {
        path: "/create-workspace",
        element: <OrganizationForm />,
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

import { AuthPage } from "@/domains/auth/AuthPage";
import { SignIn } from "@/domains/auth/SignIn";
import { SignUp } from "@/domains/auth/SignUp";
import { NotificationsList } from "@/domains/notifications/NotificationsList";
import { OrganizationForm } from "@/domains/organization/OrganizationForm";
import { QuestionList } from "@/domains/sharing/pages/List";
import { SprintDetails } from "@/domains/sprints/pages/Details";
import { SprintList } from "@/domains/sprints/pages/List";
import { TaskDetails } from "@/domains/tasks/pages/Details";
import { TaskList } from "@/domains/tasks/pages/List";
import { Documents } from "@/domains/wiki/documents/Documents";
import { DocumentDetails } from "@/domains/wiki/documents/pages/Details";
import { FolderDetails } from "@/domains/wiki/folders/pages/Details";
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
    path: "/",
    children: [
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
                index: true,
                path: "questions",
                element: <QuestionList />,
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
                path: "team/:teamId/wiki",
                children: [
                  {
                    index: true,
                    element: <Wiki />,
                  },
                  {
                    path: "/:orgaId/team/:teamId/wiki/folder/:folderId",
                    element: <FolderDetails />,
                  },
                  {
                    path: "/:orgaId/team/:teamId/wiki/doc/:docId",
                    element: <DocumentDetails />,
                  },
                ],
              },
              {
                path: "team/:teamId/sprints",
                children: [
                  {
                    index: true,
                    element: <SprintList />,
                  },
                  {
                    path: "/:orgaId/team/:teamId/sprints/:sprintId",
                    element: <SprintDetails />,
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
    ],
  },
]);

import { Layout } from "@/Layout/Layout";
import { AuthPage } from "@/domains/auth/AuthPage";
import { SignIn } from "@/domains/auth/SignIn";
import { SignUp } from "@/domains/auth/SignUp";
import { useAuth } from "@/domains/auth/providers/auth";
import { ModuleDetails } from "@/domains/modules/pages/ModuleDetails";
import { ModulesList } from "@/domains/modules/pages/ModulesList";
import { Roadmap } from "@/domains/modules/pages/Roadmap";
import { NotificationDetails } from "@/domains/notifications/NotificationDetails";
import { NotificationsList } from "@/domains/notifications/NotificationsList";
import { OrganizationForm } from "@/domains/organization/OrganizationForm";
import { AskQuestion } from "@/domains/sharing/pages/CreateQuestion";
import { QuestionDetails } from "@/domains/sharing/pages/Details";
import { QuestionList } from "@/domains/sharing/pages/List";
import { SprintDetails } from "@/domains/sprints/pages/Details";
import { SprintList } from "@/domains/sprints/pages/List";
import { TaskDetails } from "@/domains/tasks/pages/Details";
import { TaskList } from "@/domains/tasks/pages/List";
import { TeamGeneralSettings } from "@/domains/teams/pages/TeamGeneralSettings";
import { TeamLabels } from "@/domains/teams/pages/TeamLabels";
import { TeamMembers } from "@/domains/teams/pages/TeamMembers";
import { TeamSettings } from "@/domains/teams/pages/TeamSettings";
import { TeamWorkflow } from "@/domains/teams/pages/TeamWorkflow";
import { DocumentDetails } from "@/domains/wiki/documents/pages/Details";
import { FolderDetails } from "@/domains/wiki/folders/pages/Details";
import { Wiki } from "@/domains/wiki/pages/List";
import { Navigate, createBrowserRouter } from "react-router-dom";

// Component to handle redirection for authenticated users
const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const { user, project } = useAuth();

  if (user && project) {
    return <Navigate to={`/${project.name}`} replace />;
  }

  return children;
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, project } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user && !project) {
    return <Navigate to="/create-project" replace />;
  }

  return children;
};

const ProjectLayout = () => {
  return (
    <RequireAuth>
      <Layout />
    </RequireAuth>
  );
};

const RootRedirect = () => {
  const { user, project, isInitialized } = useAuth();

  if (!user && isInitialized) {
    return <Navigate to="/auth" replace />;
  }

  if (user && !project && isInitialized) {
    return <Navigate to="/create-project" replace />;
  }

  if (user && project && isInitialized) {
    return <Navigate to={`/${project.name}`} replace />;
  }

  // Add a fallback UI in case no condition matches, though it should not happen
  return <div>Loading...</div>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/create-project",
    element: <OrganizationForm />,
  },
  {
    path: "/auth",
    element: (
      <RedirectIfAuthenticated>
        <AuthPage />
      </RedirectIfAuthenticated>
    ),
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/:orgaId",
    element: <ProjectLayout />,
    children: [
      {
        path: "questions/new",
        element: <AskQuestion />,
      },
      {
        path: "questions",
        children: [
          {
            index: true,
            element: <QuestionList />,
          },
          {
            path: "/:orgaId/questions/:questionId",
            element: <QuestionDetails />,
          },
        ],
      },
      {
        path: "notifications",
        element: <NotificationsList />,
        children: [
          {
            path: "/:orgaId/notifications/:notificationId",
            element: <NotificationDetails />,
          },
        ],
      },
      {
        path: "roadmap",
        element: <Roadmap />,
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
        path: "team/:teamId/modules",
        children: [
          {
            index: true,
            element: <ModulesList />,
          },
          {
            path: "/:orgaId/team/:teamId/modules/:moduleId",
            element: <ModuleDetails />,
          },
        ],
      },
      {
        path: "team/:teamId/settings",
        element: <TeamSettings />,
        children: [
          {
            path: "/:orgaId/team/:teamId/settings/general",
            element: <TeamGeneralSettings />,
          },
          {
            path: "/:orgaId/team/:teamId/settings/labels",
            element: <TeamLabels />,
          },
          {
            path: "/:orgaId/team/:teamId/settings/members",
            element: <TeamMembers />,
          },
          {
            path: "/:orgaId/team/:teamId/settings/workflow",
            element: <TeamWorkflow />,
          },
        ],
      },
    ],
  },
]);

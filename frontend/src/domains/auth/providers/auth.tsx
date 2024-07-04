import { Project } from "@/domains/organization/services/type";
import * as React from "react";
import { User, UserSession } from "../services/types";

interface AuthContextValue {
  user: User | null;
  login: (user: User, session: UserSession, project: Project | null) => void;
  logout: () => void;
  project: Project | null;
  updateProject: (project: Project) => void;
  updateUser: (user: User) => void;
  isInitialized: boolean;
}

export const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
  project: null,
  updateProject: () => {},
  updateUser: () => {},
  isInitialized: false,
} as AuthContextValue);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [project, setProject] = React.useState<Project | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const login = (user: User, session: UserSession, project: Project | null) => {
    setUser(user);
    setProject(project);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("session", JSON.stringify(session));
    localStorage.setItem("project", JSON.stringify(project));
  };

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    const project = localStorage.getItem("project");

    if (user) {
      setUser(JSON.parse(user));
    }

    if (project) {
      setProject(JSON.parse(project));
    }

    setIsInitialized(true);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("session");
    localStorage.removeItem("project");
  };

  const updateProject = (project: Project) => {
    localStorage.setItem("project", JSON.stringify(project));
    setProject(project);
  };

  const updateUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        project,
        updateProject,
        updateUser,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

import { Organization } from "@/domains/organization/services/type";
import * as React from "react";
import { User, UserSession } from "../services/types";

interface AuthContextValue {
  user: User | null;
  login: (
    user: User,
    session: UserSession,
    organization: Organization | null
  ) => void;
  logout: () => void;
  organization: Organization | null;
  updateOrganization: (organization: Organization) => void;
}

export const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
  organization: null,
  updateOrganization: () => {},
} as AuthContextValue);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [organization, setOrganization] = React.useState<Organization | null>(
    null
  );

  const login = (
    user: User,
    session: UserSession,
    organization: Organization | null
  ) => {
    setUser(user);
    setOrganization(organization);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("session", JSON.stringify(session));
    localStorage.setItem("organization", JSON.stringify(organization));
  };

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    const organization = localStorage.getItem("organization");

    if (user) {
      setUser(JSON.parse(user));
    }

    if (organization) {
      setOrganization(JSON.parse(organization));
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("session");
    localStorage.removeItem("organization");
  };

  const updateOrganization = (organization: Organization) => {
    localStorage.setItem("organization", JSON.stringify(organization));
    setOrganization(organization);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, organization, updateOrganization }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

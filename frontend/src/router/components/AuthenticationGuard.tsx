import { useAuth } from "@/domains/auth/providers/auth";
import { ProtectedRoute } from "./ProtectedRoute";

export type AuthenticationGuardProps = {
  children?: React.ReactElement;
  redirectPath?: string;
};

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  redirectPath = "/auth/signin",
  ...props
}) => {
  const { user } = useAuth();

  return (
    <ProtectedRoute redirectPath={redirectPath} isAllowed={!!user} {...props} />
  );
};

export const UnAuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  redirectPath = "/org/documents",
  ...props
}) => {
  const { user } = useAuth();

  return (
    <ProtectedRoute redirectPath={redirectPath} isAllowed={!user} {...props} />
  );
};

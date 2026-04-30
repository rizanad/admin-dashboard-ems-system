import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../../lib/auth";

interface Props {
  allowedRoles?: ("admin" | "employee")[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const user = getUser();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
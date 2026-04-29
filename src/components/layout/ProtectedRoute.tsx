import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../../lib/auth";

interface Props {
  allowedRoles?: ("admin" | "employee")[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const user = getUser();
  const location = useLocation();

  // 🔒 Not logged in → go to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // 👈 remember where user wanted to go
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Allowed
  return <Outlet />;
};

export default ProtectedRoute;
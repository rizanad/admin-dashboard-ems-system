import ErrorBoundary from "@/components/layout/ErrorBoundary";
import MainLayout from "@/components/layout/MainLayout";
import NotFound from "@/components/layout/NotFound";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Attendance from "@/pages/attendance";
import Dashboard from "@/pages/dashboard";
import Employee from "@/pages/employee";
import AddEmployeeForm from "@/pages/employee/manageEmployee/AddEmployeeForm";
import EditEmployeeForm from "@/pages/employee/manageEmployee/EditEmployeeForm";
import EmployeeDetails from "@/pages/employee/manageEmployee/EmployeeDetails";
import Inventory from "@/pages/inventory";
import Leave from "@/pages/leave";
import Login from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "", element: <Dashboard /> },

      {
        element: <ProtectedRoute allowedRoles={["admin", "employee"]} />,
        children: [
          { path: "attendance", element: <Attendance /> },
          { path: "leave", element: <Leave /> },
          { path: "employee/details/:id", element: <EmployeeDetails /> },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          { path: "employee", element: <Employee /> },
          { path: "employee/add-employee", element: <AddEmployeeForm /> },
          { path: "employee/edit/:id", element: <EditEmployeeForm /> },
          { path: "inventory", element: <Inventory /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
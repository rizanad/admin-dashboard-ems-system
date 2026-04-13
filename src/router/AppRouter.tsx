import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/dashboard/index";
import Attendance from "../pages/attendance/index";
import Employee from "../pages/employee/index";
import Leave from "../pages/leave/index";
import Inventory from "../pages/inventory/index";

import AddEmployeeForm from "@/pages/employee/manageEmployee/AddEmployeeForm";
import EmployeeDetails from "@/pages/employee/manageEmployee/EmployeeDetails";
import EditEmployeeForm from "@/pages/employee/manageEmployee/EditEmployeeForm";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import NotFound from "@/components/layout/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorBoundary/>,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "employee", element: <Employee /> },
      { path: "attendance", element: <Attendance /> },
      { path: "employee/add-employee", element: <AddEmployeeForm /> },
      { path: "employee/details/:id", element: <EmployeeDetails /> },
      { path: "employee/edit/:id", element: <EditEmployeeForm /> },
      { path: "leave", element: <Leave /> },
      { path: "inventory", element: <Inventory /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);
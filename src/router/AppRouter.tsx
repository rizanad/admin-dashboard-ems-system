import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/dashboard";
import Attendance from "../pages/attendance";
import Employee from "../pages/employee";
import Leave from "../pages/leave";
import Inventory from "../pages/inventory";
import AddEmployeeForm from "@/pages/employee/manageEmployee/AddEmployeeForm";
import EmployeeDetails from "@/pages/employee/manageEmployee/EmployeeDetails";
import EditEmployeeForm from "@/pages/employee/manageEmployee/EditEmployeeForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "employee", element: <Employee /> },
      { path: "attendance", element: <Attendance /> },
      { path:"employee/add-employee", element: <AddEmployeeForm/>},
      { path: "employee/details/:id", element: <EmployeeDetails /> }, 
      { path: "employee/edit/:id", element: <EditEmployeeForm /> },    
      { path: "leave", element: <Leave /> },
      { path: "inventory", element: <Inventory /> }
    ]
  }
]);
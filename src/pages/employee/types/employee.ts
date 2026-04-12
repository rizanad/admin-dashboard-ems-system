export type EmployeeStatus = "Active" | "Inactive" | "On Leave";

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email:string;
  department: string;
  status: EmployeeStatus;
  joinDate: string;
};
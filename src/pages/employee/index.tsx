import { Plus, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EmployeeTable from "./table/DataTable";
import EmployeeFilters from "./table/EmployeeFilters";
// import type { Employee } from "../employee/types/employee";

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

const Employee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("employees") || "[]"
    ) as Employee[];

    setEmployees(data);
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      `${emp.firstName} ${emp.lastName} ${emp.id} ${emp.email ?? ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesDept =
      selectedDept === "All Departments" ||
      emp.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="p-3 space-y-8 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-black text-slate-900 ">
            Employees
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            All our employees list can be found here.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 text-gray-600 bg-white border border-slate-200 rounded-2xl text-sm hover:border-emerald-400 hover:text-emerald-700 transition-all shadow-sm">
            <Download size={16} /> Export
          </button>

          <button
            onClick={() => navigate("/employee/add-employee")}
            className="flex items-center gap-2 px-3 py-3 bg-emerald-600 text-white rounded-2xl text-sm hover:bg-emerald-800 transition-all shadow-xl font-bold shadow-slate-200"
          >
            <Plus size={18} /> Add Employee
          </button>
        </div>
      </header>

      <EmployeeFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
      />

      <EmployeeTable data={filteredEmployees} />
    </div>
  );
};

export default Employee;
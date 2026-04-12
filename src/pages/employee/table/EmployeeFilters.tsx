import React from "react";
import { Search, Filter } from "lucide-react";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedDept: string;
  setSelectedDept: (value: string) => void;
};

const EmployeeFilters = ({
  searchQuery,
  setSearchQuery,
  selectedDept,
  setSelectedDept,
}: Props) => {
  const departments: string[] = [
    "All Departments",
    "Engineering",
    "Design",
    "Operations",
    "HR",
  ];

  return (
    <div className="bg-white p-5 rounded-3xl border border-emerald-50 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="relative w-full md:w-96">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
          size={18}
        />
        <input
          type="text"
          placeholder="Search records..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <Filter size={18} />
        </div>

        <select
          value={selectedDept}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedDept(e.target.value)
          }
          className="flex-1 md:w-56 bg-slate-50 text-sm font-black text-slate-600 border-none rounded-2xl px-5 py-3 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EmployeeFilters;
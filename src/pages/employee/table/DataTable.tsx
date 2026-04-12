import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmployeeTableHeader from "./Columns";

const DataTable = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm overflow-hidden">
      <Table>
        <EmployeeTableHeader />
        <TableBody>
          {data.length > 0 ? (
            data.map((emp) => (
              <TableRow key={emp.id} className="group hover:bg-emerald-50/20 transition-all border-b border-slate-50 last:border-0">
                <TableCell className="font-bold text-slate-400 text-xs">{emp.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xs">
                      {emp.firstName[0]}{emp.lastName[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {emp.firstName} {emp.lastName}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{emp.role}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 border-none px-3 py-1 rounded-lg text-[10px] font-black transition-colors">
                    {emp.department}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${emp.status === "Active" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-300"}`} />
                    <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">{emp.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 font-bold text-xs">{emp.joinDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <ActionButton 
                      icon={Eye} 
                      onClick={() => navigate(`/employee/details/${emp.id}`)} 
                      color="text-emerald-600" 
                    />
                    <ActionButton 
                      icon={Edit3} 
                      onClick={() => navigate(`/employee/edit/${emp.id}`)} 
                      color="text-emerald-600" 
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-20 text-slate-400 font-bold italic">No matching records found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const ActionButton = ({ icon: Icon, onClick, color }) => (
  <button onClick={onClick} className={`p-2.5 ${color} hover:bg-emerald-50 rounded-xl transition-all active:scale-90`}>
    <Icon size={16} />
  </button>
);

export default DataTable;
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, MessageSquareText, Edit3 } from "lucide-react";
import { useState } from "react";
import AttendanceTableHeader from "./Columns";
import ViewAttendance from "../manageAttendance/ViewAttendance";

type AttendanceStatus = "Present" | "Late" | "Absent" | "On Leave";

export type Attendance = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  notes?: string;
  createdAt?: string;
};

type Props = {
  data: Attendance[];
  onEditClick: (id: string) => void;
};

type ActionButtonProps = {
  icon: React.ElementType;
  onClick: () => void;
  color: string;
  hoverBg: string;
};

const DataTable = ({ data, onEditClick }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleViewDetails = (id: string) => {
    setSelectedId(id);
    setIsViewOpen(true);
  };

  const getStatusStyle = (status: AttendanceStatus) => {
    switch (status) {
      case "Present":
        return "bg-emerald-100 text-emerald-700 shadow-[0_0_8px_rgba(16,185,129,0.2)]";
      case "Late":
        return "bg-amber-100 text-amber-700 shadow-[0_0_8px_rgba(245,158,11,0.2)]";
      case "Absent":
        return "bg-rose-100 text-rose-700";
      case "On Leave":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const ActionButton = ({ icon: Icon, onClick, color, hoverBg }: ActionButtonProps) => (
    <button
      onClick={onClick}
      className={`p-2.5 ${color} ${hoverBg} rounded-xl transition-all active:scale-90`}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <>
      <div className="bg-white rounded-xl border border-emerald-50 shadow-sm overflow-hidden">
        <Table>
          <AttendanceTableHeader />
          <TableBody>
            {data.length > 0 ? (
              data.map((record) => (
                <TableRow
                  key={record.id}
                  className="group hover:bg-emerald-50/20 transition-all border-b border-slate-50 last:border-0"
                >
                  <TableCell className="font-black text-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-6 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {record.date}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">
                        {record.employeeName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-slate-800 text-sm">
                          {record.employeeName}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                          {record.employeeId}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {record.status !== "Absent" ? (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock size={14} className="text-emerald-500" />
                        <span className="font-bold text-xs">
                          {record.checkIn} — {record.checkOut}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-300 font-bold text-xs italic">
                        No hours logged
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`${getStatusStyle(
                        record.status
                      )} border-none px-3 py-1 rounded-lg text-[10px] font-black transition-all`}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {record.notes ? (
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <MessageSquareText size={14} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">
                          Has Note
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <ActionButton
                        icon={Eye}
                        onClick={() => handleViewDetails(record.id)}
                        color="text-emerald-600"
                        hoverBg="hover:bg-emerald-50"
                      />
                      <ActionButton
                        icon={Edit3}
                        onClick={() => onEditClick(record.id)}
                        color="text-amber-600"
                        hoverBg="hover:bg-amber-50"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-20 text-slate-400 font-bold italic"
                >
                  No attendance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ViewAttendance
        isOpen={isViewOpen}
        onClose={setIsViewOpen}
        attendanceId={selectedId}
      />
    </>
  );
};

export default DataTable;
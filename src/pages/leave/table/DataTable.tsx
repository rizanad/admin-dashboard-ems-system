import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit3, CalendarRange, Info } from "lucide-react";
import { useState } from "react";
import LeaveTableHeader from "./Columns";
import ViewLeave from "../manageLeave/ViewLeave";

type LeaveStatus = "Approved" | "Pending" | "Rejected";

type LeaveRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  leaveType: string; // FIX: avoid strict union conflict
  status: LeaveStatus;
  reason?: string;
};

type Props = {
  data: LeaveRecord[];
  onEditClick: (id: string) => void;
};

const LeaveTable = ({ data, onEditClick }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleViewDetails = (id: string) => {
    setSelectedId(id);
    setIsViewOpen(true);
  };

  const getStatusStyle = (status: LeaveStatus) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700 shadow-[0_0_8px_rgba(16,185,129,0.2)]";
      case "Pending":
        return "bg-amber-100 text-amber-700 shadow-[0_0_8px_rgba(245,158,11,0.2)]";
      case "Rejected":
        return "bg-rose-100 text-rose-700 shadow-[0_0_8px_rgba(225,29,72,0.1)]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <>
      <div className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm overflow-hidden">
        <Table>
          <LeaveTableHeader />
          <TableBody>
            {data.length > 0 ? (
              data.map((record) => (
                <TableRow
                  key={record.id}
                  className="group hover:bg-emerald-50/20 transition-all border-b border-slate-50 last:border-0"
                >
                  <TableCell className="font-black text-slate-800 text-xs">
                    <div className="flex flex-col">
                      <span>{record.startDate}</span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        to {record.endDate}
                      </span>
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
                    <div className="flex items-center gap-2 text-slate-600">
                      <CalendarRange size={14} className="text-emerald-500" />
                      <span className="font-bold text-xs">
                        {record.leaveType}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`${getStatusStyle(
                        record.status
                      )} border-none px-3 py-1 rounded-lg text-[10px] font-black`}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {record.reason ? (
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <Info size={14} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">
                          Details Attached
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
                  No leave requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ViewLeave
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        leaveId={selectedId}
      />
    </>
  );
};

type ActionButtonProps = {
  icon: React.ElementType;
  onClick: () => void;
  color: string;
  hoverBg: string;
};

const ActionButton = ({
  icon: Icon,
  onClick,
  color,
  hoverBg,
}: ActionButtonProps) => (
  <button
    onClick={onClick}
    className={`p-2.5 ${color} ${hoverBg} rounded-xl transition-all active:scale-90`}
  >
    <Icon size={18} />
  </button>
);

export default LeaveTable;
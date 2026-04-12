import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Calendar,
  FileText,
  BadgeCheck,
  User,
  Hash,
  CalendarRange,
  Briefcase,
  Info
} from "lucide-react";

type LeaveRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  leaveId: string | null;
};

const ViewLeave = ({ isOpen, onClose, leaveId }: Props) => {
  const [record, setRecord] = useState<LeaveRecord | null>(null);

  useEffect(() => {
    if (leaveId && isOpen) {
      const allRecords: LeaveRecord[] = JSON.parse(
        localStorage.getItem("leaves") || "[]"
      );
      const found = allRecords.find((r) => r.id === leaveId) || null;
      setRecord(found);
    }
  }, [leaveId, isOpen]);

  const getStatusConfig = (status?: LeaveRecord["status"]) => {
    const configs: Record<string, string> = {
      Approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
      Pending: "bg-amber-50 text-amber-700 border-amber-100",
      Rejected: "bg-rose-50 text-rose-700 border-rose-100",
    };
    return configs[status || ""] || "bg-slate-50 text-slate-700 border-slate-100";
  };

  const DetailCard = ({
    icon: Icon,
    label,
    value,
    colorClass = "text-slate-700",
  }: {
    icon: any;
    label: string;
    value?: string;
    colorClass?: string;
  }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-white">
      <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-emerald-600">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className={`text-sm font-bold ${colorClass}`}>
          {value || "Not Specified"}
        </p>
      </div>
    </div>
  );

  if (!record && isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2.5rem] bg-white">

        <div className="relative bg-slate-900 p-8 pt-10">
          <div className="relative flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-emerald-600 rounded-2xl text-white">
                <User size={24} />
              </div>

              <span
                className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase border-2 ${getStatusConfig(
                  record?.status
                )}`}
              >
                {record?.status}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                {record?.employeeName}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-slate-400">
                <Hash size={14} />
                <span className="text-xs font-bold">{record?.employeeId}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <DetailCard
              icon={Briefcase}
              label="Leave Type"
              value={record?.leaveType}
              colorClass="text-emerald-700"
            />
            <DetailCard
              icon={BadgeCheck}
              label="Request ID"
              value={record?.id}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DetailCard
              icon={Calendar}
              label="Start Date"
              value={record?.startDate}
            />
            <DetailCard
              icon={CalendarRange}
              label="End Date"
              value={record?.endDate}
            />
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/30 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2 text-emerald-700">
              <FileText size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Reason
              </span>
            </div>

            <p className="text-sm text-slate-600 italic">
              {record?.reason || "No reason provided"}
            </p>

            <Info size={60} className="absolute right-0 bottom-0 text-emerald-500/5" />
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black"
          >
            Done Viewing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewLeave;
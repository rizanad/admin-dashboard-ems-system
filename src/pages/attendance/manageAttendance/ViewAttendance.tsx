import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  FileText,
  BadgeCheck,
  Clock3,
  User,
  Hash,
  AlertCircle,
} from "lucide-react";

type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  status: "Present" | "Late" | "Absent" | "On Leave";
  date: string;
  checkIn?: string;
  checkOut?: string;
  notes?: string;
};

type Props = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  attendanceId: string | null;
};

type DetailCardProps = {
  icon: React.ElementType;
  label: string;
  value?: string;
  colorClass?: string;
};

const ViewAttendance = ({ isOpen, onClose, attendanceId }: Props) => {
  const [record, setRecord] = useState<AttendanceRecord | null>(null);

  useEffect(() => {
    if (attendanceId && isOpen) {
      const allRecords: AttendanceRecord[] = JSON.parse(
        localStorage.getItem("attendance") || "[]"
      );
      const found = allRecords.find((r) => r.id === attendanceId) || null;
      setRecord(found);
    }
  }, [attendanceId, isOpen]);

  const getStatusConfig = (status?: AttendanceRecord["status"]) => {
    const configs: Record<string, string> = {
      Present: "bg-emerald-50 text-emerald-700 border-emerald-100",
      Late: "bg-amber-50 text-amber-700 border-amber-100",
      Absent: "bg-rose-50 text-rose-700 border-rose-100",
      "On Leave": "bg-blue-50 text-blue-700 border-blue-100",
    };

    return (
      configs[status || ""] || "bg-slate-50 text-slate-700 border-slate-100"
    );
  };

  const DetailCard = ({
    icon: Icon,
    label,
    value,
    colorClass = "text-slate-700",
  }: DetailCardProps) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/50 transition-all hover:bg-white hover:shadow-sm">
      <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-emerald-600">
        <Icon size={18} />
      </div>
      <div className="space-y-0.5">
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
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-xl bg-white">
        <div className="relative bg-slate-900 p-8 pt-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl -ml-5 -mb-5" />

          <div className="relative flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-900/20">
                <User size={24} />
              </div>

              <span
                className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border-2 ${getStatusConfig(
                  record?.status
                )}`}
              >
                {record?.status}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {record?.employeeName}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-slate-400">
                <Hash size={14} />
                <span className="text-xs font-bold tracking-wider">
                  {record?.employeeId}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DetailCard
              icon={Calendar}
              label="Log Date"
              value={record?.date}
            />
            <DetailCard
              icon={BadgeCheck}
              label="Record ID"
              value={record?.id?.split("-")[1] || record?.id}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DetailCard
              icon={Clock}
              label="Clock In"
              value={record?.checkIn}
              colorClass="text-emerald-600"
            />
            <DetailCard
              icon={Clock3}
              label="Clock Out"
              value={record?.checkOut}
              colorClass="text-rose-500"
            />
          </div>

          <div className="pt-2">
            <div className="p-5 rounded-[1.5rem] bg-emerald-50/30 border border-emerald-100/50 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-emerald-700">
                  <FileText size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Remarks
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                  "{record?.notes || "No specific remarks were recorded for this session."}"
                </p>
              </div>
              <AlertCircle size={60} className="absolute -right-4 -bottom-4 text-emerald-500/5" />
            </div>
          </div>

          <button
            onClick={() => onClose(false)}
            className="w-full mt-4 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-[0.98]"
          >
            Close Details
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAttendance;
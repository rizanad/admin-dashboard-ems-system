import { Badge } from "@/components/ui/badge";

type AttendanceStatus = "Present" | "Absent" | "Late" | "On Leave";

type Attendance = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
};

type Props = {
  data: Attendance[];
};

const getStatusStyle = (status: AttendanceStatus) => {
  switch (status) {
    case "Present":
      return "bg-emerald-100 text-emerald-700";
    case "Late":
      return "bg-amber-100 text-amber-700";
    case "Absent":
      return "bg-rose-100 text-rose-700";
    case "On Leave":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const RecentAttendance = ({ data }: Props) => {
  const recent = [...data]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <h2 className="font-black text-slate-900 mb-4">
        Recent Attendance
      </h2>

      <div className="space-y-3">
        {recent.length > 0 ? (
          recent.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl"
            >
              <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-900">
                  {item.employeeName}
                </span>
                <span className="text-[11px] text-slate-400 font-bold">
                  {item.employeeId} • {item.date}
                </span>
              </div>

              <Badge
                className={`${getStatusStyle(
                  item.status
                )} border-none text-[10px] font-black px-3 py-1`}
              >
                {item.status}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-sm font-bold italic">
            No attendance records yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentAttendance;
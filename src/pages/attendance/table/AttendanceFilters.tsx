import { Search, Filter, CalendarDays } from "lucide-react";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
};

const AttendanceFilters = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedDate,
  setSelectedDate,
}: Props) => {
  const statuses = ["All Status", "Present", "Absent", "Late", "On Leave"];

  return (
    <div className="bg-white p-5 rounded-3xl border border-emerald-50 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
      <div className="relative w-full lg:w-80">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CalendarDays size={18} />
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 bg-slate-50 text-sm font-black text-slate-600 border-none rounded-2xl px-5 py-3 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Filter size={18} />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="flex-1 md:w-48 bg-slate-50 text-sm font-black text-slate-600 border-none rounded-2xl px-5 py-3 outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;
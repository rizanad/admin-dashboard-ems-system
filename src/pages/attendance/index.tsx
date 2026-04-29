import { useEffect, useState } from "react";
import AttendanceTable from "./table/DataTable";
import AttendanceFilters from "./table/AttendanceFilters";
import AddAttendanceForm from "./manageAttendance/AddAttendanceForm";
import EditAttendanceForm from "./manageAttendance/EditAttendanceForm";

type Attendance = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "Present" | "Absent" | "Late";
};

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState<string | null>(null);

  const fetchAttendance = () => {
    const data = JSON.parse(
      localStorage.getItem("attendance") || "[]"
    ) as Attendance[];

    setAttendanceRecords(data);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleEditTrigger = (id: string) => {
    setSelectedEditId(id);
    setIsEditOpen(true);
  };

  const filteredAttendance = attendanceRecords.filter((record) => {
    const matchesSearch = `${record.employeeName} ${record.employeeId}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All Status" || record.status === selectedStatus;

    const matchesDate = !selectedDate || record.date === selectedDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-3 space-y-8 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight ">
            Attendance Logs
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Monitor daily check-ins and check-outs.
          </p>
        </div>

        <div className="flex gap-3">
          

          <AddAttendanceForm onSave={fetchAttendance} />
        </div>
      </header>

      <EditAttendanceForm
        isOpen={isEditOpen}
        onClose={setIsEditOpen}
        attendanceId={selectedEditId}
        onUpdate={fetchAttendance}
      />

      <AttendanceFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <AttendanceTable
          data={filteredAttendance}
          onEditClick={handleEditTrigger}
        />
      </div>

      {filteredAttendance.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
          <p className="text-slate-400 font-bold italic text-sm">
            No records match your current filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
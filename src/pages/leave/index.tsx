import { useEffect, useState } from "react";
import LeaveTable from "./table/DataTable";
import LeaveFilters from "./table/LeaveFilters";
import AddLeaveForm from "./manageLeave/AddLeaveForm";
import EditLeaveForm from "./manageLeave/EditLeaveForm";

export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export type LeaveRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  status: LeaveStatus;
  reason: string;
  createdAt: string;
};

const Leave = () => {
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Status");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [selectedEditId, setSelectedEditId] = useState<string | null>(null);

  const fetchLeaves = () => {
    const data = JSON.parse(localStorage.getItem("leaves") || "[]") as LeaveRecord[];

    const sortedData = data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    setLeaveRecords(sortedData);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleEditTrigger = (id: string) => {
    setSelectedEditId(id);
    setIsEditOpen(true);
  };

  const filteredLeaves = leaveRecords.filter((record) => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All Status" || record.status === selectedStatus;

    const matchesDate =
      !selectedDate || record.startDate === selectedDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-3 space-y-8 min-h-screen">

      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Leave Requests
            </h1>
            <p className="text-slate-400 text-sm font-bold mt-1">
              Track and approve employee time-off requests
            </p>
          </div>
        </div>

        <div className="flex gap-3">
         

          <AddLeaveForm onSave={fetchLeaves} />
        </div>
      </header>

      <LeaveFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between px-6">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
            Request List ({filteredLeaves.length})
          </h2>
        </div>

        <LeaveTable
          data={filteredLeaves}
          onEditClick={handleEditTrigger}
        />
      </div>

      <EditLeaveForm
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedEditId(null);
        }}
        leaveId={selectedEditId}
        onUpdate={fetchLeaves}
      />
    </div>
  );
};

export default Leave;
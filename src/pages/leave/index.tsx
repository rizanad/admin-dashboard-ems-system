import  { useEffect, useState } from "react";
import { Download,  CalendarClock } from "lucide-react";
import LeaveTable from "./table/DataTable";
import LeaveFilters from "./table/LeaveFilters";
import AddLeaveForm from "./manageLeave/AddLeaveForm";
import EditLeaveForm from "./manageLeave/EditLeaveForm";

type LeaveRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
  createdAt: string;
};

const Leave = () => {
  const [leaveRecords, setLeaveRecords] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);

  const fetchLeaves = () => {
    const data = JSON.parse(localStorage.getItem("leaves") || "[]");
    const sortedData = (data as LeaveRecord[]).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
    setLeaveRecords(sortedData);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleEditTrigger = (id:string) => {
    setSelectedEditId(id);
    setIsEditOpen(true);
  };

  const filteredLeaves = leaveRecords.filter((record) => {
    const matchesSearch = 
      record.employeeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === "All Status" || record.status === selectedStatus;
    
    const matchesDate = 
      !selectedDate || record.startDate === selectedDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-10 space-y-8 bg-[#fcfdfc] min-h-screen">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-emerald-50 text-emerald-600">
            <CalendarClock size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Leave Management
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
              Track and approve employee time-off requests
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white text-slate-600 border border-slate-100 rounded-2xl text-xs font-black hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Export Report
          </button>
          
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
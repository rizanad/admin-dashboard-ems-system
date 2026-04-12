import{ useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit3, 
  User, 
  Briefcase, 
  BadgeCheck, 
  History 
} from "lucide-react";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmp(data.find((e) => e.id === id));
  }, [id]);

  if (!emp) return <div className="p-10 text-center font-bold text-slate-400">Loading profile...</div>;

  return (
    <div className="p-6 lg:p-10 bg-[#fcfdfc] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/employee")} 
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Employee Profile</h1>
              <p className="text-slate-500 font-medium">Viewing record for <span className="text-emerald-600">#{emp.id}</span></p>
            </div>
          </div>

          <button 
            onClick={() => navigate(`/employee/edit/${id}`)}
            className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-95"
          >
            <Edit3 size={18} /> Edit Full Record
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm overflow-hidden">
          
          {/* Identity Header Strip */}
          <div className="bg-emerald-50/50 px-10 py-8 border-b border-emerald-100/50 flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white border-2 border-emerald-100 flex items-center justify-center text-emerald-700 text-3xl font-black shadow-sm">
              {emp.firstName[0]}{emp.lastName[0]}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">{emp.firstName} {emp.lastName}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="px-3 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {emp.status}
                </span>
                <span className="text-slate-400 font-bold text-sm">|</span>
                <span className="text-slate-500 font-bold text-sm">{emp.role}</span>
              </div>
            </div>
          </div>

          <div className="p-10">
            {/* Table Section 1: Personal & Contact */}
            <div className="mb-12">
              <TableSectionHeader icon={User} title="General Information" />
              <div className="grid grid-cols-1 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <DataRow label="Full Name" value={`${emp.firstName} ${emp.middleName || ""} ${emp.lastName}`} isStriped />
                <DataRow label="Email Address" value={emp.email} />
                <DataRow label="Phone Number" value={emp.contactNumber} isStriped />
                <DataRow label="Permanent Address" value={emp.address} />
              </div>
            </div>

            {/* Table Section 2: Work & Position */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <TableSectionHeader icon={Briefcase} title="Job Particulars" />
                <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  <DataRow label="Department" value={emp.department} isStriped />
                  <DataRow label="Designation" value={emp.role} />
                  <DataRow label="Date Joined" value={emp.joinDate} isStriped />
                  <DataRow label="Employment Type" value="Full-Time" />
                </div>
              </div>

              {/* Table Section 3: Identity Documents */}
              <div>
                <TableSectionHeader icon={BadgeCheck} title="Identification" />
                <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  <DataRow label="PAN Number" value={emp.panNumber || "Not Provided"} isStriped />
                  <DataRow label="Citizenship No." value={emp.citizenshipNumber || "Not Provided"} />
                  <DataRow label="Nationality" value={emp.nationality || "N/A"} isStriped />
                  <DataRow label="Education" value={emp.education || "N/A"} />
                </div>
              </div>
            </div>

            {/* Footer Audit Info */}
            <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
                <History size={14} /> Last Modified: April 12, 2026
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest">System Generated Record</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Section Headers
const TableSectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-4 ml-1">
    <Icon size={18} className="text-emerald-600" />
    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{title}</h3>
  </div>
);

// Sub-component for the Individual Rows (The "Tabular" look)
const DataRow = ({ label, value, isStriped = false }) => (
  <div className={`grid grid-cols-3 py-4 px-6 gap-4 ${isStriped ? "bg-slate-50/50" : "bg-white"}`}>
    <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center">
      {label}
    </div>
    <div className="col-span-2 text-sm font-bold text-slate-700">
      {value || <span className="text-slate-300 italic font-medium">Pending Data</span>}
    </div>
  </div>
);

export default EmployeeDetails;
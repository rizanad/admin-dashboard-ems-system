import React, { useEffect, useState } from "react";
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
  AlertCircle,
  CalendarRange,
  Briefcase,
  Info
} from "lucide-react";

/**
 * ViewLeave Component
 * Mirrored from ViewAttendance with Leave-specific fields
 */
const ViewLeave = ({ isOpen, onClose, leaveId }) => {
  const [record, setRecord] = useState(null);

  // Fetch data directly from LocalStorage when ID changes or modal opens
  useEffect(() => {
    if (leaveId && isOpen) {
      const allRecords = JSON.parse(localStorage.getItem("leaves") || "[]");
      const found = allRecords.find((r) => r.id === leaveId);
      setRecord(found);
    }
  }, [leaveId, isOpen]);

  // Helper for status badge styling (Mirrors Attendance but for Approval workflow)
  const getStatusConfig = (status) => {
    const configs = {
      Approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
      Pending: "bg-amber-50 text-amber-700 border-amber-100",
      Rejected: "bg-rose-50 text-rose-700 border-rose-100",
    };
    return configs[status] || "bg-slate-50 text-slate-700 border-slate-100";
  };

  // Internal component for the data rows
  const DetailCard = ({ icon: Icon, label, value, colorClass = "text-slate-700" }) => (
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
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2.5rem] bg-white">
        
        {/* TOP HEADER SECTION */}
        <div className="relative bg-slate-900 p-8 pt-10 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl -ml-5 -mb-5" />
          
          <div className="relative flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-900/20">
                <User size={24} />
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border-2 ${getStatusConfig(record?.status)}`}>
                {record?.status}
              </span>
            </div>
            
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {record?.employeeName}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-slate-400">
                <Hash size={14} />
                <span className="text-xs font-bold tracking-wider">{record?.employeeId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* INFO GRID SECTION */}
        <div className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DetailCard 
              icon={Briefcase} 
              label="Leave Category" 
              value={record?.leaveType} 
              colorClass="text-emerald-700"
            />
            <DetailCard 
              icon={BadgeCheck} 
              label="Request ID" 
              value={record?.id?.split('-')[1] || record?.id} 
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

          <div className="pt-2">
            <div className="p-5 rounded-[1.5rem] bg-emerald-50/30 border border-emerald-100/50 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-emerald-700">
                  <FileText size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Reason / Details</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                  "{record?.reason || "No detailed reason was provided for this request."}"
                </p>
              </div>
              <Info size={60} className="absolute -right-4 -bottom-4 text-emerald-500/5" />
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button 
            onClick={onClose}
            className="w-full mt-4 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-[0.98]"
          >
            Done Viewing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewLeave;
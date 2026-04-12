import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDays, Plus } from "lucide-react";
import { toast } from "sonner";

// Shadcn UI Imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// 1. Validation Schema for Leaves
const leaveSchema = z.object({
  employeeId: z.string().min(1, "Please select an employee"),
  leaveType: z.enum(["Annual", "Sick", "Casual", "Unpaid", "Maternity/Paternity"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  reason: z.string().min(5, "Reason must be at least 5 characters").max(300, "Reason is too long"),
  status: z.enum(["Pending", "Approved", "Rejected"]).default("Pending"),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date cannot be before start date",
  path: ["endDate"],
});

type LeaveFormValues = z.infer<typeof leaveSchema>;

// Reusable UI Sub-components
const FormField = ({ label, error, children }: { label: string, error?: any, children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    {children}
    {error && <p className="text-[11px] font-medium text-rose-500 mt-1 ml-1">{error.message}</p>}
  </div>
);

const inputStyles = (error?: any) => `
  w-full px-4 py-2.5 rounded-xl bg-slate-50 border transition-all outline-none text-sm font-bold text-slate-700
  ${error 
    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/5 focus:border-rose-400" 
    : "border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white"
  }
`;

const AddLeaveForm = ({ onSave }: { onSave?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(data);
  }, [open]);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leaveType: "Annual",
      status: "Pending"
    }
  });

  const onSubmit = async (data: LeaveFormValues) => {
    const existingLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    const emp = employees.find(e => e.id === data.employeeId);
    
    const newRecord = {
      ...data,
      id: `LV-${Date.now()}`,
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : "Unknown",
      createdAt: new Date().toISOString(),
    };
  
    const updatedList = [...existingLeaves, newRecord];
    localStorage.setItem("leaves", JSON.stringify(updatedList));
  
    toast.success("Leave request submitted successfully");
    if (onSave) onSave();
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-2xl text-sm hover:bg-emerald-700 transition-all shadow-lg font-black shadow-emerald-100 active:scale-95">
          <Plus size={18} /> New Request
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2.5rem] shadow-2xl bg-white">
        <div className="bg-slate-900 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black tracking-tight flex items-center gap-2">
              <div className="p-2 bg-emerald-500 rounded-lg text-white">
                <CalendarDays size={20} />
              </div>
              Create Leave Request
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          {/* Employee Selection */}
          <FormField label="Select Employee" error={errors.employeeId}>
            <select {...register("employeeId")} className={inputStyles(errors.employeeId)}>
              <option value="">Choose Employee...</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName} ({emp.id})</option>
              ))}
            </select>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <FormField label="Start Date" error={errors.startDate}>
              <input type="date" {...register("startDate")} className={inputStyles(errors.startDate)} />
            </FormField>

            {/* End Date */}
            <FormField label="End Date" error={errors.endDate}>
              <input type="date" {...register("endDate")} className={inputStyles(errors.endDate)} />
            </FormField>
          </div>

          {/* Leave Type */}
          <FormField label="Leave Type" error={errors.leaveType}>
            <select {...register("leaveType")} className={inputStyles(errors.leaveType)}>
              <option value="Annual">Annual Leave</option>
              <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
              <option value="Unpaid">Unpaid Leave</option>
              <option value="Maternity/Paternity">Maternity/Paternity</option>
            </select>
          </FormField>

          {/* Reason */}
          <FormField label="Reason for Leave" error={errors.reason}>
            <textarea 
              {...register("reason")} 
              className={`${inputStyles(errors.reason)} min-h-24 py-3 resize-none`} 
              placeholder="Please explain the reason for this request..."
            />
          </FormField>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeaveForm;
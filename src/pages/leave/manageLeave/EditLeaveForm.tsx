import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDays, Edit3 } from "lucide-react";
import { toast } from "sonner";

// Shadcn UI Imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 1. Validation Schema (Mirrored from Add form)
const leaveSchema = z.object({
  employeeId: z.string().min(1, "Employee is required"),
  leaveType: z.enum(["Annual", "Sick", "Casual", "Unpaid", "Maternity/Paternity"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  reason: z.string().min(5, "Reason must be at least 5 characters").max(300),
  status: z.enum(["Pending", "Approved", "Rejected"]),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date cannot be before start date",
  path: ["endDate"],
});

type LeaveFormValues = z.infer<typeof leaveSchema>;

// Reusable UI components
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

interface EditLeaveProps {
  isOpen: boolean;
  onClose: () => void;
  leaveId: string | null;
  onUpdate?: () => void;
}

const EditLeaveForm = ({ isOpen, onClose, leaveId, onUpdate }: EditLeaveProps) => {
  const [employees, setEmployees] = useState<any[]>([]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveSchema),
  });

  // Load Record Data and Employees
  useEffect(() => {
    if (isOpen && leaveId) {
      const allLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
      const recordToEdit = allLeaves.find((r: any) => r.id === leaveId);
      const allEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
      
      setEmployees(allEmployees);

      if (recordToEdit) {
        reset({
          employeeId: recordToEdit.employeeId,
          leaveType: recordToEdit.leaveType,
          startDate: recordToEdit.startDate,
          endDate: recordToEdit.endDate,
          reason: recordToEdit.reason,
          status: recordToEdit.status,
        });
      }
    }
  }, [isOpen, leaveId, reset]);

  const onSubmit = async (data: LeaveFormValues) => {
    const existingLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    
    const updatedList = existingLeaves.map((record: any) => 
      record.id === leaveId 
        ? { ...record, ...data, updatedAt: new Date().toISOString() } 
        : record
    );

    localStorage.setItem("leaves", JSON.stringify(updatedList));
  
    toast.success("Leave request updated successfully");
    if (onUpdate) onUpdate();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2.5rem] bg-white">
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center gap-3">
          <div className="p-2 bg-amber-500 rounded-lg text-white">
            <Edit3 size={20} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-black tracking-tight">
              Edit Leave Request
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Employee" error={errors.employeeId}>
              <select {...register("employeeId")} className={inputStyles(errors.employeeId)} disabled>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Status" error={errors.status}>
              <select {...register("status")} className={inputStyles(errors.status)}>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Start Date" error={errors.startDate}>
              <input type="date" {...register("startDate")} className={inputStyles(errors.startDate)} />
            </FormField>

            <FormField label="End Date" error={errors.endDate}>
              <input type="date" {...register("endDate")} className={inputStyles(errors.endDate)} />
            </FormField>
          </div>

          <FormField label="Leave Type" error={errors.leaveType}>
            <select {...register("leaveType")} className={inputStyles(errors.leaveType)}>
              <option value="Annual">Annual Leave</option>
              <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
              <option value="Unpaid">Unpaid Leave</option>
              <option value="Maternity/Paternity">Maternity/Paternity</option>
            </select>
          </FormField>

          <FormField label="Reason for Leave" error={errors.reason}>
            <textarea 
              {...register("reason")} 
              className={`${inputStyles(errors.reason)} min-h-24 py-3 resize-none`} 
            />
          </FormField>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all text-xs"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 shadow-lg shadow-amber-100 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Update Request"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeaveForm;
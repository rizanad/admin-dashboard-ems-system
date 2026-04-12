import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
   Edit3 
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


const attendanceSchema = z.object({
  employeeId: z.string().min(1, "Employee is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Present", "Absent", "Late", "On Leave"]),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  notes: z.string().max(200, "Notes are too long").optional(),
});


type AttendanceFormValues = z.infer<typeof attendanceSchema>;

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

interface EditProps {
  isOpen: boolean;
  onClose: () => void;
  attendanceId: string | null;
  onUpdate?: () => void;
}

const EditAttendanceForm = ({ isOpen, onClose, attendanceId, onUpdate }: EditProps) => {
  const [employees, setEmployees] = useState<any[]>([]);

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
  });

  const selectedStatus = watch("status");

  // Load Record Data and Employees
  useEffect(() => {
    if (isOpen && attendanceId) {
      const allRecords = JSON.parse(localStorage.getItem("attendance") || "[]");
      const recordToEdit = allRecords.find((r: any) => r.id === attendanceId);
      const allEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
      
      setEmployees(allEmployees);

      if (recordToEdit) {
        reset({
          employeeId: recordToEdit.employeeId,
          date: recordToEdit.date,
          status: recordToEdit.status,
          checkIn: recordToEdit.checkIn || "",
          checkOut: recordToEdit.checkOut || "",
          notes: recordToEdit.notes || "",
        });
      }
    }
  }, [isOpen, attendanceId, reset]);

  const onSubmit = async (data: AttendanceFormValues) => {
    const existingAttendance = JSON.parse(localStorage.getItem("attendance") || "[]");
    
    const updatedList = existingAttendance.map((record: any) => 
      record.id === attendanceId 
        ? { ...record, ...data, updatedAt: new Date().toISOString() } 
        : record
    );

    localStorage.setItem("attendance", JSON.stringify(updatedList));
  
    toast.success("Attendance updated successfully");
    if (onUpdate) onUpdate();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-2xl bg-white">
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center gap-3">
          <div className="p-2 bg-amber-500 rounded-lg text-white">
            <Edit3 size={20} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-black tracking-tight">
              Edit Attendance Record
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

            <FormField label="Date" error={errors.date}>
              <input type="date" {...register("date")} className={inputStyles(errors.date)} />
            </FormField>
          </div>

          <FormField label="Status" error={errors.status}>
            <select {...register("status")} className={inputStyles(errors.status)}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="On Leave">On Leave</option>
            </select>
          </FormField>

          {selectedStatus !== "Absent" && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
              <FormField label="Check In" error={errors.checkIn}>
                <input type="time" {...register("checkIn")} className={inputStyles(errors.checkIn)} />
              </FormField>
              <FormField label="Check Out" error={errors.checkOut}>
                <input type="time" {...register("checkOut")} className={inputStyles(errors.checkOut)} />
              </FormField>
            </div>
          )}

          <FormField label="Notes / Remarks" error={errors.notes}>
            <textarea 
              {...register("notes")} 
              className={`${inputStyles(errors.notes)} min-h-20 py-3 resize-none`} 
              placeholder="Add any specific notes..."
            />
          </FormField>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all text-xs"
            >
              Cancel Changes
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 shadow-lg shadow-amber-100 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttendanceForm;
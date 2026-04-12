import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDays, Plus } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const leaveSchema = z.object({
  employeeId: z.string().min(1),
  leaveType: z.enum(["Annual", "Sick", "Casual", "Unpaid", "Maternity/Paternity"]),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  reason: z.string().min(5).max(300),
  status: z.enum(["Pending", "Approved", "Rejected"]),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date cannot be before start date",
  path: ["endDate"],
});

type LeaveFormValues = z.infer<typeof leaveSchema>;

const FormField = ({ label, error, children }: any) => (
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
  ${error ? "border-rose-200" : "border-slate-100"}
`;

const AddLeaveForm = ({ onSave }: { onSave?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(data);
  }, [open]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leaveType: "Annual",
      status: "Pending",
    },
  });

  const onSubmit = async (data: LeaveFormValues) => {
    const existingLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    const emp = employees.find((e) => e.id === data.employeeId);

    const newRecord = {
      ...data,
      id: `LV-${Date.now()}`,
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : "Unknown",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("leaves", JSON.stringify([...existingLeaves, newRecord]));

    toast.success("Leave request submitted successfully");

    onSave?.();
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-black">
          <Plus size={18} /> New Request
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2.5rem] bg-white">
        <div className="bg-slate-900 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <CalendarDays size={20} />
              Create Leave Request
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <FormField label="Employee" error={errors.employeeId}>
            <select {...register("employeeId")} className={inputStyles(errors.employeeId)}>
              <option value="">Select</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.firstName} {e.lastName}
                </option>
              ))}
            </select>
          </FormField>

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
              <option value="Annual">Annual</option>
              <option value="Sick">Sick</option>
              <option value="Casual">Casual</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Maternity/Paternity">Maternity/Paternity</option>
            </select>
          </FormField>

          <FormField label="Reason" error={errors.reason}>
            <textarea {...register("reason")} className={`${inputStyles(errors.reason)} min-h-24`} />
          </FormField>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setOpen(false)} className="flex-1 px-6 py-3">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-2 px-6 py-3 bg-emerald-600 text-white font-black">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeaveForm;
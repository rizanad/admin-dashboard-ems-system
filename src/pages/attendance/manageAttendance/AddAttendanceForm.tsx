import { useEffect, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserCheck, Plus } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const attendanceSchema = z.object({
  employeeId: z.string().min(1),
  status: z.enum(["Present", "Absent", "Late", "On Leave"]),
  date: z.string().min(1),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  notes: z.string().max(200).optional(),
});

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
};

type Props = {
  onSave?: () => void;
};

type FormFieldProps = {
  label: string;
  error?: FieldError;
  children: React.ReactNode;
};

const FormField = ({ label, error, children }: FormFieldProps) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-[11px] font-medium text-rose-500 mt-1 ml-1">
        {error.message}
      </p>
    )}
  </div>
);

const inputStyles = (error?: FieldError) => `
  w-full px-4 py-2.5 rounded-xl bg-slate-50 border transition-all outline-none text-sm font-bold text-slate-700
  ${
    error
      ? "border-rose-200 focus:ring-4 focus:ring-rose-500/5 focus:border-rose-400"
      : "border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white"
  }
`;

const AddAttendanceForm = ({ onSave }: Props) => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const data: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(data);
  }, [open]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      status: "Present",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedStatus = watch("status");

  const onSubmit = async (data: AttendanceFormValues) => {
    const existing = JSON.parse(localStorage.getItem("attendance") || "[]");

    const emp = employees.find((e) => e.id === data.employeeId);

    const newRecord = {
      ...data,
      id: `ATT-${Date.now()}`,
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : "Unknown",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("attendance", JSON.stringify([...existing, newRecord]));

    toast.success("Attendance marked successfully");

    onSave?.();
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-black hover:bg-emerald-700 transition-all shadow-lg active:scale-95">
          <Plus size={18} /> Mark Attendance
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[2.5rem] shadow-2xl bg-white border-none">
        <div className="bg-slate-900 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <UserCheck size={20} />
              </div>
              Log Daily Attendance
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <FormField label="Select Employee" error={errors.employeeId}>
            <select {...register("employeeId")} className={inputStyles(errors.employeeId)}>
              <option value="">Choose Employee...</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.id})
                </option>
              ))}
            </select>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date" error={errors.date}>
              <input type="date" {...register("date")} className={inputStyles(errors.date)} />
            </FormField>

            <FormField label="Status" error={errors.status}>
              <select {...register("status")} className={inputStyles(errors.status)}>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="On Leave">On Leave</option>
              </select>
            </FormField>
          </div>

          {selectedStatus !== "Absent" && (
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Check In" error={errors.checkIn}>
                <input type="time" {...register("checkIn")} className={inputStyles(errors.checkIn)} />
              </FormField>

              <FormField label="Check Out" error={errors.checkOut}>
                <input type="time" {...register("checkOut")} className={inputStyles(errors.checkOut)} />
              </FormField>
            </div>
          )}

          <FormField label="Notes / Remarks" error={errors.notes}>
            <textarea {...register("notes")} className={`${inputStyles(errors.notes)} min-h-20 resize-none py-3`} />
          </FormField>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Record"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAttendanceForm;
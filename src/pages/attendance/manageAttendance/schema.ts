import * as z from "zod";

export const attendanceSchema = z.object({
  employeeId: z.string().min(1, "Please select an employee"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Present", "Absent", "Late", "On Leave"], {
    errorMap: () => ({ message: "Please select a status" }),
  }),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  notes: z.string().max(200, "Notes are too long").optional(),
});

export type AttendanceFormValues = z.infer<typeof attendanceSchema>;
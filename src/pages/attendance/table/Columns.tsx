import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AttendanceColumns = () => (
  <TableHeader className="bg-slate-50/50">
    <TableRow className="hover:bg-transparent border-b border-emerald-50">
      {/* Date of the attendance record */}
      <TableHead className="w-32 font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Date
      </TableHead>

      {/* Employee Name & ID */}
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Employee
      </TableHead>

      {/* Check-in / Check-out Times */}
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Log Hours
      </TableHead>

      {/* Attendance Status (Present, Late, Absent, etc.) */}
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Attendance Status
      </TableHead>

      {/* Remarks/Notes indicator */}
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Remarks
      </TableHead>

      {/* Action buttons (View Detail, Edit) */}
      <TableHead className="text-right font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Actions
      </TableHead>
    </TableRow>
  </TableHeader>
);

export default AttendanceColumns;
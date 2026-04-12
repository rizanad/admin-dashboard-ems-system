import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const LeaveColumns = () => (
  <TableHeader className="bg-slate-50/50">
    <TableRow className="hover:bg-transparent border-b border-emerald-50">
      {/* Duration of the leave (Start to End) */}
      <TableHead className="w-40 font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Duration
      </TableHead>

      {/* Employee Name & ID */}
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Employee
      </TableHead>

      {/* Leave Type (Sick, Annual, etc.) */}
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Leave Type
      </TableHead>

      {/* Leave Approval Status (Pending, Approved, Rejected) */}
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Request Status
      </TableHead>

      {/* Reason indicator */}
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Details
      </TableHead>

      {/* Action buttons */}
      <TableHead className="text-right font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Actions
      </TableHead>
    </TableRow>
  </TableHeader>
);

export default LeaveColumns;
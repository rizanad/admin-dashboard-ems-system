import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Columns = () => (
  <TableHeader className="bg-slate-50/50">
    <TableRow className="hover:bg-transparent border-b border-emerald-50">
      <TableHead className="w-24 font-black text-emerald-800 uppercase text-[10px] tracking-widest">ID</TableHead>
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">Employee Profile</TableHead>
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">Department</TableHead>
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">Work Status</TableHead>
      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">Join Date</TableHead>
      <TableHead className="text-right font-black text-emerald-800 uppercase text-[10px] tracking-widest">Actions</TableHead>
    </TableRow>
  </TableHeader>
);

export default Columns;
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const InventoryColumns = () => (
  <TableHeader className="bg-slate-50/50">
    <TableRow className="hover:bg-transparent border-b border-emerald-50">
      <TableHead className="w-40 font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Item
      </TableHead>

      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Category
      </TableHead>

      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Quantity
      </TableHead>

      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Assigned
      </TableHead>

      <TableHead className="font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Status
      </TableHead>

      <TableHead className="text-right font-black text-emerald-800 uppercase text-[10px] tracking-widest">
        Actions
      </TableHead>
    </TableRow>
  </TableHeader>
);

export default InventoryColumns;
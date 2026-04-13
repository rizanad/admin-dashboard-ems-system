import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit3 } from "lucide-react";
import { useState } from "react";
import InventoryColumns from "./Columns";
import ViewInventory from "../manageInventory/ViewInventory";

type InventoryStatus = "Available" | "Assigned" | "Damaged";

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  assignedQuantity: number;
  status: InventoryStatus;
  createdAt?: string;
};

type Props = {
  data: InventoryItem[];
  onEditClick: (id: string) => void;
};

type ActionButtonProps = {
  icon: React.ElementType;
  onClick: () => void;
  color: string;
  hoverBg: string;
};

const InventoryTable = ({ data, onEditClick }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleViewDetails = (id: string) => {
    setSelectedId(id);
    setIsViewOpen(true);
  };

  const getStatusStyle = (status: InventoryStatus) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-700";
      case "Assigned":
        return "bg-amber-100 text-amber-700";
      case "Damaged":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const ActionButton = ({
    icon: Icon,
    onClick,
    color,
    hoverBg,
  }: ActionButtonProps) => (
    <button
      onClick={onClick}
      className={`p-2.5 ${color} ${hoverBg} rounded-xl transition-all active:scale-90`}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <>
      <div className="bg-white rounded-xl border border-emerald-50 shadow-sm overflow-hidden">
        <Table>
          <InventoryColumns />
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow
                  key={item.id}
                  className="group hover:bg-emerald-50/20 transition-all border-b border-slate-50 last:border-0"
                >
                  <TableCell className="font-black text-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-6 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </div>
                  </TableCell>

                  <TableCell className="font-bold text-slate-700 text-xs">
                    {item.category}
                  </TableCell>

                  <TableCell className="font-bold text-slate-700 text-xs">
                    {item.quantity}
                  </TableCell>

                  <TableCell className="font-bold text-slate-700 text-xs">
                    {item.assignedQuantity}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`${getStatusStyle(
                        item.status
                      )} border-none px-3 py-1 rounded-lg text-[10px] font-black`}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <ActionButton
                        icon={Eye}
                        onClick={() => handleViewDetails(item.id)}
                        color="text-emerald-600"
                        hoverBg="hover:bg-emerald-50"
                      />
                      <ActionButton
                        icon={Edit3}
                        onClick={() => onEditClick(item.id)}
                        color="text-amber-600"
                        hoverBg="hover:bg-amber-50"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-20 text-slate-400 font-bold italic"
                >
                  No inventory items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ViewInventory
        isOpen={isViewOpen}
        onClose={setIsViewOpen}
        itemId={selectedId}
      />
    </>
  );
};

export default InventoryTable;
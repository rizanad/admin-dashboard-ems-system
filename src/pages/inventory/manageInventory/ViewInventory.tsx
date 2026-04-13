import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Package,
  Hash,
  Boxes,
  Layers,
  AlertTriangle,
  Calendar,
} from "lucide-react";

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  assignedQuantity: number;
  status: "Available" | "Assigned" | "Damaged";
  purchaseDate?: string;
};

type Props = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  itemId: string | null;
};

type DetailCardProps = {
  icon: React.ElementType;
  label: string;
  value?: string;
  colorClass?: string;
};

const ViewInventory = ({ isOpen, onClose, itemId }: Props) => {
  const [item, setItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    if (itemId && isOpen) {
      const allItems: InventoryItem[] = JSON.parse(
        localStorage.getItem("inventory") || "[]"
      );
      const found = allItems.find((i) => i.id === itemId) || null;
      setItem(found);
    }
  }, [itemId, isOpen]);

  const getStatusConfig = (status?: InventoryItem["status"]) => {
    const configs: Record<string, string> = {
      Available: "bg-emerald-50 text-emerald-700 border-emerald-100",
      Assigned: "bg-amber-50 text-amber-700 border-amber-100",
      Damaged: "bg-rose-50 text-rose-700 border-rose-100",
    };

    return (
      configs[status || ""] || "bg-slate-50 text-slate-700 border-slate-100"
    );
  };

  const DetailCard = ({
    icon: Icon,
    label,
    value,
    colorClass = "text-slate-700",
  }: DetailCardProps) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/50 transition-all hover:bg-white hover:shadow-sm">
      <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-emerald-600">
        <Icon size={18} />
      </div>
      <div className="space-y-0.5">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className={`text-sm font-bold ${colorClass}`}>
          {value || "Not Specified"}
        </p>
      </div>
    </div>
  );

  if (!item && isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-xl bg-white">
        <div className="relative bg-slate-900 p-8 pt-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl -ml-5 -mb-5" />

          <div className="relative flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-900/20">
                <Package size={24} />
              </div>

              <span
                className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border-2 ${getStatusConfig(
                  item?.status
                )}`}
              >
                {item?.status}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {item?.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-slate-400">
                <Hash size={14} />
                <span className="text-xs font-bold tracking-wider">
                  {item?.id?.split("-")[1] || item?.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DetailCard
              icon={Layers}
              label="Category"
              value={item?.category}
            />
            <DetailCard
              icon={Calendar}
              label="Purchase Date"
              value={item?.purchaseDate}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DetailCard
              icon={Boxes}
              label="Total Quantity"
              value={item?.quantity?.toString()}
              colorClass="text-emerald-600"
            />
            <DetailCard
              icon={Boxes}
              label="Assigned Quantity"
              value={item?.assignedQuantity?.toString()}
              colorClass="text-amber-600"
            />
          </div>

          <div className="pt-2">
            <div className="p-5 rounded-[1.5rem] bg-emerald-50/30 border border-emerald-100/50 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-emerald-700">
                  <AlertTriangle size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Status Insight
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                  {item?.status === "Available" &&
                    `"Item is fully available for assignment."`}
                  {item?.status === "Assigned" &&
                    `"Item is currently assigned to employees."`}
                  {item?.status === "Damaged" &&
                    `"Item is marked as damaged and may require repair or replacement."`}
                </p>
              </div>
              <AlertTriangle
                size={60}
                className="absolute -right-4 -bottom-4 text-emerald-500/5"
              />
            </div>
          </div>

          <button
            onClick={() => onClose(false)}
            className="w-full mt-4 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-[0.98]"
          >
            Close Details
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewInventory;
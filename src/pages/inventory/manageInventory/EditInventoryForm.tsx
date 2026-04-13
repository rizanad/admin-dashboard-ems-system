import { useEffect } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit3 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const inventorySchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  quantity: z.number().min(0),
  assignedQuantity: z.number().min(0),
  status: z.enum(["Available", "Assigned", "Damaged"]),
  purchaseDate: z.string().optional(),
});

type InventoryFormValues = z.infer<typeof inventorySchema>;

type InventoryItem = InventoryFormValues & {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

interface EditProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  itemId: string | null;
  onUpdate?: () => void;
}

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

const EditInventoryForm = ({
  isOpen,
  onClose,
  itemId,
  onUpdate,
}: EditProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
  });

  useEffect(() => {
    if (isOpen && itemId) {
      const allItems = JSON.parse(
        localStorage.getItem("inventory") || "[]"
      ) as InventoryItem[];

      const item = allItems.find((i) => i.id === itemId);

      if (item) {
        reset({
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          assignedQuantity: item.assignedQuantity,
          status: item.status,
          purchaseDate: item.purchaseDate || "",
        });
      }
    }
  }, [isOpen, itemId, reset]);

  const onSubmit = async (data: InventoryFormValues) => {
    const existing = JSON.parse(
      localStorage.getItem("inventory") || "[]"
    ) as InventoryItem[];

    const updated = existing.map((item) =>
      item.id === itemId
        ? { ...item, ...data, updatedAt: new Date().toISOString() }
        : item
    );

    localStorage.setItem("inventory", JSON.stringify(updated));

    toast.success("Inventory updated successfully");

    onUpdate?.();
    onClose(false);
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
              Edit Inventory Item
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Item Name" error={errors.name}>
              <input
                type="text"
                {...register("name")}
                className={inputStyles(errors.name)}
              />
            </FormField>

            <FormField label="Category" error={errors.category}>
              <input
                type="text"
                {...register("category")}
                className={inputStyles(errors.category)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Quantity" error={errors.quantity}>
              <input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className={inputStyles(errors.quantity)}
              />
            </FormField>

            <FormField label="Assigned Quantity" error={errors.assignedQuantity}>
              <input
                type="number"
                {...register("assignedQuantity", { valueAsNumber: true })}
                className={inputStyles(errors.assignedQuantity)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Status" error={errors.status}>
              <select
                {...register("status")}
                className={inputStyles(errors.status)}
              >
                <option value="Available">Available</option>
                <option value="Assigned">Assigned</option>
                <option value="Damaged">Damaged</option>
              </select>
            </FormField>

            <FormField label="Purchase Date" error={errors.purchaseDate}>
              <input
                type="date"
                {...register("purchaseDate")}
                className={inputStyles(errors.purchaseDate)}
              />
            </FormField>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex-1 px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 text-xs"
            >
              Cancel Changes
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInventoryForm;
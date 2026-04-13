import { useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Package, Plus } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const AddInventoryForm = ({ onSave }: Props) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      status: "Available",
      quantity: 0,
      assignedQuantity: 0,
    },
  });

  const onSubmit = async (data: InventoryFormValues) => {
    const existing = JSON.parse(localStorage.getItem("inventory") || "[]");

    const newItem = {
      ...data,
      id: `INV-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("inventory", JSON.stringify([...existing, newItem]));

    toast.success("Inventory item added");

    onSave?.();
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-black hover:bg-emerald-700 transition-all shadow-lg active:scale-95">
          <Plus size={18} /> Add Item
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[2.5rem] shadow-2xl bg-white border-none">
        <div className="bg-slate-900 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Package size={20} />
              </div>
              Add Inventory Item
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
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
              {isSubmitting ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventoryForm;
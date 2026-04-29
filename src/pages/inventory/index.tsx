import { useEffect, useState } from "react";

import InventoryTable from "./table/DataTable";
import InventoryFilters from "./table/InventoryFilters";
import AddInventoryForm from "./manageInventory/AddInventoryForm";
import EditInventoryForm from "./manageInventory/EditInventoryForm";

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  assignedQuantity: number;
  status: "Available" | "Assigned" | "Damaged";
  purchaseDate?: string;
};

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState<string | null>(null);

  const fetchInventory = () => {
    const data = JSON.parse(
      localStorage.getItem("inventory") || "[]"
    ) as InventoryItem[];

    setItems(data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleEditTrigger = (id: string) => {
    setSelectedEditId(id);
    setIsEditOpen(true);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = `${item.name} ${item.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All Status" || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-3 space-y-8 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight ">
            Inventory Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Track and manage company assets and supplies.
          </p>
        </div>

        <div className="flex gap-3">
          

          <AddInventoryForm onSave={fetchInventory} />
        </div>
      </header>

      <EditInventoryForm
        isOpen={isEditOpen}
        onClose={setIsEditOpen}
        itemId={selectedEditId}
        onUpdate={fetchInventory}
      />

      <InventoryFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <InventoryTable
          data={filteredItems}
          onEditClick={handleEditTrigger}
        />
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
          <p className="text-slate-400 font-bold italic text-sm">
            No inventory items match your current filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Inventory;
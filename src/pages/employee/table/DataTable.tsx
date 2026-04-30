import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmployeeTableHeader from "./Columns";
import React, { useState } from "react";
import type { Employee } from "../types/employee";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  data: Employee[];
  onDeleteClick: (id: string) => void;
};

type ActionButtonProps = {
  icon: React.ElementType;
  onClick: () => void;
  color: string;
};

const ActionButton = ({ icon: Icon, onClick, color }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2.5 ${color} hover:bg-emerald-50 rounded-xl transition-all active:scale-90`}
    >
      <Icon size={16} />
    </button>
  );
};

const DataTable = ({ data, onDeleteClick }: Props) => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      onDeleteClick(selectedId);
      setIsDeleteOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-emerald-50 shadow-sm overflow-hidden">
        <Table>
          <EmployeeTableHeader />
          <TableBody>
            {data.length > 0 ? (
              data.map((emp) => (
                <TableRow
                  key={emp.id}
                  className="group hover:bg-emerald-50/20 transition-all border-b border-slate-50 last:border-0"
                >
                  <TableCell className="font-bold text-slate-400 text-xs">
                    {emp.id}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xs">
                        {emp.firstName?.[0] ?? ""}
                        {emp.lastName?.[0] ?? ""}
                      </div>

                      <div className="flex flex-col">
                        <span className="font-black text-slate-800">
                          {emp.firstName ?? ""} {emp.lastName ?? ""}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          {emp.role ?? ""}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className="bg-slate-100 text-slate-600 border-none px-3 py-1 rounded-lg text-[10px] font-black">
                      {emp.department ?? ""}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          emp.status === "Active"
                            ? "bg-emerald-500"
                            : emp.status === "On Leave"
                            ? "bg-amber-400"
                            : "bg-slate-300"
                        }`}
                      />
                      <span className="text-xs font-black uppercase">
                        {emp.status ?? ""}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-slate-500 font-bold text-xs">
                    {emp.joinDate ?? ""}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <ActionButton
                        icon={Eye}
                        onClick={() => navigate(`/employee/details/${emp.id}`)}
                        color="text-emerald-600"
                      />
                      <ActionButton
                        icon={Edit3}
                        onClick={() => navigate(`/employee/edit/${emp.id}`)}
                        color="text-emerald-600"
                      />
                      <ActionButton
                        icon={Trash2}
                        onClick={() => openDeleteModal(emp.id)}
                        color="text-rose-600"
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
                  No matching records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-slate-800">
              Delete Employee
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-slate-500">
            Are you sure you want to delete this employee? This action cannot be undone.
          </p>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-rose-600 hover:bg-rose-700 rounded-xl"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataTable;
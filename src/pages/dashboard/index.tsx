import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Package,
} from "lucide-react";

import StatCard from "./components/StatCard";
import AttendanceChart from "./components/AttendanceChart";
import InventoryChart from "./components/InventoryChart";
import RecentAttendance from "./components/RecentAttendance";

type Employee = {
  id: string;
};

type Attendance = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: "Present" | "Absent" | "Late" | "On Leave";
};

type Inventory = {
  id: string;
  status: "Available" | "Assigned" | "Damaged";
};

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees") || "[]"));
    setAttendance(JSON.parse(localStorage.getItem("attendance") || "[]"));
    setInventory(JSON.parse(localStorage.getItem("inventory") || "[]"));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todayAttendance = attendance.filter((a) => a.date === today);

  const presentToday = todayAttendance.filter((a) => a.status === "Present").length;
  const absentToday = todayAttendance.filter((a) => a.status === "Absent").length;
  const lateToday = todayAttendance.filter((a) => a.status === "Late").length;

  const inventoryStats = {
    Available: inventory.filter((i) => i.status === "Available").length,
    Assigned: inventory.filter((i) => i.status === "Assigned").length,
    Damaged: inventory.filter((i) => i.status === "Damaged").length,
  };

  const attendanceMap: Record<
    string,
    { date: string; Present: number; Absent: number; Late: number }
  > = {};

  attendance.forEach((item) => {
    if (!attendanceMap[item.date]) {
      attendanceMap[item.date] = {
        date: item.date,
        Present: 0,
        Absent: 0,
        Late: 0,
      };
    }

    if (item.status === "Present") attendanceMap[item.date].Present++;
    if (item.status === "Absent") attendanceMap[item.date].Absent++;
    if (item.status === "Late") attendanceMap[item.date].Late++;
  });

  const attendanceChartData = Object.values(attendanceMap)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(-7);

  return (
    <div className="p-3 space-y-8 min-h-screen">
      <div>
        <h1 className="text-xl font-black text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Real-time EMS analytics with emerald theme
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Employees" value={employees.length} icon={Users} accent="slate" />
        <StatCard title="Present Today" value={presentToday} icon={UserCheck} accent="emerald" />
        <StatCard title="Absent Today" value={absentToday} icon={UserX} accent="rose" />
        <StatCard title="Late Today" value={lateToday} icon={Clock} accent="amber" />
        <StatCard title="Inventory Items" value={inventory.length} icon={Package} accent="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceChart data={attendanceChartData} />
        </div>

        <InventoryChart data={inventoryStats} />
      </div>

      <div className="bg-white rounded-3xl border border-emerald-50 p-6 shadow-sm">
        <h2 className="font-black text-slate-900 mb-4">
          Recent Attendance
        </h2>
        <RecentAttendance data={attendance} />
      </div>
    </div>
  );
};

export default Dashboard;
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  CalendarOff, 
  Package, 
  ChevronRight,
  Workflow
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Employee", path: "/employee", icon: Users },
  { name: "Attendance", path: "/attendance", icon: UserCheck },
  { name: "Leave", path: "/leave", icon: CalendarOff },
  { name: "Inventory", path: "/inventory", icon: Package },
];

const Sidebar = () => {
  return (
    <aside className="w-72 h-screen bg-[#fcfdfc] border-r border-gray-200 flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="h-11 w-11 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform duration-300">
            <Workflow size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-slate-800 leading-none tracking-tight">WorkSphere</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-white text-emerald-700 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.2)] ring-1 ring-emerald-50"
                    : "text-slate-500 hover:text-emerald-600 hover:bg-emerald-50/50 hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-50 to-transparent rounded-2xl -z-10" />
                  )}
                  
                  <Icon 
                    size={20} 
                    className={`transition-all duration-300 ${
                      isActive ? "text-emerald-600 scale-110" : "text-slate-400 group-hover:text-emerald-500"
                    }`} 
                  />
                  
                  <span className={`font-semibold transition-colors ${isActive ? "text-slate-900" : "group-hover:text-emerald-700"}`}>
                    {item.name}
                  </span>

                  {isActive ? (
                    <div className="ml-auto">
                      <div className="h-5 w-1 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                    </div>
                  ) : (
                    <ChevronRight 
                      size={16} 
                      className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-300" 
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 m-6 rounded-3xl bg-linear-to-br from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-200">
        <p className="text-xs font-medium opacity-80">Weekly Usage</p>
        <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white w-[70%] rounded-full" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
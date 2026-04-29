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
import { getUser } from "@/lib/auth";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard, roles: ["admin", "employee"] },
  { name: "Employee", path: "/employee", icon: Users, roles: ["admin"] },
  { name: "Attendance", path: "/attendance", icon: UserCheck, roles: ["admin", "employee"] },
  { name: "Leave", path: "/leave", icon: CalendarOff, roles: ["admin", "employee"] },
  { name: "Inventory", path: "/inventory", icon: Package, roles: ["admin"] },
];

const Sidebar = () => {
  const user = getUser();

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <aside className="w-72 h-screen bg-[#fcfdfc] border-r border-gray-200 flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="h-11 w-11 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform duration-300">
            <Workflow size={24} className="text-white" />
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">
            WorkSphere
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-white text-emerald-700 shadow ring-1 ring-emerald-50"
                    : "text-slate-500 hover:text-emerald-600 hover:bg-emerald-50/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} />

                  <span className="font-semibold">
                    {item.name}
                  </span>

                  {isActive ? (
                    <div className="ml-auto h-5 w-1 bg-emerald-500 rounded-full" />
                  ) : (
                    <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
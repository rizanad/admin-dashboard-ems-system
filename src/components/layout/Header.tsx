import {   ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { getUser, logout } from "@/lib/auth";

const Header = () => {
  const user = getUser();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const initials = user?.username?.slice(0, 2).toUpperCase();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-sm group">
          
        </div>
      </div>

      <div className="flex items-center gap-4">
        

        <div className="h-8 w-px bg-slate-200 mx-2" />

        <div className="relative">
          <div 
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 pl-2 group cursor-pointer"
          >
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                {user?.username || "User"}
              </span>
              <span className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-tighter">
                {user?.role}
              </span>
            </div>
            
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-100 group-hover:scale-105 transition-transform">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <ChevronDown size={10} className="text-emerald-700" />
              </div>
            </div>
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
import { Bell, Search, Settings, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
     
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-sm group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2 pl-10 pr-4 text-sm focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/40 transition-all outline-none"
          />
        </div>
      </div>

    
      <div className="flex items-center gap-4">
        <button className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>
        
        <button className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
          <Settings size={20} />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2" />

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">Admin User</span>
            <span className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-tighter">System Manager</span>
          </div>
          
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-100 group-hover:scale-105 transition-transform">
              AD
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
               <ChevronDown size={10} className="text-emerald-700" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
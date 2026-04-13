import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  accent?: "emerald" | "rose" | "amber" | "slate";
};

const accentMap = {
  emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
  rose: "text-rose-600 bg-rose-50 border-rose-100",
  amber: "text-amber-600 bg-amber-50 border-amber-100",
  slate: "text-slate-700 bg-slate-50 border-slate-100",
};

const StatCard = ({ title, value, icon: Icon, accent = "emerald" }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">

      {/* 🌿 emerald glow (kept but refined) */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-100/60 blur-3xl opacity-40 group-hover:opacity-60 transition" />

      {/* subtle top accent line */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-emerald-500/20 rounded-full" />

      <div className="relative flex items-start justify-between">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            {title}
          </p>

          <h2 className="text-3xl font-black text-slate-900 mt-2">
            {value}
          </h2>

          {/* live indicator */}
          <div className="flex items-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[11px] font-bold text-slate-400">
              Live data
            </p>
          </div>
        </div>

        {/* ICON */}
        <div
          className={`p-3 rounded-2xl border ${accentMap[accent]} shadow-sm group-hover:scale-105 transition`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
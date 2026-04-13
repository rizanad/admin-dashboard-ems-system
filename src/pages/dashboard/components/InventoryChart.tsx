import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  type InventoryData = {
    Available: number;
    Assigned: number;
    Damaged: number;
  };
  
  type Props = {
    data: InventoryData;
  };
  
  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
  
    return (
      <div className="bg-white border border-emerald-100 shadow-lg rounded-2xl px-3 py-2">
        <p className="text-xs font-black text-slate-700">
          {payload[0].name}
        </p>
        <p className="text-xs font-bold text-slate-900">
          {payload[0].value}
        </p>
      </div>
    );
  };
  
  const InventoryChart = ({ data }: Props) => {
    const chartData = [
      { name: "Available", value: data.Available },
      { name: "Assigned", value: data.Assigned },
      { name: "Damaged", value: data.Damaged },
    ];
  
    const total =
      data.Available + data.Assigned + data.Damaged;
  
    return (
      <div className="relative bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group">
  
        {/* 🌿 emerald glow */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-emerald-100/40 blur-3xl opacity-40 group-hover:opacity-60 transition" />
  
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Inventory Status
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Live asset breakdown
            </p>
          </div>
  
          <div className="text-xs font-bold text-emerald-600 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live
          </div>
        </div>
  
        {/* CHART */}
        <div className="relative">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
  
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
  
          {/* CENTER TEXT (DONUT STYLE) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-3xl font-black text-slate-900">
              {total}
            </p>
            <p className="text-xs font-bold text-slate-400">
              Total Items
            </p>
          </div>
        </div>
  
        {/* LEGEND */}
        <div className="flex justify-center gap-6 mt-4">
          {chartData.map((item, i) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[i] }}
              />
              <p className="text-xs font-bold text-slate-500">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default InventoryChart;
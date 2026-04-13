import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  type AttendanceChartData = {
    date: string;
    Present: number;
    Absent: number;
    Late: number;
  };
  
  type Props = {
    data: AttendanceChartData[];
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
  
    return (
      <div className="bg-white border border-emerald-100 shadow-lg rounded-2xl p-3">
        <p className="text-xs font-black text-slate-500 mb-2">{label}</p>
  
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-600">
              {p.dataKey}
            </span>
            <span className="text-xs font-black text-slate-900">
              {p.value}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  const AttendanceChart = ({ data }: Props) => {
    return (
      <div className="relative bg-white rounded-3xl border border-slate-100 p-6 shadow-sm h-105 hover:shadow-md transition-all overflow-hidden group">
  
        {/* 🌿 emerald glow */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-emerald-100/40 blur-3xl opacity-40 group-hover:opacity-60 transition" />
  
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Attendance Trend
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Last 7 days overview
            </p>
          </div>
  
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>
  
        {/* CHART */}
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
  
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
  
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
  
            <Tooltip content={<CustomTooltip />} />
  
            <Line
              type="monotone"
              dataKey="Present"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
  
            <Line
              type="monotone"
              dataKey="Absent"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
  
            <Line
              type="monotone"
              dataKey="Late"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default AttendanceChart;
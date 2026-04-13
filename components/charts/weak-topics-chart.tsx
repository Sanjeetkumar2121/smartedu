"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Current Affairs", score: 45, fullMark: 100 },
  { name: "Mathematics", score: 55, fullMark: 100 },
  { name: "Reasoning", score: 62, fullMark: 100 },
  { name: "English", score: 70, fullMark: 100 },
  { name: "General Science", score: 75, fullMark: 100 },
];

const getBarColor = (score: number) => {
  if (score < 50) return "hsl(0, 84%, 60%)";
  if (score < 65) return "hsl(38, 92%, 50%)";
  return "hsl(142, 76%, 36%)";
};

export function WeakTopicsChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Weak Topics Analysis
        </h3>
        <p className="text-sm text-muted-foreground">
          Topics that need more attention
        </p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, "Score"]}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(0, 84%, 60%)" }} />
          <span className="text-muted-foreground">{"Needs Work (<50%)"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(38, 92%, 50%)" }} />
          <span className="text-muted-foreground">{"Average (50-65%)"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(142, 76%, 36%)" }} />
          <span className="text-muted-foreground">{"Good (>65%)"}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ChartData } from "@/lib/types";

interface Props {
  chart: ChartData;
}

function formatValue(value: number): string {
  if (value >= 1000) return `$${value.toLocaleString()}`;
  if (value < 1 && value > 0) return `${(value * 100).toFixed(1)}%`;
  return value.toLocaleString();
}

export default function ChartBlock({ chart }: Props) {
  const { type, title, data, xKey, yKeys } = chart;

  const tickFormatter = (val: string) =>
    val.length > 14 ? val.slice(0, 14) + "…" : val;

  const tooltipFormatter = (value: number, name: string) => [
    formatValue(value),
    name,
  ];

  return (
    <div className="my-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] p-4">
      <p className="text-sm font-semibold text-gray-300 mb-3">{title}</p>
      <ResponsiveContainer width="100%" height={300}>
        {type === "bar" ? (
          <BarChart data={data} margin={{ top: 4, right: 16, bottom: 60, left: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              tickFormatter={tickFormatter}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Tooltip
              formatter={tooltipFormatter}
              contentStyle={{ background: "#1f1f1f", border: "1px solid #3a3a3a", borderRadius: 8 }}
              labelStyle={{ color: "#e5e7eb" }}
            />
            {yKeys.length > 1 && <Legend wrapperStyle={{ color: "#9ca3af", paddingTop: 8 }} />}
            {yKeys.map((yk) => (
              <Bar key={yk.key} dataKey={yk.key} name={yk.label} fill={yk.color} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 4, right: 16, bottom: 16, left: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey={xKey} tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Tooltip
              formatter={tooltipFormatter}
              contentStyle={{ background: "#1f1f1f", border: "1px solid #3a3a3a", borderRadius: 8 }}
              labelStyle={{ color: "#e5e7eb" }}
            />
            {yKeys.length > 1 && <Legend wrapperStyle={{ color: "#9ca3af", paddingTop: 8 }} />}
            {yKeys.map((yk) => (
              <Line
                key={yk.key}
                type="monotone"
                dataKey={yk.key}
                name={yk.label}
                stroke={yk.color}
                strokeWidth={2}
                dot={{ fill: yk.color, r: 4 }}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

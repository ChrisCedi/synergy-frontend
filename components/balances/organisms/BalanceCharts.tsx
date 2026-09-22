"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TypographyH4 } from "@/components/ui/atoms/TypographyH4";

const chartData = [
  { company: "Coca cola", total: 186 },
  { company: "Pepsi", total: 305 },
  { company: "Barcel", total: 237 },
  { company: "Bimbo", total: 73 },
  { company: "Sabritas", total: 209 },
  { company: "Jumex", total: 21 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function BalanceCharts({
  balanceCharts,
}: {
  balanceCharts: { company: string; total: number }[];
}) {
  return (
    <div>
      <TypographyH4 className="py-4">Top de egresos por empresa</TypographyH4>
      <ChartContainer
        config={chartConfig}
        className="h-[200px] md:h-[240px] w-full mb-4"
      >
        <BarChart accessibilityLayer data={balanceCharts}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="company"
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 6)}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

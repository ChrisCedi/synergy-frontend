"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TypographyH4 } from "@/components/ui/atoms/TypographyH4";

const chartData = [
  { company: "Coca cola", desktop: 186 },
  { company: "Pepsi", desktop: 305 },
  { company: "Barcel", desktop: 237 },
  { company: "Bimbo", desktop: 73 },
  { company: "Sabritas", desktop: 209 },
  { company: "Jumex", desktop: 21 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function BalanceCharts() {
  return (
    <div>
      <TypographyH4 className="py-4">Origen de registros</TypographyH4>
      <ChartContainer
        config={chartConfig}
        className="h-[200px] md:h-[240px] w-full mb-4"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="company"
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 6)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

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
  { company: "Coca cola", adquisiciones: 186 },
  { company: "Pepsi", adquisiciones: 305 },
  { company: "Barcel", adquisiciones: 237 },
  { company: "Bimbo", adquisiciones: 73 },
  { company: "Sabritas", adquisiciones: 209 },
  { company: "Jumex", adquisiciones: 21 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function BalanceCharts() {
  return (
    <div>
      <TypographyH4 className="py-4">
        Top de adquisiciones por empresa
      </TypographyH4>
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
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="adquisiciones" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from './chart';

// Mock data for the analytics chart
const analyticsData = [
  { month: 'Nov 2024', artworks: 12, impressions: 342 },
  { month: 'Dec 2024', artworks: 18, impressions: 520 },
  { month: 'Jan 2025', artworks: 23, impressions: 680 },
  { month: 'Feb 2025', artworks: 29, impressions: 790 },
  { month: 'Mar 2025', artworks: 34, impressions: 850 },
  { month: 'Apr 2025', artworks: 45, impressions: 1250 }
];

const chartConfig = {
  artworks: {
    label: 'Artworks',
    color: '#6D5BDC', // Purple dark - our theme color
  },
  impressions: {
    label: 'Impressions',
    color: '#A794FF', // Purple medium - our theme color
  }
} satisfies ChartConfig;

interface AnalyticsChartProps {
  className?: string;
}

export function AnalyticsChart({ className }: AnalyticsChartProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Your Impact</CardTitle>
          <CardDescription>
            Analytics for the last 6 months
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Total Artworks
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {analyticsData.reduce((acc, curr) => acc + curr.artworks, 0)}
            </span>
          </div>
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-l px-6 py-4 text-left sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Total Impressions
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {analyticsData.reduce((acc, curr) => acc + curr.impressions, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={analyticsData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barGap={8}
          >
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8} 
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  className="w-[160px]" 
                  nameKey="category"
                />
              } 
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar 
              dataKey="artworks" 
              fill="var(--color-artworks)" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={40}
              name="Artworks"
            />
            <Bar 
              dataKey="impressions" 
              fill="var(--color-impressions)" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={40}
              name="Impressions"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default AnalyticsChart;
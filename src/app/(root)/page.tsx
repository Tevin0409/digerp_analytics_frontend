"use client";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ContentLayout } from "@/components/common/content-layout";
import DateRangePicker from "@/components/common/date-range-picker";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardSummaryReport } from "@/hooks/use-summary";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const Dashboard = () => {
  const { token } = useAuthStore();
  const getCurrentDate = () => new Date().toISOString().split("T")[0];
  const searchParams = useSearchParams();
  const [params, setParams] = useState<DateParams>({
    from: searchParams.get("from") ?? getCurrentDate(),
    to: searchParams.get("to") ?? getCurrentDate(),
  });

  const { generalSalesReport, loading, error, refetch } =
    useDashboardSummaryReport(
      {
        page: 1,
        limit: 1000,
        from: params.from,
        to: params.to,
      },
      token!
    );
  useEffect(() => {
    const newParams = {
      from: searchParams.get("from") ?? getCurrentDate(),
      to: searchParams.get("to") ?? getCurrentDate(),
    };
    setParams(newParams);
  }, [searchParams]);
  console.log("generalSalesReport", generalSalesReport);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  return (
    <ContentLayout title="Dashboard">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Suspense fallback={<Skeleton className="h-7 w-52" />}>
          <DateRangePicker
            triggerSize={"sm"}
            triggerClassName="ml-auto w-56 sm:w-60"
            align="end"
          />
        </Suspense>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card className=" max-w-xs">
            <CardHeader className="space-y-0 pb-0">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text- tabular-nums">
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  KES
                </span>

                {(
                  generalSalesReport as DashboardSummaryResponse
                ).summary.totalRevenue.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-5">
              <ChartContainer
                config={{
                  time: {
                    label: "Revenue",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <AreaChart
                  width={730}
                  height={250}
                  accessibilityLayer
                  data={(generalSalesReport as DashboardSummaryResponse).data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="25%"
                        stopColor="hsl(var(--chart-1))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--chart-1))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="25%"
                        stopColor="hsl(var(--chart-2))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--chart-2))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="groupKey"
                    tickMargin={10}
                    tick={{ fontSize: 8 }} // Adjust tick font size
                  />
                  <YAxis
                    type="number"
                    tickCount={12}
                    tick={{ fontSize: 8 }} // Adjust tick font size
                    domain={["dataMin", "dataMax"]}
                  />

                  <Area
                    dataKey="revenue"
                    type="natural"
                    fill="url(#fillTime)"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-1))"
                  />
                  <Area
                    dataKey="expenses"
                    type="natural"
                    fill="url(#colorPv)"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-2))"
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* <Tooltip /> */}
                  <ChartTooltip content={<ChartTooltipContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className=" max-w-xs">
            <CardHeader className="space-y-0 pb-0">
              <CardDescription>Total Expenses</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text- tabular-nums">
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  KES
                </span>

                {(
                  generalSalesReport as DashboardSummaryResponse
                ).summary.totalExpenses.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-5">
              <ChartContainer
                config={{
                  time: {
                    label: "Expenses",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <BarChart
                  width={730}
                  height={250}
                  accessibilityLayer
                  data={(generalSalesReport as DashboardSummaryResponse).data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="groupKey"
                    tickMargin={10}
                    tick={{ fontSize: 8 }}
                    // tickFormatter={(value) => value.slice(0, 3)}
                    // tick={{ fontSize: 8 }} // Adjust tick font size
                  />
                  <YAxis tick={{ fontSize: 8 }} />

                  <Bar
                    dataKey={"expenses"}
                    fill="hsl(var(--chart-2))"
                    radius={4}
                  />

                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  {/* <Tooltip /> */}
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    // formatter={(value) => (
                    //   <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                    //     <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    //       <span className="font-normal text-muted-foreground">
                    //         KES
                    //       </span>
                    //       {parseFloat(value.toString()).toLocaleString()}
                    //     </div>
                    //   </div>
                    // )}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex items-center justify-end">
              <span className="text-xs text-muted-foreground ">
                View Details
              </span>
              <span>
                <ArrowRightIcon className="h-4 w-4 text-muted-foreground " />
              </span>
            </CardFooter>
          </Card>
        </div>
      </main>
    </ContentLayout>
  );
};

export default Dashboard;

"use client"

import React from "react"
import Link from "next/link"
import {
  Activity,
  ArrowBigRight,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SiteHeader } from "@/components/site-header"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Complete Test",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Incomplete Test",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig
const chartDataGroupProgress = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfigGroupProgress = {
  visitors: {
    label: "Visitors",
  },

  chrome: {
    label: "Group Gender",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "CRT CAT",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "GMA CAT ",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Person ality",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Labour SJT Group",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function IndexPage() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
            <Card
              x-chunk="dashboard-01-chunk-0"
              className="bg-gradient-to-bl from-indigo-500 via-indigo-600 to-indigo-700 text-white "
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Candidates Created
                </CardTitle>
                <DollarSign className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2096</div>
                <p className="text-xs text-end ">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card
              x-chunk="dashboard-01-chunk-1"
              className="bg-gradient-to-bl from-sky-500 via-sky-600 to-sky-700 text-white"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Candidates Available
                </CardTitle>
                <Users className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+1419</div>
                <p className="text-xs text-end">+180.1% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {" "}
            <Card
              x-chunk="dashboard-01-chunk-2"
              className="bg-gradient-to-bl from-emerald-500 via-emerald-600 to-emerald-700 text-white"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Candidates Online
                </CardTitle>
                <CreditCard className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+50</div>
              </CardContent>
            </Card>
            <Card
              x-chunk="dashboard-01-chunk-3"
              className="bg-gradient-to-bl from-orange-500 via-orange-600 to-orange-700 text-white"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Progress
                </CardTitle>
                <Activity className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
              </CardContent>
            </Card>
            <Card
              x-chunk="dashboard-01-chunk-4"
              className="bg-gradient-to-bl from-amber-500 via-amber-600 to-amber-700 text-white"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Candidates Blocked
                  {/* <h1>The value of customKey is: {process.env.API_URL}</h1> */}
                </CardTitle>
                <Users className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-2350</div>
              </CardContent>
            </Card>
            <Card
              x-chunk="dashboard-01-chunk-5"
              className="bg-gradient-to-bl from-rose-500 via-rose-600 to-rose-700 text-white"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Candidates Deleted
                </CardTitle>
                <Activity className="h-4 w-4 " />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-25</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                  <CardTitle>Candidates per Month</CardTitle>
                  <CardDescription>
                    Showing total completion progress for the last 3 months
                  </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger
                    className="w-[160px] rounded-md sm:ml-auto"
                    aria-label="Select a value"
                  >
                    <SelectValue placeholder="Last 3 months" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="90d" className="rounded-md">
                      Last 3 months
                    </SelectItem>
                    <SelectItem value="30d" className="rounded-md">
                      Last 30 days
                    </SelectItem>
                    <SelectItem value="7d" className="rounded-md">
                      Last 7 days
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient
                        id="fillDesktop"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-desktop)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-desktop)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillMobile"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-mobile)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-mobile)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          }}
                          indicator="dot"
                        />
                      }
                    />
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="url(#fillMobile)"
                      stroke="var(--color-mobile)"
                      stackId="a"
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="url(#fillDesktop)"
                      stroke="var(--color-desktop)"
                      stackId="a"
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
              <CardHeader>
                <CardTitle>Group Progress</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfigGroupProgress}>
                  <BarChart
                    accessibilityLayer
                    data={chartDataGroupProgress}
                    layout="vertical"
                    margin={{
                      left: 0,
                    }}
                  >
                    <YAxis
                      dataKey="browser"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        chartConfigGroupProgress[
                          value as keyof typeof chartConfigGroupProgress
                        ]?.label
                      }
                    />
                    <XAxis dataKey="visitors" type="number" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="visitors" layout="vertical" radius={5} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total progress for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                  <CardTitle>SMART Credits</CardTitle>
                  <CardDescription>
                    Showing total completion progress for the last 3 months
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-5 px-6 grid grid-cols-3 gap-x-4  text-center">
                <Button className="bg-gradient-to-bl from-emerald-500 via-emerald-600 to-emerald-700 text-white">
                  60434
                </Button>
                <Button className="bg-gradient-to-bl from-rose-500 via-rose-600 to-rose-700 text-white">
                  148
                </Button>
                <Button className="bg-gradient-to-bl from-indigo-500 via-indigo-600 to-indigo-700 text-white">
                  60582
                </Button>
                <div className="pt-1">Available</div>
                <div className="pt-1">Allocated</div>
                <div className="pt-1 pb-4">Total</div>
                <Button className="flex gap-x-2 w-32" variant="secondary">
                  <p>More Info</p>
                  <ArrowBigRight className="h-4 w-4 " />
                </Button>
              </CardContent>
            </Card>
            <Card className="" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                  <CardTitle>Proctoring Credits</CardTitle>
                  <CardDescription>
                    Showing total completion progress for the last 3 months
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-5 px-6 grid grid-cols-3 gap-x-4  text-center">
                <Button className="bg-gradient-to-bl from-emerald-500 via-emerald-600 to-emerald-700 text-white">
                  697
                </Button>
                <Button className="bg-gradient-to-bl from-rose-500 via-rose-600 to-rose-700 text-white">
                  67
                </Button>
                <Button className="bg-gradient-to-bl from-indigo-500 via-indigo-600 to-indigo-700 text-white">
                  764
                </Button>
                <div className="pt-1">Available</div>
                <div className="pt-1">Allocated</div>
                <div className="pt-1 pb-4">Total</div>
                <Button className="flex gap-x-2 w-32" variant="secondary">
                  <p>More Info</p>
                  <ArrowBigRight className="h-4 w-4 " />
                </Button>
              </CardContent>
            </Card>
            <Card className="" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                  <CardTitle>SMART Interview</CardTitle>
                  <CardDescription>
                    Showing total completion progress for the last 3 months
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-5 px-6 grid grid-cols-3 gap-x-4  text-center">
                <Button className="bg-gradient-to-bl from-emerald-500 via-emerald-600 to-emerald-700 text-white">
                  58
                </Button>
                <Button className="bg-gradient-to-bl from-rose-500 via-rose-600 to-rose-700 text-white">
                  17
                </Button>
                <Button className="bg-gradient-to-bl from-indigo-500 via-indigo-600 to-indigo-700 text-white">
                  75
                </Button>
                <div className="pt-1">Available</div>
                <div className="pt-1">Allocated</div>
                <div className="pt-1 pb-4">Total</div>
                <Button className="flex gap-x-2 w-32" variant="secondary">
                  <p>More Info</p>
                  <ArrowBigRight className="h-4 w-4 " />
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}

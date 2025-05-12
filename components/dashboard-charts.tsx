"use client"

import { useTheme } from "next-themes"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Gauge component for displaying metrics
export const Gauge = ({ value, min = 0, max = 100, label, size = 120, thickness = 10 }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Calculate the angle based on the value
  const angle = ((value - min) / (max - min)) * 180

  // Calculate the coordinates for the needle
  const needleLength = size / 2 - thickness - 10
  const needleX = Math.cos((angle - 90) * (Math.PI / 180)) * needleLength
  const needleY = Math.sin((angle - 90) * (Math.PI / 180)) * needleLength

  // Colors based on the value
  const getColor = () => {
    if (value < max * 0.3) return isDark ? "#4ade80" : "#22c55e" // Green
    if (value < max * 0.7) return isDark ? "#facc15" : "#eab308" // Yellow
    return isDark ? "#f87171" : "#ef4444" // Red
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size / 2 }}>
        {/* Background arc */}
        <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
          <path
            d={`M ${thickness} ${size / 2} A ${size / 2 - thickness} ${size / 2 - thickness} 0 0 1 ${size - thickness} ${size / 2}`}
            fill="none"
            stroke={isDark ? "#374151" : "#e5e7eb"}
            strokeWidth={thickness}
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d={`M ${thickness} ${size / 2} A ${size / 2 - thickness} ${size / 2 - thickness} 0 0 1 ${size / 2} ${thickness}`}
            fill="none"
            stroke={getColor()}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={`${(Math.PI * (size - thickness * 2)) / 2}`}
            strokeDashoffset={`${((180 - angle) / 180) * ((Math.PI * (size - thickness * 2)) / 2)}`}
          />
          {/* Needle */}
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2 + needleX}
            y2={size / 2 + needleY}
            stroke={isDark ? "#e5e7eb" : "#374151"}
            strokeWidth={2}
            strokeLinecap="round"
          />
          {/* Needle center */}
          <circle cx={size / 2} cy={size / 2} r={thickness / 2} fill={isDark ? "#e5e7eb" : "#374151"} />
        </svg>
      </div>
      <div className="mt-2 text-center">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}

// API Usage Chart
export const ApiUsageChart = ({ data, isDark }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis
          dataKey="date"
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getDate()}/${date.getMonth() + 1}`
          }}
        />
        <YAxis
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-xs">{label}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">API Calls</span>
                      <span className="font-bold text-xs">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="calls"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// Model Usage Pie Chart
export const ModelUsageChart = ({ data, colors }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold">{payload[0].name}</span>
                    <span className="text-xs text-muted-foreground">{payload[0].value}% of total usage</span>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

// Endpoint Distribution Bar Chart
export const EndpointDistributionChart = ({ data, colors }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" scale="band" width={100} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold">{label}</span>
                    <span className="text-xs text-muted-foreground">{payload[0].value}% of total calls</span>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// Token Usage Area Chart
export const TokenUsageAreaChart = ({ data, isDark }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis
          dataKey="date"
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getDate()}/${date.getMonth() + 1}`
          }}
        />
        <YAxis
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                    <span className="font-bold text-xs">{label}</span>
                    <span className="text-[0.70rem] uppercase text-muted-foreground mt-1">Tokens</span>
                    <span className="font-bold text-xs">{payload[0].value.toLocaleString()}</span>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="tokens"
          stroke="#8b5cf6"
          fill="url(#colorTokens)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <defs>
          <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  )
}

// Daily Success/Error Stacked Bar Chart
export const DailySuccessRateChart = ({ data, isDark }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis
          dataKey="date"
          stroke={isDark ? "#9ca3af" : "#6b7280"}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            const date = new Date(value)
            return `${date.getDate()}/${date.getMonth() + 1}`
          }}
        />
        <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const total = payload[0].value + payload[1].value
              const successRate = ((payload[0].value / total) * 100).toFixed(1)

              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                    <span className="font-bold text-xs">{label}</span>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-green-600">Success</span>
                        <span className="font-bold text-xs">{payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-red-600">Errors</span>
                        <span className="font-bold text-xs">{payload[1].value}</span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Success Rate</span>
                      <span className="font-bold text-xs ml-2">{successRate}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar dataKey="success" stackId="a" fill="#22c55e" />
        <Bar dataKey="errors" stackId="a" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  )
}

// Response Time Comparison Chart (Bar Chart instead of RadialBar)
export const ResponseTimeComparisonChart = ({ data, colors }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Response Time (ms)", angle: -90, position: "insideLeft" }} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold">{label}</span>
                    <span className="text-xs text-muted-foreground">{payload[0].value}ms average</span>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="value" fill="#3b82f6">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// Dashboard Chart Card Component
export const DashboardChartCard = ({ title, description, children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartLine,
  ChartArea,
  ChartLinearScale,
  ChartTimeScale,
} from "@/components/ui/chart"

interface MarketChartProps {
  timeframe: string
}

export function MarketChart({ timeframe }: MarketChartProps) {
  // Sample data - in a real app, this would come from an API
  const data = generateChartData(timeframe)

  return (
    <Card className="p-4 bg-neutral-50 border border-neutral-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">S&P 500</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">4,783.35</span>
            <span className="text-teal-dark text-sm">+38.52 (+0.81%)</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
      </div>

      <div className="h-[300px] w-full">
        <ChartContainer data={data}>
          <Chart>
            <ChartTimeScale />
            <ChartLinearScale />
            <ChartArea data={data} curve="monotone" fill="#5EEAD4" fillOpacity={0.2} stroke="#14B8A6" />
            <ChartLine data={data} curve="monotone" stroke="#14B8A6" strokeWidth={2} />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 border border-neutral-200 shadow-sm rounded-md">
                      <p className="text-sm text-gray-900 font-medium">${payload[0].value?.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{new Date(payload[0].payload.date).toLocaleString()}</p>
                    </div>
                  )
                }
                return null
              }}
            />
          </Chart>
        </ChartContainer>
      </div>
    </Card>
  )
}

function generateChartData(timeframe: string) {
  const now = new Date()
  const data = []

  let points = 0
  let startValue = 4700
  let volatility = 0

  switch (timeframe) {
    case "1D":
      points = 24
      volatility = 5
      break
    case "5D":
      points = 5
      volatility = 15
      break
    case "1M":
      points = 30
      volatility = 30
      break
    case "6M":
      points = 180
      volatility = 100
      break
    case "1Y":
      points = 365
      volatility = 200
      break
    default:
      points = 24
      volatility = 5
  }

  for (let i = 0; i < points; i++) {
    const date = new Date(now)
    date.setHours(date.getHours() - (points - i))

    const change = (Math.random() - 0.45) * volatility
    startValue += change

    data.push({
      date: date.toISOString(),
      value: startValue,
    })
  }

  return data
}

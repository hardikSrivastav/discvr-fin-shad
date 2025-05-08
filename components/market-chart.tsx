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
import { formatDate } from "@/lib/utils"
import { getMarketIndices, MarketIndex } from "@/lib/api"
import useSWR from "swr"
import { Skeleton } from "@/components/ui/skeleton"

interface MarketChartProps {
  timeframe: string
}

const fetcher = async (timeframe: string) => {
  const data = await getMarketIndices()
  // Transform API response to chart format
  return data.map((index, i) => ({
    timestamp: new Date(Date.now() - (data.length - i) * 3600000).toISOString(),
    price: index.price,
    change: index.change,
    change_percent: index.change_percent
  }))
}

export function MarketChart({ timeframe }: MarketChartProps) {
  const { data, error, isLoading } = useSWR<MarketIndex[]>(
    ['market-indices', timeframe],
    () => fetcher(timeframe),
    { refreshInterval: 300000 }
  )

  if (error) return <div className="text-red-500 p-4">Failed to load market data</div>
  if (isLoading) return <Skeleton className="h-[350px] w-full" />

  const latestData = data?.[data.length - 1] || {}

  return (
    <Card className="p-4 bg-neutral-50 border border-neutral-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">S&P 500</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {latestData.price?.toFixed(2) || 'N/A'}
            </span>
            {latestData.change && (
              <span className={`text-sm ${latestData.change >= 0 ? 'text-teal-dark' : 'text-red-600'}`}>
                {latestData.change >= 0 ? '+' : ''}
                {latestData.change?.toFixed(2)} ({latestData.change_percent?.toFixed(2)}%)
              </span>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {formatDate(new Date())} {/* Update with actual timestamp from API if available */}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ChartContainer>
          <Chart>
            <ChartTimeScale />
            <ChartLinearScale />
            <ChartArea 
              data={data || []}
              fill="#5EEAD4" 
              fillOpacity={0.2} 
              stroke="#14B8A6" 
            />
            <ChartLine 
              data={data || []}
              stroke="#14B8A6" 
              strokeWidth={2} 
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload as MarketIndex
                  return (
                    <div className="bg-white p-2 border border-neutral-200 shadow-sm rounded-md">
                      <p className="text-sm text-gray-900 font-medium">
                        ${dataPoint.price?.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(new Date(dataPoint.timestamp))}
                      </p>
                      <p className="text-xs mt-1">
                        <span className={dataPoint.change >= 0 ? 'text-teal-dark' : 'text-red-600'}>
                          {dataPoint.change >= 0 ? '+' : ''}
                          {dataPoint.change?.toFixed(2)} ({dataPoint.change_percent?.toFixed(2)}%)
                        </span>
                      </p>
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

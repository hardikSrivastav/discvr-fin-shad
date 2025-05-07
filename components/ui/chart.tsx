"use client"

import type React from "react"

import { forwardRef } from "react"
import * as Recharts from "recharts"

const Chart = forwardRef<Recharts.ComposedChart, React.ComponentPropsWithoutRef<typeof Recharts.ComposedChart>>(
  ({ className, ...props }, ref) => {
    return <Recharts.ComposedChart ref={ref} className={className} {...props} />
  },
)
Chart.displayName = "Chart"

const ChartLine = forwardRef<Recharts.Line, React.ComponentPropsWithoutRef<typeof Recharts.Line>>(
  ({ className, ...props }, ref) => {
    return <Recharts.Line ref={ref} className={className} {...props} />
  },
)
ChartLine.displayName = "ChartLine"

const ChartArea = forwardRef<Recharts.Area, React.ComponentPropsWithoutRef<typeof Recharts.Area>>(
  ({ className, ...props }, ref) => {
    return <Recharts.Area ref={ref} className={className} {...props} />
  },
)
ChartArea.displayName = "ChartArea"

const ChartLinearScale = () => null
const ChartTimeScale = () => null

const ChartTooltip = forwardRef<Recharts.Tooltip, React.ComponentPropsWithoutRef<typeof Recharts.Tooltip>>(
  ({ className, ...props }, ref) => {
    return <Recharts.Tooltip ref={ref} className={className} {...props} />
  },
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = () => null

const ChartContainer = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <Recharts.ResponsiveContainer width="100%" height="100%">
          {children}
        </Recharts.ResponsiveContainer>
      </div>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

export {
  Chart,
  ChartLine,
  ChartArea,
  ChartLinearScale,
  ChartTimeScale,
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
}

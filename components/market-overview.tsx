"use client"

import { useState, useEffect } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { MessageCircle } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MarketChart } from "@/components/market-chart"
import { setApiUrl } from "@/lib/api"
import { useMarketIndices } from "@/hooks/use-finance-api"

// In a real app, this would be set in a more appropriate place like _app.tsx
if (typeof window !== 'undefined') {
  // For demo purposes, we'll use a placeholder
  setApiUrl('https://api.example.com');
}

export default function MarketOverview() {
  const [timeframe, setTimeframe] = useState("1D")
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  // Fetch market indices from the API
  const { data: marketIndicesData, loading, error } = useMarketIndices();
  
  // Generate market summary from API data or use default message
  let marketSummary = "Loading market summary...";
  
  if (marketIndicesData) {
    // Calculate average change percentage
    const avgChange = marketIndicesData
      .map(index => index.change_percent)
      .reduce((sum, current) => sum + current, 0) / marketIndicesData.length;
    
    // Find index with highest change percentage
    const sortedIndices = [...marketIndicesData].sort((a, b) => b.change_percent - a.change_percent);
    const topPerformer = sortedIndices[0].name;
    
    marketSummary = `Market overview shows ${avgChange > 0 ? 'positive' : 'negative'} movement with an average change of ${avgChange.toFixed(2)}%. Volume is high across major indices, with ${topPerformer} leading gains.`;
  }
  
  // Format market indices data for display
  const formattedIndices = marketIndicesData ? marketIndicesData.slice(0, 3).map(index => ({
    name: index.name,
    value: index.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    change: `${index.change_percent >= 0 ? '+' : ''}${index.change_percent.toFixed(2)}%`
  })) : [
    // Fallback data if API data is not available
    { name: "Dow Jones", value: "38,239.98", change: "+0.56%" },
    { name: "NASDAQ", value: "15,927.90", change: "+1.23%" },
    { name: "Russell 2000", value: "2,011.66", change: "-0.32%" }
  ];

  return (
    <Card className="bg-neutral-50 border border-neutral-200">
      <CardHeader className="bg-neutral-100 border-b border-neutral-200">
        <CardTitle className="text-gray-900">Market Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading && (
          <div className="p-4 text-center text-gray-500">Loading market data...</div>
        )}
        {error && (
          <div className="p-4 text-center text-red-500">
            Error loading market data. Using fallback data.
          </div>
        )}
        {isDesktop ? (
          <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
            <ResizablePanel defaultSize={70}>
              <div className="h-full p-4">
                <MarketChart timeframe={timeframe} />
                <Tabs value={timeframe} onValueChange={setTimeframe} className="mt-4">
                  <TabsList className="grid grid-cols-8 w-full bg-neutral-100">
                    <TabsTrigger value="1D" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      1D
                    </TabsTrigger>
                    <TabsTrigger value="5D" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      5D
                    </TabsTrigger>
                    <TabsTrigger value="1M" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      1M
                    </TabsTrigger>
                    <TabsTrigger value="6M" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      6M
                    </TabsTrigger>
                    <TabsTrigger value="YTD" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      YTD
                    </TabsTrigger>
                    <TabsTrigger value="1Y" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      1Y
                    </TabsTrigger>
                    <TabsTrigger value="5Y" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      5Y
                    </TabsTrigger>
                    <TabsTrigger value="MAX" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      MAX
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {formattedIndices.map((index, i) => (
                    <Card key={i} className="p-2 bg-neutral-50 border border-neutral-200 h-24 flex flex-col justify-center">
                      <div className="text-sm font-medium text-gray-600">{index.name}</div>
                      <div className="text-lg font-bold text-gray-900">{index.value}</div>
                      <div className={`text-sm ${index.change.startsWith('+') ? 'text-teal-dark' : 'text-red-500'}`}>
                        {index.change}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle className="bg-neutral-200" />
            <ResizablePanel defaultSize={30}>
              <div className="p-4 h-full">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Market Summary</h3>
                  <p className="text-gray-700">{marketSummary}</p>
                </div>
                <div className="mt-6">
                  <div className="relative">
                    <Input placeholder="Ask about the market..." className="pr-20 bg-neutral-50 border-neutral-300" />
                    <Button className="absolute right-0 top-0 h-full rounded-l-none bg-teal hover:bg-teal-dark">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="space-y-4">
            <MarketChart timeframe={timeframe} />
            <Tabs value={timeframe} onValueChange={setTimeframe}>
              <TabsList className="grid grid-cols-4 w-full mb-4">
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
            <Card className="p-4">
              <CardTitle className="text-sm mb-2">AI Market Summary</CardTitle>
              <p className="text-sm">{marketSummary}</p>
            </Card>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0">
                  <MessageCircle />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-4 max-h-[80vh] overflow-y-auto">
                  <h3 className="font-semibold mb-4">Chat with AI Assistant</h3>
                  <div className="space-y-4 mb-4">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted p-2 rounded-lg">How can I help you understand the market today?</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Ask about the market..." className="flex-1" />
                    <Button>Send</Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

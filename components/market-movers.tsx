"use client"

import { useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MarketMoverTable } from "@/components/market-mover-table"
import { Input } from "@/components/ui/input"
import { setApiUrl } from "@/lib/api"
import { useEquitySpotlight } from "@/hooks/use-finance-api"

// In a real app, this would be set in a more appropriate place like _app.tsx
// The API_URL would be provided when the application is deployed
if (typeof window !== 'undefined') {
  // For demo purposes, we'll use a placeholder
  setApiUrl('https://api.example.com');
}

export default function MarketMovers() {
  const [activeTab, setActiveTab] = useState("gainers")
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  // Fetch data from the API
  const { data: equityData, loading, error } = useEquitySpotlight();
  
  // In a real app, this data would come from the API
  const marketMoversSummary = equityData 
    ? `Today's market shows ${equityData.market_stats.gainers_count} gainers and ${equityData.market_stats.losers_count} losers. Average gain is ${equityData.market_stats.average_gain.toFixed(2)}% and average loss is ${equityData.market_stats.average_loss.toFixed(2)}%. Trading volume is high with an average of ${(equityData.market_stats.average_volume / 1000000).toFixed(2)}M shares.`
    : "Loading market summary...";

  // Fallback data in case API fails
  const fallbackData = [
    { ticker: "NVDA", name: "NVIDIA Corp", price: 950.02, change: 5.23, volume: "23.5M" },
    { ticker: "AAPL", name: "Apple Inc", price: 198.45, change: 3.78, volume: "45.2M" },
    { ticker: "MSFT", name: "Microsoft Corp", price: 420.15, change: 2.91, volume: "18.7M" },
    { ticker: "GOOGL", name: "Alphabet Inc", price: 175.23, change: 2.45, volume: "12.3M" },
    { ticker: "AMZN", name: "Amazon.com Inc", price: 185.67, change: 2.12, volume: "15.8M" },
  ]

  // Use API data or fallback data
  const gainers = equityData ? equityData.top_gainers : fallbackData;
  const losers = equityData ? equityData.top_losers : fallbackData;
  const mostActive = equityData ? equityData.most_active : fallbackData;

  return (
    <Card className="bg-neutral-50 border border-neutral-200">
      <CardHeader className="bg-neutral-100 border-b border-neutral-200">
        <CardTitle className="text-gray-900">Market Movers</CardTitle>
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
          <ResizablePanelGroup direction="horizontal" className="min-h-[400px]">
            <ResizablePanel defaultSize={70}>
              <div className="p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-neutral-100">
                    <TabsTrigger value="gainers" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      Top Gainers
                    </TabsTrigger>
                    <TabsTrigger value="losers" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      Top Losers
                    </TabsTrigger>
                    <TabsTrigger value="active" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      Most Active
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="gainers" className="mt-4">
                    <MarketMoverTable data={gainers} />
                  </TabsContent>
                  <TabsContent value="losers" className="mt-4">
                    <MarketMoverTable data={losers} />
                  </TabsContent>
                  <TabsContent value="active" className="mt-4">
                    <MarketMoverTable data={mostActive} />
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
            <ResizableHandle className="bg-neutral-200" />
            <ResizablePanel defaultSize={30}>
              <div className="p-4 h-full">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Market Movers Summary</h3>
                  <p className="text-gray-700">{marketMoversSummary}</p>
                </div>
                <div className="mt-6">
                  <div className="relative">
                    <Input
                      placeholder="Ask about market movers..."
                      className="pr-20 bg-neutral-50 border-neutral-300"
                    />
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="gainers">Gainers</TabsTrigger>
                <TabsTrigger value="losers">Losers</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
              </TabsList>
              <TabsContent value="gainers">
                <MarketMoverTable data={gainers} />
              </TabsContent>
              <TabsContent value="losers">
                <MarketMoverTable data={losers} />
              </TabsContent>
              <TabsContent value="active">
                <MarketMoverTable data={mostActive} />
              </TabsContent>
            </Tabs>

            <Card className="p-4">
              <CardTitle className="text-sm mb-2">AI Market Movers Summary</CardTitle>
              <p className="text-sm">{marketMoversSummary}</p>
            </Card>

            <Drawer>
              <DrawerTrigger asChild>
                <Button className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0">
                  <MessageCircle />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-4">
                  <h3 className="font-semibold mb-4">Chat with AI Assistant</h3>
                  {/* Chat content would go here */}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

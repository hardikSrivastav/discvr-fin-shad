"use client"

import { useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, AlertCircle } from "lucide-react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { MarketMoverTable } from "@/components/market-mover-table"
import { Input } from "@/components/ui/input"
import "@/lib/init-api" // Import for side effects only
import { useEquitySpotlight } from "@/hooks/use-finance-api"

// Fallback stock data for when API fails
const FALLBACK_STOCKS = {
  gainers: [
    { ticker: "NVDA", name: "NVIDIA Corp", price: 950.02, change: 5.23, volume: "23.5M" },
    { ticker: "AAPL", name: "Apple Inc", price: 198.45, change: 3.78, volume: "45.2M" },
    { ticker: "MSFT", name: "Microsoft Corp", price: 420.15, change: 2.91, volume: "18.7M" },
    { ticker: "GOOGL", name: "Alphabet Inc", price: 175.23, change: 2.45, volume: "12.3M" },
    { ticker: "AMZN", name: "Amazon.com Inc", price: 185.67, change: 2.12, volume: "15.8M" },
  ],
  losers: [
    { ticker: "META", name: "Meta Platforms Inc", price: 480.03, change: -3.45, volume: "15.3M" },
    { ticker: "TSLA", name: "Tesla Inc", price: 170.85, change: -2.56, volume: "30.7M" },
    { ticker: "JPM", name: "JPMorgan Chase & Co", price: 193.74, change: -1.87, volume: "8.2M" },
    { ticker: "V", name: "Visa Inc", price: 273.61, change: -1.42, volume: "5.9M" },
    { ticker: "DIS", name: "Walt Disney Co", price: 113.45, change: -1.23, volume: "10.1M" },
  ],
  mostActive: [
    { ticker: "AAPL", name: "Apple Inc", price: 198.45, change: 3.78, volume: "45.2M" },
    { ticker: "TSLA", name: "Tesla Inc", price: 170.85, change: -2.56, volume: "30.7M" },
    { ticker: "NVDA", name: "NVIDIA Corp", price: 950.02, change: 5.23, volume: "23.5M" },
    { ticker: "AMD", name: "Advanced Micro Devices", price: 162.75, change: 1.85, volume: "20.9M" },
    { ticker: "F", name: "Ford Motor Co", price: 12.47, change: -0.56, volume: "19.8M" },
  ],
  stats: {
    gainers_count: 275,
    losers_count: 225,
    average_gain: 1.75,
    average_loss: -1.5,
    average_volume: 8500000
  }
};

export default function MarketMovers() {
  const [activeTab, setActiveTab] = useState("gainers")
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  // Fetch data from the API
  const { data: equityData, loading, error } = useEquitySpotlight();
  
  // Generate market summary based on available data
  let marketStats;
  let marketMoversSummary;
  
  if (error || !equityData) {
    marketStats = FALLBACK_STOCKS.stats;
    marketMoversSummary = `Today's market shows ${marketStats.gainers_count} gainers and ${marketStats.losers_count} losers. Average gain is ${marketStats.average_gain.toFixed(2)}% and average loss is ${marketStats.average_loss.toFixed(2)}%. Trading volume is moderate.`;
  } else {
    marketStats = equityData.market_stats;
    marketMoversSummary = `Today's market shows ${marketStats.gainers_count} gainers and ${marketStats.losers_count} losers. Average gain is ${marketStats.average_gain.toFixed(2)}% and average loss is ${marketStats.average_loss.toFixed(2)}%. Trading volume is high with an average of ${(marketStats.average_volume / 1000000).toFixed(2)}M shares.`;
  }

  // Use API data or fallback data
  const gainers = error || !equityData ? FALLBACK_STOCKS.gainers : equityData.top_gainers;
  const losers = error || !equityData ? FALLBACK_STOCKS.losers : equityData.top_losers;
  const mostActive = error || !equityData ? FALLBACK_STOCKS.mostActive : equityData.most_active;

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
          <div className="p-4 flex items-center justify-center gap-2 text-amber-500 bg-amber-50 border-b border-amber-100">
            <AlertCircle size={16} />
            <span>Using sample data due to connection issues</span>
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

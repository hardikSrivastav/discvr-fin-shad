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

export default function CryptoMarketMovers() {
  const [activeTab, setActiveTab] = useState("gainers")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const cryptoSummary =
    "The cryptocurrency market is showing significant volatility today. Bitcoin has stabilized above $60,000 while several altcoins are posting double-digit gains. Layer-2 solutions and AI-related tokens are outperforming the broader market, while some DeFi tokens are experiencing selling pressure."

  // Sample data
  const gainers = [
    { ticker: "SOL", name: "Solana", price: 165.78, change: 12.45, volume: "3.2B" },
    { ticker: "AVAX", name: "Avalanche", price: 38.92, change: 9.87, volume: "1.5B" },
    { ticker: "NEAR", name: "NEAR Protocol", price: 7.23, change: 8.56, volume: "850M" },
    { ticker: "ARB", name: "Arbitrum", price: 1.85, change: 7.34, volume: "780M" },
    { ticker: "INJ", name: "Injective", price: 32.45, change: 6.78, volume: "650M" },
  ]

  const losers = [
    { ticker: "AAVE", name: "Aave", price: 105.67, change: -8.23, volume: "420M" },
    { ticker: "UNI", name: "Uniswap", price: 8.92, change: -6.54, volume: "380M" },
    { ticker: "COMP", name: "Compound", price: 58.34, change: -5.67, volume: "290M" },
    { ticker: "CRV", name: "Curve DAO", price: 0.56, change: -4.89, volume: "210M" },
    { ticker: "MKR", name: "Maker", price: 1890.45, change: -3.76, volume: "180M" },
  ]

  const mostActive = [
    { ticker: "BTC", name: "Bitcoin", price: 62345.67, change: 1.23, volume: "25.8B" },
    { ticker: "ETH", name: "Ethereum", price: 3456.78, change: 2.45, volume: "15.3B" },
    { ticker: "XRP", name: "XRP", price: 0.58, change: -0.87, volume: "4.2B" },
    { ticker: "DOGE", name: "Dogecoin", price: 0.12, change: 5.67, volume: "3.8B" },
    { ticker: "ADA", name: "Cardano", price: 0.45, change: -1.23, volume: "2.9B" },
  ]

  return (
    <Card className="bg-neutral-50 border border-neutral-200">
      <CardHeader className="bg-neutral-100 border-b border-neutral-200">
        <CardTitle className="text-gray-900">Crypto Market Movers</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isDesktop ? (
          <ResizablePanelGroup direction="horizontal" className="min-h-[400px]">
            <ResizablePanel defaultSize={70}>
              <div className="p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-neutral-100">
                    <TabsTrigger value="gainers" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      Top Gainers (24h)
                    </TabsTrigger>
                    <TabsTrigger value="losers" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      Top Losers (24h)
                    </TabsTrigger>
                    <TabsTrigger value="active" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                      Most Active (24h)
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Crypto Market Summary</h3>
                  <p className="text-gray-700">{cryptoSummary}</p>
                </div>
                <div className="mt-6">
                  <div className="relative">
                    <Input placeholder="Ask about crypto..." className="pr-20 bg-neutral-50 border-neutral-300" />
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
              <CardTitle className="text-sm mb-2">AI Crypto Market Summary</CardTitle>
              <p className="text-sm">{cryptoSummary}</p>
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

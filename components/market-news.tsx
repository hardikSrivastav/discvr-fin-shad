"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { NewsCard } from "@/components/news-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

export default function MarketNews() {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const newsSummary =
    "Today's financial news is dominated by Federal Reserve policy discussions, tech earnings reports, and ongoing concerns about inflation. Several major tech companies have announced strong quarterly results, while retail stocks are under pressure following weaker consumer spending data."

  // Sample news data
  const newsItems = [
    {
      id: 1,
      headline: "Fed Signals Potential Rate Cut in September Meeting",
      source: "Financial Times",
      timestamp: "2 hours ago",
      summary:
        "Federal Reserve officials have indicated they may consider cutting interest rates at their September meeting if inflation continues to moderate.",
    },
    {
      id: 2,
      headline: "Apple Reports Record Q2 Revenue, Boosts Dividend",
      source: "Wall Street Journal",
      timestamp: "4 hours ago",
      summary:
        "Apple Inc. reported better-than-expected quarterly results and announced a 5% increase in its dividend, signaling confidence in future performance.",
    },
    {
      id: 3,
      headline: "Oil Prices Fall on Increased Supply Concerns",
      source: "Bloomberg",
      timestamp: "6 hours ago",
      summary:
        "Crude oil prices dropped more than 2% today as OPEC+ members consider increasing production quotas amid weakening global demand forecasts.",
    },
    {
      id: 4,
      headline: "Retail Sales Data Shows Unexpected Decline in April",
      source: "CNBC",
      timestamp: "8 hours ago",
      summary:
        "U.S. retail sales fell 0.3% in April, surprising economists who had forecast a modest increase, raising concerns about consumer spending strength.",
    },
    {
      id: 5,
      headline: "Tech Layoffs Continue as Industry Giants Restructure",
      source: "Reuters",
      timestamp: "10 hours ago",
      summary:
        "Several major technology companies announced new rounds of layoffs this week as part of ongoing restructuring efforts to reduce costs and improve profitability.",
    },
  ]

  return (
    <Card className="bg-neutral-50 border border-neutral-200">
      <CardHeader className="bg-neutral-100 border-b border-neutral-200">
        <CardTitle className="text-gray-900">Market News</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isDesktop ? (
          <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
            <ResizablePanel defaultSize={70}>
              <div className="p-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {newsItems.map((item) => (
                      <NewsCard key={item.id} item={item} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>
            <ResizableHandle className="bg-neutral-200" />
            <ResizablePanel defaultSize={30}>
              <div className="p-4 h-full">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI News Summary</h3>
                  <p className="text-gray-700">{newsSummary}</p>
                </div>
                <div className="mt-6">
                  <div className="relative">
                    <Input placeholder="Ask about news..." className="pr-20 bg-neutral-50 border-neutral-300" />
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
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {newsItems.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            <Card className="p-4">
              <CardTitle className="text-sm mb-2">AI News Summary</CardTitle>
              <p className="text-sm">{newsSummary}</p>
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

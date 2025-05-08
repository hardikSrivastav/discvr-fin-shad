import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarketOverview from "@/components/market-overview"
import MarketMovers from "@/components/market-movers"
import LatestResults from "@/components/latest-results"
import MarketNews from "@/components/market-news"
import CryptoMarketMovers from "@/components/crypto-market-movers"
import CryptoNews from "@/components/crypto-news"
import "@/lib/init-api" // Import for side effects only

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 space-y-6 bg-neutral-50">
      <h1 className="text-3xl font-bold text-gray-900">Finance & Crypto Dashboard</h1>

      <Tabs defaultValue="finance" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-neutral-100">
          <TabsTrigger value="finance" className="data-[state=active]:bg-teal data-[state=active]:text-white">
            Finance
          </TabsTrigger>
          <TabsTrigger value="crypto" className="data-[state=active]:bg-teal data-[state=active]:text-white">
            Cryptocurrency
          </TabsTrigger>
        </TabsList>

        <TabsContent value="finance" className="space-y-6">
          <MarketOverview />
          <MarketMovers />
          <LatestResults />
          <MarketNews />
        </TabsContent>

        <TabsContent value="crypto" className="space-y-6">
          <CryptoMarketMovers />
          <CryptoNews />
        </TabsContent>
      </Tabs>
    </div>
  )
}

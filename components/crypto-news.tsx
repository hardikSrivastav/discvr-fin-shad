"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsCard } from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import { useCryptoNews } from "@/hooks/use-finance-api"
import "@/lib/init-api" // Import for side effects only

// Fallback news data for when the API fails
const FALLBACK_NEWS = [
  {
    title: "Bitcoin Surges Past $60,000 as Institutional Interest Grows",
    text: "Bitcoin has surpassed the $60,000 mark for the first time in months, as large institutional investors continue to enter the cryptocurrency market.",
    source: "CryptoDaily",
    url: "#",
    publication_date: new Date().toISOString()
  },
  {
    title: "Ethereum ETFs Could Be Next After Bitcoin's Success",
    text: "Following the successful launch of multiple Bitcoin ETFs, industry experts are now turning their attention to the possibility of Ethereum ETFs being approved next.",
    source: "CoinNews",
    url: "#",
    publication_date: new Date().toISOString()
  },
  {
    title: "Ripple CEO: 'Crypto Regulation Clarity Coming Soon'",
    text: "The CEO of Ripple has expressed optimism that regulatory clarity for cryptocurrencies is on the horizon, following meetings with policymakers.",
    source: "BlockchainInsider",
    url: "#",
    publication_date: new Date().toISOString()
  },
  {
    title: "NFT Market Shows Signs of Recovery After Slump",
    text: "The NFT market is showing signs of a comeback, with trading volumes up 20% in the past month after a prolonged downturn.",
    source: "NFTWorld",
    url: "#",
    publication_date: new Date().toISOString()
  },
  {
    title: "Major Bank Launches Cryptocurrency Custody Service",
    text: "A leading global bank has announced the launch of a cryptocurrency custody service, allowing institutional clients to securely store their digital assets.",
    source: "FinanceCrypto",
    url: "#",
    publication_date: new Date().toISOString()
  }
];

export default function CryptoNews() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Fetch crypto news from the API
  const { data: cryptoNewsData, loading, error } = useCryptoNews(20);
  
  // Use API data or fallback data
  const cryptoNews = error || !cryptoNewsData ? FALLBACK_NEWS : cryptoNewsData;
  
  // Filter news based on search query
  const filteredNews = searchQuery
    ? cryptoNews.filter(news => 
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        news.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cryptoNews

  const handleSearch = (e: any) => {
    e.preventDefault()
    // In a real implementation, this might trigger an API call with the search query
  }

  return (
    <Card className="bg-neutral-50 border border-neutral-200">
      <CardHeader className="bg-neutral-100 border-b border-neutral-200 flex flex-row items-center justify-between">
        <CardTitle className="text-gray-900">Crypto News</CardTitle>
        <form onSubmit={handleSearch} className="flex w-full max-w-xs">
          <Input
            placeholder="Search crypto news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-r-none border-r-0"
          />
          <Button type="submit" className="rounded-l-none bg-teal hover:bg-teal-dark">
            Search
          </Button>
        </form>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        {loading && (
          <div className="text-center text-gray-500 py-4">Loading crypto news...</div>
        )}
        {error && (
          <div className="p-4 flex items-center justify-center gap-2 text-amber-500 bg-amber-50 border-b border-amber-100 rounded-sm mb-2">
            <AlertCircle size={16} />
            <span>Using sample data due to connection issues</span>
          </div>
        )}
        {filteredNews.length > 0 ? (
          filteredNews.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              content={news.text}
              source={news.source}
              date={new Date(news.publication_date)}
              url={news.url}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">No news found matching your search.</div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsCard } from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { setApiUrl } from "@/lib/api"
import { useCryptoNews } from "@/hooks/use-finance-api"

// Initialize API URL
if (typeof window !== 'undefined') {
  setApiUrl('https://api.example.com');
}

export default function CryptoNews() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Fetch crypto news from the API
  const { data: cryptoNewsData, loading, error } = useCryptoNews(20);
  
  // Fallback data in case API fails
  const fallbackNews = [
    {
      title: "Bitcoin Surges Past $60,000 as Institutional Interest Grows",
      text: "Bitcoin has surpassed the $60,000 mark for the first time in months, as large institutional investors continue to enter the cryptocurrency market.",
      source: "CryptoDaily",
      url: "#",
      publication_date: "2024-06-10T09:30:00Z"
    },
    {
      title: "Ethereum ETFs Could Be Next After Bitcoin's Success",
      text: "Following the successful launch of multiple Bitcoin ETFs, industry experts are now turning their attention to the possibility of Ethereum ETFs being approved next.",
      source: "CoinNews",
      url: "#",
      publication_date: "2024-06-09T14:45:00Z"
    },
    {
      title: "Ripple CEO: 'Crypto Regulation Clarity Coming Soon'",
      text: "The CEO of Ripple has expressed optimism that regulatory clarity for cryptocurrencies is on the horizon, following meetings with policymakers.",
      source: "BlockchainInsider",
      url: "#",
      publication_date: "2024-06-08T12:15:00Z"
    },
    {
      title: "NFT Market Shows Signs of Recovery After Slump",
      text: "The NFT market is showing signs of a comeback, with trading volumes up 20% in the past month after a prolonged downturn.",
      source: "NFTWorld",
      url: "#",
      publication_date: "2024-06-07T11:00:00Z"
    },
    {
      title: "Major Bank Launches Cryptocurrency Custody Service",
      text: "A leading global bank has announced the launch of a cryptocurrency custody service, allowing institutional clients to securely store their digital assets.",
      source: "FinanceCrypto",
      url: "#",
      publication_date: "2024-06-06T10:20:00Z"
    },
  ]
  
  // Use API data or fallback data
  const cryptoNews = cryptoNewsData || fallbackNews;
  
  // Filter news based on search query
  const filteredNews = searchQuery
    ? cryptoNews.filter(news => 
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        news.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cryptoNews

  const handleSearch = (e: React.FormEvent) => {
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
          <div className="text-center text-red-500 py-4">
            Error loading news. Using fallback data.
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

"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { setApiUrl } from "@/lib/api"
import { useEarningsResults } from "@/hooks/use-finance-api"

// Initialize API URL
if (typeof window !== 'undefined') {
  setApiUrl('https://api.example.com');
}

export default function LatestResults() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Fetch earnings results from the API
  const { data: earningsData, loading, error } = useEarningsResults(undefined, undefined, undefined, 20);
  
  // Format the API data to match the UI structure or use fallback data
  const earningsResults = earningsData || [
    {
      symbol: "AAPL",
      date: "2024-05-02",
      eps: 1.52,
      estimated_eps: 1.43,
      revenue: 94800000000,
      estimated_revenue: 92500000000,
      name: "Apple Inc."
    },
    {
      symbol: "MSFT",
      date: "2024-05-01",
      eps: 2.94,
      estimated_eps: 2.82,
      revenue: 61900000000,
      estimated_revenue: 60800000000,
      name: "Microsoft Corp."
    },
    {
      symbol: "AMZN",
      date: "2024-04-30",
      eps: 0.98,
      estimated_eps: 0.83,
      revenue: 143300000000,
      estimated_revenue: 142100000000,
      name: "Amazon.com Inc."
    },
    {
      symbol: "META",
      date: "2024-04-29",
      eps: 4.71,
      estimated_eps: 4.32,
      revenue: 36500000000,
      estimated_revenue: 35800000000,
      name: "Meta Platforms Inc."
    },
    {
      symbol: "GOOGL",
      date: "2024-04-28",
      eps: 1.89,
      estimated_eps: 1.76,
      revenue: 80500000000,
      estimated_revenue: 78900000000,
      name: "Alphabet Inc."
    },
  ];
  
  // Process earnings data for display
  const processedResults = earningsResults.map(result => {
    // Calculate surprise percentage based on EPS
    const epsSurprise = ((result.eps - result.estimated_eps) / result.estimated_eps) * 100;
    
    return {
      ...result,
      surprise: `${epsSurprise >= 0 ? '+' : ''}${epsSurprise.toFixed(1)}%`
    };
  });
  
  // Format date to human-readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
  // Filter results based on search query
  const filteredResults = searchQuery
    ? processedResults.filter(result => 
        result.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (result.name && result.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : processedResults;
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this might trigger an API call with the search query
  }

  return (
    <Card className="bg-neutral-50 border border-neutral-200">
      <CardHeader className="bg-neutral-100 border-b border-neutral-200 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-gray-900">Latest Earnings Results</CardTitle>
          <Calendar className="h-4 w-4 text-gray-500" />
        </div>
        <form onSubmit={handleSearch} className="flex w-full max-w-xs">
          <Input
            placeholder="Search by symbol or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-r-none border-r-0"
          />
          <Button type="submit" className="rounded-l-none bg-teal hover:bg-teal-dark">
            Search
          </Button>
        </form>
      </CardHeader>
      <CardContent className="p-0">
        {loading && (
          <div className="p-4 text-center text-gray-500">Loading earnings data...</div>
        )}
        {error && (
          <div className="p-4 text-center text-red-500">
            Error loading earnings data. Using fallback data.
          </div>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Symbol</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Report Date</TableHead>
                <TableHead className="text-right">EPS</TableHead>
                <TableHead className="text-right">Est. EPS</TableHead>
                <TableHead className="text-right">Revenue ($B)</TableHead>
                <TableHead className="text-right">Est. Revenue ($B)</TableHead>
                <TableHead className="text-right">Surprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <TableRow key={result.symbol} className="hover:bg-neutral-100">
                    <TableCell className="font-medium">{result.symbol}</TableCell>
                    <TableCell>{result.name || ''}</TableCell>
                    <TableCell className="text-right">{formatDate(result.date)}</TableCell>
                    <TableCell className="text-right">${result.eps.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${result.estimated_eps.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(result.revenue / 1000000000).toFixed(2)}B</TableCell>
                    <TableCell className="text-right">${(result.estimated_revenue / 1000000000).toFixed(2)}B</TableCell>
                    <TableCell className={`text-right ${result.surprise.startsWith('+') ? 'text-teal-dark' : 'text-red-500'}`}>
                      {result.surprise}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 h-36">
                    No results found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

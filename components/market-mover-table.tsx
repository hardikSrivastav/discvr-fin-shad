import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MarketMover {
  ticker: string
  name: string
  price: number
  change: number
  volume: string
}

interface MarketMoverTableProps {
  data: MarketMover[]
}

export function MarketMoverTable({ data }: MarketMoverTableProps) {
  return (
    <Table>
      <TableHeader className="bg-neutral-100">
        <TableRow>
          <TableHead>Ticker</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Change (%)</TableHead>
          <TableHead className="text-right">Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.ticker} className="border-b border-neutral-200">
            <TableCell className="font-medium text-gray-900">{item.ticker}</TableCell>
            <TableCell className="text-gray-700">{item.name}</TableCell>
            <TableCell className="text-right text-gray-900">${item.price.toFixed(2)}</TableCell>
            <TableCell className={`text-right ${item.change >= 0 ? "text-teal-dark" : "text-red-500"}`}>
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)}%
            </TableCell>
            <TableCell className="text-right text-gray-700">{item.volume}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

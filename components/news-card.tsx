import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

export interface NewsCardProps {
  title: string
  content: string
  source: string
  date: Date
  url?: string
}

export function NewsCard({ title, content, source, date, url }: NewsCardProps) {
  const formattedTime = formatDistanceToNow(date, { addSuffix: true })
  
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  }
  
  return (
    <Card 
      className={`bg-neutral-50 border border-neutral-200 hover:shadow-md transition-shadow ${url ? 'cursor-pointer' : ''}`}
      onClick={url ? handleClick : undefined}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-gray-900">{title}</CardTitle>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium">{source}</span>
          <span className="mx-2">•</span>
          <span>{formattedTime}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{content}</p>
      </CardContent>
    </Card>
  )
}

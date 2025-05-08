import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { isValid } from "date-fns"
import { formatDate } from "@/lib/utils"

export interface NewsCardProps {
  title: string
  content: string
  source: string
  date: Date
  url?: string
}

export function NewsCard({ title, content, source, date, url }: NewsCardProps) {
  // Safely format the date, handling potential invalid dates
  let formattedTime = "Recently";
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isValid(dateObj)) {
      formattedTime = formatDate(dateObj);
    }
  } catch (error) {
    console.error("Error formatting date:", error);
  }
  
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

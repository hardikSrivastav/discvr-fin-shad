

\# Financial Data API Documentation

\#\# Base URL  
\`\`\`  
/finance  
\`\`\`

\#\# Authentication  
Currently, the API does not require authentication.

\#\# Response Format  
All responses are in JSON format. Successful responses will have a 200 status code.

\#\# Error Handling  
In case of errors, the API returns:  
\- HTTP 500 for server errors  
\- HTTP 400 for bad requests  
\- Detailed error message in the response body

\#\# Rate Limiting  
Default cache TTL: 300 seconds (5 minutes)

\#\# Available Endpoints

\#\#\# 1\. Equity Spotlight  
\`\`\`http  
GET /finance/equity-spotlight  
\`\`\`  
Get comprehensive market data including top gainers, losers, and market statistics.

\*\*Response:\*\*  
\`\`\`json  
{  
    "top\_gainers": \[...\],  
    "top\_losers": \[...\],  
    "most\_active": \[...\],  
    "market\_stats": {  
        "total\_stocks": 100,  
        "gainers\_count": 50,  
        "losers\_count": 50,  
        "active\_count": 20,  
        "average\_gain": 2.5,  
        "average\_loss": \-1.8,  
        "max\_gain": 5.2,  
        "max\_loss": \-3.4,  
        "average\_volume": 1000000,  
        "max\_volume": 5000000,  
        "advance\_decline\_ratio": 1.2,  
        "top\_performing\_sectors": \[...\]  
    },  
    "last\_updated": "2024-01-20T10:30:00Z"  
}  
\`\`\`

\#\#\# 2\. Stock News  
\`\`\`http  
GET /finance/stock-news  
\`\`\`  
Get news articles for specific stocks or top 20 NASDAQ stocks.

\*\*Parameters:\*\*  
\- \`symbol\` (optional): Stock symbol (e.g., "AAPL")  
\- \`limit\` (optional): Maximum number of news items (default: 20\)

\*\*Response:\*\*  
\`\`\`json  
\[  
    {  
        "title": "...",  
        "text": "...",  
        "url": "...",  
        "publication\_date": "2024-01-20T10:30:00Z",  
        "source": "..."  
    }  
\]  
\`\`\`

\#\#\# 3\. Press Releases  
\`\`\`http  
GET /finance/press-releases  
\`\`\`  
Get company press releases for specific stocks or top 20 NASDAQ stocks.

\*\*Parameters:\*\*  
\- \`symbol\` (optional): Stock symbol  
\- \`limit\` (optional): Maximum number of releases (default: 10\)

\*\*Response:\*\*  
\`\`\`json  
\[  
    {  
        "title": "...",  
        "content": "...",  
        "date": "2024-01-20T10:30:00Z",  
        "url": "..."  
    }  
\]  
\`\`\`

\#\#\# 4\. Earnings Results  
\`\`\`http  
GET /finance/earnings-results  
\`\`\`  
Get earnings calendar and results for companies.

\*\*Parameters:\*\*  
\- \`symbol\` (optional): Stock symbol  
\- \`from\_date\` (optional): Start date (YYYY-MM-DD)  
\- \`to\_date\` (optional): End date (YYYY-MM-DD)  
\- \`limit\` (optional): Maximum number of results (default: 100\)

\*\*Response:\*\*  
\`\`\`json  
\[  
    {  
        "symbol": "AAPL",  
        "date": "2024-01-20",  
        "eps": 2.5,  
        "estimated\_eps": 2.3,  
        "revenue": 90000000000,  
        "estimated\_revenue": 88000000000  
    }  
\]  
\`\`\`

\#\#\# 5\. Crypto News  
\`\`\`http  
GET /finance/crypto-news  
\`\`\`  
Get cryptocurrency news and updates.

\*\*Parameters:\*\*  
\- \`limit\` (optional): Maximum number of news items (default: 20\)

\*\*Response:\*\*  
\`\`\`json  
\[  
    {  
        "title": "...",  
        "text": "...",  
        "url": "...",  
        "publication\_date": "2024-01-20T10:30:00Z",  
        "source": "..."  
    }  
\]  
\`\`\`

\#\#\# 6\. News Dashboard  
\`\`\`http  
GET /finance/news-dashboard  
\`\`\`  
Get comprehensive news dashboard including multiple categories.

\*\*Parameters:\*\*  
\- \`symbol\` (optional): Stock symbol for stock-specific news  
\- \`limit\` (optional): Maximum news items per category (default: 20\)

\*\*Response:\*\*  
\`\`\`json  
{  
    "general\_news": \[...\],  
    "stock\_news": \[...\],  
    "crypto\_news": \[...\],  
    "press\_releases": \[...\]  
}  
\`\`\`

\#\#\# 7\. Market Indices  
\`\`\`http  
GET /finance/market-indices  
\`\`\`  
Get data for major market indices.

\*\*Parameters:\*\*  
\- \`limit\` (optional): Maximum number of indices (default: 20\)

\*\*Response:\*\*  
\`\`\`json  
\[  
    {  
        "name": "S\&P 500",  
        "symbol": "^GSPC",  
        "price": 4500.21,  
        "change": 12.5,  
        "change\_percent": 0.28,  
        "volume": 2500000000  
    }  
\]  
\`\`\`

\#\# Default Data Set  
When no symbol is provided, the API uses the top 20 NASDAQ stocks from the following list:  
\`\`\`python  
\[  
    "AAPL",  *\# Apple Inc.*  
    "MSFT",  *\# Microsoft Corporation*  
    "AMZN",  *\# Amazon.com Inc.*  
    "GOOGL", *\# Alphabet Inc. Class A*  
    "META",  *\# Meta Platforms, Inc.*  
    "NVDA",  *\# NVIDIA Corporation*  
    "TSLA",  *\# Tesla, Inc.*  
    *\# ... (remaining top 20\)*  
\]  
\`\`\`

\#\# Caching  
\- All responses are cached using Redis  
\- Default cache duration: 5 minutes  
\- Cache keys follow the pattern: \`investment\_radar:{endpoint}:{parameters}\`

\#\# Error Response Format  
\`\`\`json  
{  
    "detail": "Error message describing what went wrong"  
}  
\`\`\`

\#\# Rate Limiting  
\- No explicit rate limiting implemented  
\- Caching helps manage server load  
\- Consider implementing rate limiting for production use

\#\# Best Practices  
1\. Use the \`limit\` parameter to control response size  
2\. Utilize caching by reusing requests within cache TTL  
3\. Handle errors gracefully in your client application  
4\. For time-sensitive data, consider the \`last\_updated\` field

\#\# Changelog  
\- 2024-01-20: Initial API documentation  
\- Added support for top 20 NASDAQ stocks composite payload  
\- Added crypto news and market indices endpoints  

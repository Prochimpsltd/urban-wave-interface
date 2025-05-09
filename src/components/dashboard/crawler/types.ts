
export interface CrawlForm {
  url: string;
  crawlDepth: string;
  requestTimeout: string;
  outputFormat: string;
  urlFilter: string;
  extractContent: boolean;
  followExternalLinks: boolean;
  stealthMode: boolean;
}

export interface CrawledUrl {
  url: string;
  status: 'crawling' | 'completed' | 'error';
  contentPreview: string;
}

export type WebCrawlerStep = 'crawler' | 'setup' | 'preview';

export interface ChatHistoryItem {
  id: string;
  botName: string;
  timestamp: string;
  lastMessage: string;
  sentimentScore: number;
  serialNumber: string;
  conversation: Array<{
    isBot: boolean;
    message: string;
    timestamp: string;
  }>;
}

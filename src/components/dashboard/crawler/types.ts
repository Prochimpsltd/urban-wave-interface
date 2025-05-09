
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

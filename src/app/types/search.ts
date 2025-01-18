export interface SearchOptions {
  language?: string;
  filters?: {
    jurisdiction?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
    docType?: string[];
    principles?: string[];
  };
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  content: string;
  score: number;
  metadata: Record<string, any>;
  relationships?: {
    citations: Array<{ id: string; title: string }>;
    principles: Array<{ id: string; name: string }>;
  };
} 
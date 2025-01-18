export interface Document {
  pageContent: string;
  metadata: {
    id: string;
    source?: string;
    title?: string;
    author?: string;
    date?: string;
    jurisdiction?: string;
    citations?: string[];
    principles?: string[];
    [key: string]: any;
  };
}

export interface ProcessedDocument extends Document {
  embedding?: number[];
  relationships?: {
    cites?: string[];
    citedBy?: string[];
    relatedPrinciples?: string[];
  };
} 
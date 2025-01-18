import { Document } from 'langchain/document';
import { CohereEmbeddings } from '@langchain/cohere';
import { RecursiveCharacterTextSplitter } from '@langchain/text-splitters';
import { CohereService } from '../cohere';

export class LlamaIndexService {
  private embeddings: CohereEmbeddings;
  private splitter: RecursiveCharacterTextSplitter;
  private cohereService: CohereService;
  
  constructor() {
    this.embeddings = new CohereEmbeddings({
      apiKey: process.env.COHERE_API_KEY,
      model: process.env.COHERE_EMBED_MODEL,
      inputType: "search_document"
    });

    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 512,
      chunkOverlap: 50
    });

    this.cohereService = new CohereService();
  }

  async processDocuments(documents: Document[], language?: string) {
    const splits = await this.splitter.splitDocuments(documents);
    
    // If language is specified and different from English, translate
    if (language && language !== 'en') {
      for (const split of splits) {
        split.pageContent = await this.cohereService.translateQuery(
          split.pageContent, 
          'English'
        );
      }
    }

    const embeddings = await this.embeddings.embedDocuments(
      splits.map(doc => doc.pageContent)
    );

    return {
      documents: splits,
      embeddings
    };
  }
} 
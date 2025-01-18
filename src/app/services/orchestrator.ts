import { Document } from 'langchain/document';
import { QdrantService } from './storage/qdrant';
import { Neo4jService } from './storage/neo4j';
import { LlamaIndexService } from './processing/llama-index';
import { SearchService } from './search';
import { CohereService } from './cohere';

export class Orchestrator {
  private searchService: SearchService;

  constructor(
    private qdrant: QdrantService,
    private neo4j: Neo4jService,
    private llamaIndex: LlamaIndexService,
    private cohere: CohereService
  ) {
    this.searchService = new SearchService(cohere, qdrant, neo4j);
  }

  async processAndStore(dirPath: string, language?: string) {
    try {
      const processedDocs = await this.llamaIndex.processDocuments(
        await this.docProcessor.processDirectory(dirPath),
        language
      );

      // Store in vector database
      await this.qdrant.createCollection('legal_documents');
      await this.qdrant.upsertVectors('legal_documents', 
        processedDocs.documents.map((doc, i) => ({
          id: doc.metadata.id,
          values: processedDocs.embeddings[i],
          metadata: doc.metadata
        }))
      );

      return { success: true, count: processedDocs.documents.length };
    } catch (error) {
      console.error('Error in orchestration:', error);
      return { 
        success: false, 
        count: 0, 
        errors: [error as Error] 
      };
    }
  }

  async search(query: string, language?: string) {
    return this.searchService.search(query, language);
  }
} 
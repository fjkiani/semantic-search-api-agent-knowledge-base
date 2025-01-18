import { CohereService } from '../cohere';
import { QdrantService } from '../storage/qdrant';
import { Neo4jService } from '../storage/neo4j';

interface SearchResult {
  content: string;
  score: number;
  metadata: Record<string, any>;
}

export class SearchService {
  constructor(
    private cohere: CohereService,
    private qdrant: QdrantService,
    private neo4j: Neo4jService
  ) {}

  async search(query: string, language?: string) {
    // 1. Translate query if needed
    let searchQuery = query;
    if (language && language !== 'en') {
      searchQuery = await this.cohere.translateQuery(query, 'English');
    }

    // 2. Decompose query into subqueries
    const subQueries = await this.cohere.decomposeQuery(searchQuery);
    
    // Categorize queries by type
    const queryTypes = await Promise.all(
      subQueries.map(async q => ({
        query: q,
        type: await this.categorizeQuery(q)
      }))
    );

    // Execute appropriate searches based on query type
    const results = await Promise.all(
      queryTypes.map(async ({ query, type }) => {
        switch (type) {
          case 'CASE_SEARCH':
            return this.qdrant.search('legal_documents', query);
          case 'PRINCIPLE_EVOLUTION':
            return this.neo4j.findLegalPrincipleEvolution(query);
          case 'RELATED_CASES':
            return this.neo4j.findRelatedCases(query);
          default:
            return this.performHybridSearch(query);
        }
      })
    );

    // 4. Combine and rerank results
    const flatResults = results.flat();
    const documents = flatResults.map(r => r.content);
    
    const reranked = await this.cohere.rerankResults(searchQuery, documents);

    // 5. Format and return results
    return reranked.map(result => ({
      content: result.document,
      score: result.relevanceScore,
      metadata: flatResults.find(r => r.content === result.document)?.metadata
    }));
  }

  private async categorizeQuery(query: string): Promise<string> {
    const response = await this.cohere.command({
      prompt: `Categorize this legal query:\n${query}\nCategories: CASE_SEARCH, PRINCIPLE_EVOLUTION, RELATED_CASES, GENERAL`,
      model: process.env.COHERE_COMMAND_MODEL,
      temperature: 0.1,
    });

    return response.generations[0].text.trim();
  }

  private async performHybridSearch(query: string) {
    const [vectorResults, graphResults] = await Promise.all([
      this.qdrant.search('legal_documents', query),
      this.neo4j.search(query)
    ]);

    return [...vectorResults, ...graphResults];
  }
} 
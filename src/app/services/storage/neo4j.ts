import neo4j, { Driver, Session, Transaction } from 'neo4j-driver';
import { CypherQueryGenerator } from '../neo4j/query-generator';
import { CohereService } from '../cohere';

interface SearchOptions {
  limit?: number;
  offset?: number;
  filters?: Record<string, any>;
}

export class Neo4jService {
  private queryGenerator: CypherQueryGenerator;

  constructor(
    private driver: Driver,
    private cohere: CohereService
  ) {
    this.queryGenerator = new CypherQueryGenerator(cohere);
  }

  async search(query: string, options: SearchOptions = {}) {
    const session = this.driver.session();
    try {
      // Generate appropriate Cypher query based on natural language query
      const cypherQuery = await this.queryGenerator.generateQuery(
        this.buildSearchRequest(query, options)
      );

      // Validate the generated query
      const isValid = await this.queryGenerator.validateQuery(cypherQuery);
      if (!isValid) {
        throw new Error('Generated invalid Cypher query');
      }

      // Execute the query
      const result = await session.run(cypherQuery, {
        query,
        ...options.filters
      });

      return this.formatSearchResults(result.records);
    } finally {
      await session.close();
    }
  }

  private buildSearchRequest(query: string, options: SearchOptions): string {
    return `
      Find legal cases and principles where:
      - Search query: "${query}"
      - Limit results to: ${options.limit || 10}
      - Skip first: ${options.offset || 0}
      ${options.filters ? `- Additional filters: ${JSON.stringify(options.filters)}` : ''}
      
      Return matching nodes and their relationships, including:
      - Case details (title, date, jurisdiction)
      - Related principles
      - Citations
      - Judge information
    `;
  }

  async findRelatedCases(caseId: string) {
    const request = `
      Find cases related to case with ID ${caseId}:
      - Cases that cite this case
      - Cases cited by this case
      - Cases sharing similar legal principles
      Order by relevance and date
    `;

    const cypherQuery = await this.queryGenerator.generateQuery(request);
    const session = this.driver.session();
    
    try {
      const result = await session.run(cypherQuery, { caseId });
      return this.formatSearchResults(result.records);
    } finally {
      await session.close();
    }
  }

  async findLegalPrincipleEvolution(principleId: string) {
    const request = `
      Trace the evolution of legal principle with ID ${principleId}:
      - Original establishing case
      - Subsequent interpretations
      - Modifications over time
      Order chronologically
    `;

    const cypherQuery = await this.queryGenerator.generateQuery(request);
    const session = this.driver.session();
    
    try {
      const result = await session.run(cypherQuery, { principleId });
      return this.formatSearchResults(result.records);
    } finally {
      await session.close();
    }
  }

  private formatSearchResults(records: neo4j.Record[]) {
    return records.map(record => ({
      nodes: record.keys.map(key => record.get(key)),
      relationships: record.keys
        .filter(key => record.get(key).type)
        .map(key => record.get(key))
    }));
  }
} 
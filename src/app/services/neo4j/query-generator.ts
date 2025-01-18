import { CohereService } from '../cohere';

export class CypherQueryGenerator {
  constructor(private cohere: CohereService) {}

  private readonly CYPHER_PROMPT = `
    As a Cypher query generator for a legal knowledge graph:
    - Nodes can be: Case, Judge, Court, LegalPrinciple, Citation
    - Relationships can be: CITES, OVERTURNS, FOLLOWS, ESTABLISHES
    - Properties include: title, date, jurisdiction, content
    
    Generate a Cypher query for the following request:
  `;

  async generateQuery(request: string): Promise<string> {
    const response = await this.cohere.command({
      prompt: `${this.CYPHER_PROMPT}\n${request}`,
      model: process.env.COHERE_COMMAND_MODEL,
      temperature: 0.2,
      returnLikelihoods: 'GENERATION',
    });

    return response.generations[0].text.trim();
  }

  async validateQuery(query: string): Promise<boolean> {
    const response = await this.cohere.command({
      prompt: `Validate if this Cypher query is safe and well-formed:\n${query}\nRespond with VALID or INVALID with reason.`,
      model: process.env.COHERE_COMMAND_MODEL,
      temperature: 0.1,
    });

    return response.generations[0].text.startsWith('VALID');
  }
} 
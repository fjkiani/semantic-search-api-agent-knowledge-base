import cohere from 'cohere-ai';

export class CohereService {
  constructor() {
    cohere.init(process.env.COHERE_API_KEY!);
  }

  async decomposeQuery(query: string) {
    const response = await cohere.chat({
      message: `Decompose this legal query into subqueries: ${query}`,
      model: process.env.COHERE_COMMAND_MODEL,
      temperature: 0.3,
    });
    
    return response.text.split('\n').filter(q => q.trim());
  }

  async rerankResults(query: string, documents: string[]) {
    const results = await cohere.rerank({
      query,
      documents,
      model: process.env.COHERE_RERANK_MODEL,
      topN: 10,
    });

    return results.results;
  }

  async translateQuery(query: string, targetLanguage: string) {
    const response = await cohere.chat({
      message: `Translate this legal query to ${targetLanguage}: ${query}`,
      model: process.env.COHERE_COMMAND_MODEL,
    });

    return response.text;
  }
} 
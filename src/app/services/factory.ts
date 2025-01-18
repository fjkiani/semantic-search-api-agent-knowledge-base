import { QdrantService } from './storage/qdrant';
import { Neo4jService } from './storage/neo4j';
import { LlamaIndexService } from './processing/llama-index';
import { CohereService } from './services/cohere';
import { Orchestrator } from './orchestrator';

export class ServiceFactory {
  private static instance: ServiceFactory;
  private services: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  getOrchestrator(): Orchestrator {
    if (!this.services.has('orchestrator')) {
      const qdrant = new QdrantService();
      const neo4j = new Neo4jService();
      const llamaIndex = new LlamaIndexService();
      const cohere = new CohereService();

      this.services.set(
        'orchestrator',
        new Orchestrator(qdrant, neo4j, llamaIndex, cohere)
      );
    }
    return this.services.get('orchestrator');
  }
} 
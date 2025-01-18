import { QdrantClient, PointStruct } from '@qdrant/js-client-rest';

interface VectorDocument {
  id: string;
  values: number[];
  metadata: Record<string, any>;
}

export class QdrantService {
  private client: QdrantClient;
  
  constructor() {
    this.client = new QdrantClient({
      url: process.env.QDRANT_URL,
    });
  }

  async createCollection(name: string, dimension: number = 1024) {
    await this.client.createCollection(name, {
      vectors: {
        size: dimension,
        distance: 'Cosine'
      }
    });
  }

  async upsertVectors(collectionName: string, vectors: VectorDocument[]) {
    const points: PointStruct[] = vectors.map(vec => ({
      id: vec.id,
      vector: vec.values,
      payload: vec.metadata
    }));

    return await this.client.upsert(collectionName, {
      wait: true,
      points
    });
  }
} 
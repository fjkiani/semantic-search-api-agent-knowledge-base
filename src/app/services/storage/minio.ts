import { Client } from 'minio';

export class MinioService {
  private client: Client;
  
  constructor() {
    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000'),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY!,
      secretKey: process.env.MINIO_SECRET_KEY!
    });
  }

  async uploadDocument(
    bucketName: string,
    objectName: string,
    buffer: Buffer,
    metadata: any = {}
  ) {
    await this.ensureBucketExists(bucketName);
    return await this.client.putObject(bucketName, objectName, buffer, metadata);
  }

  private async ensureBucketExists(bucketName: string) {
    const exists = await this.client.bucketExists(bucketName);
    if (!exists) {
      await this.client.makeBucket(bucketName);
    }
  }
} 
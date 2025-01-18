import { RecursiveCharacterTextSplitter } from '@langchain/text-splitters';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { v4 as uuidv4 } from 'uuid';

export class DocumentProcessor {
  private splitter: RecursiveCharacterTextSplitter;
  
  constructor() {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 512,
      chunkOverlap: 50
    });
  }

  async processDirectory(dirPath: string) {
    const loader = new DirectoryLoader(dirPath, {
      '.pdf': (path) => new PDFLoader(path)
    });

    const documents = await loader.load();
    const splits = await this.splitter.splitDocuments(documents);

    return splits.map(split => ({
      id: uuidv4(),
      content: split.pageContent,
      metadata: {
        ...split.metadata,
        chunk_id: uuidv4()
      }
    }));
  }
} 
# Semantic Search API with AI Agents & Knowledge Base

## Overview
An advanced semantic search system that combines vector search, graph databases, and AI agents to provide intelligent legal document search and analysis capabilities.

## Architecture

### Core Services
- **Vector Store (Qdrant)**: For semantic similarity search
- **Graph Database (Neo4j)**: For relationship mapping and traversal
- **Object Storage (MinIO)**: For document storage
- **AI Services (Cohere)**: For embeddings, reasoning, and reranking

### Key Components

1. **Orchestrator Service**
   - Coordinates between different services
   - Handles document processing pipeline
   - Manages search operations

2. **Storage Services**
   - `QdrantService`: Vector embeddings storage
   - `Neo4jService`: Knowledge graph management
   - `MinioService`: Document object storage

3. **Processing Services**
   - `LlamaIndexService`: Document indexing
   - `DocumentProcessor`: File handling and extraction

4. **AI Services**
   - `CohereService`: Embeddings & reasoning
   - Research Agent
   - Analysis Agent
   - Review Agent
   - Precedent Agent

## Current Progress

### Completed
- ✅ Basic project structure
- ✅ API routes setup
- ✅ Service factory pattern implementation
- ✅ Error handling middleware
- ✅ Environment configuration
- ✅ Type definitions

### In Progress
- 🔄 Storage service implementations
- 🔄 Processing service implementations
- 🔄 AI service implementations

### Todo
1. **Storage Services**
   - [ ] Implement Qdrant service
   - [ ] Implement Neo4j service
   - [ ] Implement MinIO service

2. **Processing Services**
   - [ ] Implement LlamaIndex service
   - [ ] Implement Document processor
   - [ ] Add OCR capabilities
   - [ ] Add translation service

3. **AI Services**
   - [ ] Complete Cohere service
   - [ ] Implement AI agents
   - [ ] Add reranking logic

4. **Additional Features**
   - [ ] Request validation
   - [ ] Rate limiting
   - [ ] Authentication/Authorization
   - [ ] Logging system
   - [ ] Caching layer

## Setup

### Prerequisites
```bash
# Install dependencies
npm install @qdrant/js-client-rest neo4j-driver minio cohere-ai @langchain/text-splitters @langchain/cohere langchain
```

### Environment Variables
```env
# Core Services
COHERE_API_KEY="your-key"
COHERE_COMMAND_MODEL="command-r"
COHERE_EMBED_MODEL="embed-english-v3.0"
COHERE_RERANK_MODEL="rerank-english-v2.0"

# Storage
QDRANT_URL="http://localhost:6333"
NEO4J_URI="bolt://localhost:7687"
MINIO_ACCESS_KEY="your-key"

# Additional Services
OCR_SERVICE_URL="http://localhost:8080"
TRANSLATION_SERVICE_URL="http://localhost:8081"
```

## API Routes

### Search
```typescript
POST /api/search
{
  "query": "string",
  "language": "string" // optional
}
```

### Ingest
```typescript
POST /api/ingest
{
  "dirPath": "string",
  "language": "string" // optional
}
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
MIT License - see the [LICENSE.md](LICENSE.md) file for details

Use case:
- A law firm wants to search through a large corpus of legal documents to find relevant precedents for a given case.
- A legal researcher wants to search through a large corpus of legal documents to find relevant precedents for a given case.
- A law firm wants to search through a large corpus of legal documents to find relevant precedents for a given case.
- A legal researcher wants to search through a large corpus of legal documents to find relevant precedents for a given case.


2. Legal Knowledge Graph Navigation
// Through Neo4j, we can:
- Track how legal principles evolve over time
- Find relationships between cases
- Identify precedent chains
- Map citation networks

3. Legal Document Search
// Through Qdrant, we can:
- Perform semantic search on the document embeddings
- Find similar documents based on the query
- Retrieve the most relevant documents based on the query

3. Multilingual Support
// Through Cohere, we can:
- Perform multilingual search on the document embeddings
- Find similar documents based on the query
- Retrieve the most relevant documents based on the query

4. Legal Document Search
// Through Qdrant, we can:
- Perform semantic search on the document embeddings
- Find similar documents based on the query
- Retrieve the most relevant documents based on the query
   

4. Document Processing Pipeline
// Through LlamaIndex, we can:
- Perform document processing on the document embeddings
- Find similar documents based on the query
- Retrieve the most relevant documents based on the query
// Handles:
- PDF ingestion
- Document chunking
- Metadata extraction
- Citation parsing
- Legal entity recognition
- Language detection
- Translation
- OCR

5. AI-Powered Analysis
// Through Cohere, we can:
- Perform AI-powered analysis on the document embeddings
- Find similar documents based on the query
- Retrieve the most relevant documents based on the query
// Handles:
- Legal analysis
- Citation analysis
- Argument analysis
- Conclusion analysis
- Rule of law analysis  

import { DataAPIClient, VectorDoc } from "@datastax/astra-db-ts";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

if (!process.env.ASTRA_DB_APPLICATION_TOKEN) {
  throw new Error("Missing ASTRA_DB_APPLICATION_TOKEN environment variable");
}

if (!process.env.ASTRA_DB_API_ENDPOINT) {
  throw new Error("Missing ASTRA_DB_API_ENDPOINT environment variable");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatEmbedding extends VectorDoc {
  text: string;
  timestamp: string;
}

// Initialize the client
const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);

export async function createEmbedding(text: string) {
  const embedding = await openai.embeddings.create({
    input: text,
    model: "text-embedding-3-small",
  });

  return embedding.data[0].embedding;
}

export async function storeDocument(text: string) {
  try {
    const collection = await db.collection<ChatEmbedding>("chat_embeddings");
    const $vector = await createEmbedding(text);

    await collection.insertOne({
      text,
      $vector,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to store document:", error);
    throw error;
  }
}

export async function findSimilarDocuments(query: string, limit = 5) {
  try {
    const collection = await db.collection<ChatEmbedding>("chat_embeddings");
    const vector = await createEmbedding(query);

    const results = await collection.find(
      {},
      {
        sort: {
          $vector: vector,
        },
        limit,
      }
    );

    return results.toArray();
  } catch (error) {
    console.error("Failed to find similar documents:", error);
    throw error;
  }
}

// Initialize collection on startup
(async () => {
  try {
    // Ensure vector search is enabled by creating the collection if it doesn't exist
    await db.createCollection<ChatEmbedding>("chat_embeddings", {
      vector: {
        dimension: 1536,
        metric: "cosine",
      },
      checkExists: true,
    });

    console.log("Collection initialized successfully");
  } catch (error) {
    console.error("Failed to initialize collection:", error);
  }
})();

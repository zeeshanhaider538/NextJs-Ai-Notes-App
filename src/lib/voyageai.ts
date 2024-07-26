// lib/voyage.ts

import axios from "axios";

const apiKey = process.env.VOYAGEAI_API_KEY;
if (!apiKey) {
  throw new Error("VOYAGE_API_KEY is not set");
}

const voyageEndpoint = "https://api.voyageai.com/v1/embeddings";

export async function getEmbedding(text: string) {
  try {
    const response = await axios.post(
      voyageEndpoint,
      {
        input: text,
        model: "voyage-large-2", // Replace with the actual model name
        input_type: "document",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Log the entire response to understand its structure
    console.log("VoyageAI Response:", response.data);

    // Access the embeddings from the response data
    const embeddingArray = response.data.data;

    // Ensure the response format is correct
    if (!Array.isArray(embeddingArray) || embeddingArray.length === 0) {
      throw new Error(
        "Unexpected response format: " + JSON.stringify(response.data),
      );
    }

    const embedding = embeddingArray[0].embedding;

    if (!embedding || !Array.isArray(embedding)) {
      throw new Error("Failed to get embedding from response");
    }

    console.log("Embedding:", embedding);
    return embedding;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get embeddings");
  }
}

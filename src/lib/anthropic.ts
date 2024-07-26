// lib/anthropic.ts

// import { AnthropicClient } from 'anthropic-sdk'; // Replace with actual import
import { Anthropic } from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

const anthropic = new Anthropic({ apiKey });

export async function getEmbedding(text: string) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620", // Replace with the actual model name
      max_tokens: 1024,
      messages: [{ role: "user", content: text }],
    });

    const embedding = response.content;
    if (!embedding) {
      throw new Error("Failed to get embedding");
    }

    console.log(embedding);
    return embedding;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get embedding");
  }
}

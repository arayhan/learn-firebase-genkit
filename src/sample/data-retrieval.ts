import { genkit } from "genkit";

import devLocalVectorstore, {
	devLocalRetrieverRef,
} from "@genkit-ai/dev-local-vectorstore";
import {
	gemini15Flash,
	googleAI,
	textEmbeddingGecko001,
} from "@genkit-ai/googleai";

const ai = genkit({
	plugins: [
		googleAI(),
		devLocalVectorstore([
			{
				indexName: "BobFacts",
				embedder: textEmbeddingGecko001,
			},
		]),
	],
	model: gemini15Flash,
});

// Reference to a local vector database storing Genkit documentation
const retriever = devLocalRetrieverRef("BobFacts");

// Consistent API to retrieve most relevant documents based on semantic similarity to query

const query = "How old is Bob?";

const docs = await ai.retrieve({
	retriever: retriever,
	query,
});

const result = await ai.generate({
	prompt: `Use the provided context from the Genkit documentation to answer this query: ${query}`,
	docs, // Pass retrieved documents to the model
});

console.log(result.text);

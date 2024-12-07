import { genkit, z } from "genkit";

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

// Define the retriever reference
export const menuRetriever = devLocalRetrieverRef("menuQA");

export const menuQAFlow = ai.defineFlow(
	{ name: "menuQA", inputSchema: z.string(), outputSchema: z.string() },
	async (input: string) => {
		// retrieve relevant documents
		const docs = await ai.retrieve({
			retriever: menuRetriever,
			query: input,
			options: { k: 3 },
		});

		// generate a response
		const { text } = await ai.generate({
			prompt: `
You are acting as a helpful AI assistant that can answer 
questions about the food available on the menu at Genkit Grub Pub.

Use only the context provided to answer the question.
If you don't know, do not make up an answer.
Do not add or change items on the menu.

Question: ${input}`,
			docs,
		});

		console.log({ text });
		return text;
	}
);

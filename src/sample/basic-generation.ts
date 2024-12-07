import { genkit } from "genkit";

import { gemini15Flash, googleAI } from "@genkit-ai/googleai";

const ai = genkit({
	plugins: [googleAI()],
	model: gemini15Flash, // Set default model
});

// Simple generation
const { text } = await ai.generate("Why is AI awesome?");
console.log(text);

// console.log("====================================");

// // Streamed generation
// const { stream } = await ai.generateStream("Tell me a story");
// for await (const chunk of stream) {
// 	console.log(chunk.text);
// }

import { genkit } from "genkit";

import { gemini15Flash, googleAI } from "@genkit-ai/googleai";

const ai = genkit({
	plugins: [googleAI()],
	model: gemini15Flash,
	promptDir: "./src/project/prompts/",
});

// ================================
// BY PROMPT
// ================================
const stackRecommendation = ai.prompt("stack-recommendation");
const { text } = await stackRecommendation();
console.log(text);

// ================================
// BY FLOWS
// ================================
// export const stackRecomFlow = ai.defineFlow(
// 	{
// 		name: "stackRecomFlow",
// 	},
// 	async (requirement) => {
// 		console.log({ requirement });
// 		const { text } = await ai.generate({
// 			model: gemini15Flash,
// 			prompt: `Generate Tech Stack Recommendations based on this requirement Client's Project: ${requirement}`,
// 		});
// 		return text;
// 	}
// );

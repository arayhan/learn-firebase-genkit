import { genkit, z } from "genkit";

import { gemini15Flash, googleAI } from "@genkit-ai/googleai";

const ai = genkit({
	plugins: [googleAI()],
	model: gemini15Flash,
});

const { output } = await ai.generate({
	prompt: "Create a brief profile for a character in a fantasy video game.",
	// Specify output structure using Zod schema
	output: {
		format: "json",
		schema: z.object({
			name: z.string(),
			role: z.enum(["knight", "mage", "archer"]),
			backstory: z.string(),
		}),
	},
});

console.log(output);

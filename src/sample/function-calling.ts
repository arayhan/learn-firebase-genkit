import { genkit, z } from "genkit";

import { gemini15Flash, googleAI } from "@genkit-ai/googleai";

const ai = genkit({
	plugins: [googleAI()],
	model: gemini15Flash,
});

// Define tool to get current weather for a given location
const getWeather = ai.defineTool(
	{
		name: "getWeather",
		description: "Gets the current weather in a given location",
		inputSchema: z.object({
			location: z
				.string()
				.describe("The location to get the current weather for"),
		}),
		outputSchema: z.string(),
	},
	async (input) => {
		// Here, we would typically make an API call or database query. For this
		// example, we just return a fixed value.
		return `The current weather in ${input.location} is 63°F and sunny.`;
	}
);

const { text } = await ai.generate({
	tools: [getWeather], // Give the model a list of tools it can call
	prompt: "What is the weather like in New York? ",
});

console.log(text);

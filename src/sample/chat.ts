import { genkit } from "genkit";
import { createInterface } from "node:readline/promises";

import { gemini15Flash, googleAI } from "@genkit-ai/googleai";

const ai = genkit({
	plugins: [googleAI()],
	model: gemini15Flash,
});

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

(async () => {
	const chat = ai.chat();

	while (true) {
		const input = await rl.question("You: ");
		const { text } = await chat.send(input);
		console.log("AI: ", text);
	}
})();

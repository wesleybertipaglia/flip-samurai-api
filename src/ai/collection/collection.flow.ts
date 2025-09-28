import { createAI } from "../genkit";
import { CreateCollectionInput, CreateCollectionOutput, CreateCollectionInputSchema, CreateCollectionOutputSchema } from "./collection.dto";

export async function createCollectionWithAi(
    input: CreateCollectionInput
): Promise<CreateCollectionOutput> {
    if (
        typeof input.apiKey !== 'string' ||
        input.apiKey.trim().length < 20
    ) {
        throw new Error('Invalid API key. Please provide a valid Google Gemini API key.');
    }

    const ai = createAI(input.apiKey);

    const prompt = ai.definePrompt({
        name: 'createCollectionPrompt',
        input: { schema: CreateCollectionInputSchema },
        output: { schema: CreateCollectionOutputSchema },
        prompt: `You are an AI assistant that creates flashcard collections. Based on the user's idea, generate a collection of flashcards in JSON format.

The idea is: {{{idea}}}

Please generate a collection with a name, a short description, 3 relevant tags, and 10 flashcards.
Ensure the content is accurate and directly related to the user's idea. The tags should be lowercase.
`,
    });

    const createCollectionFlow = ai.defineFlow(
        {
            name: 'createCollectionFlow',
            inputSchema: CreateCollectionInputSchema,
            outputSchema: CreateCollectionOutputSchema,
        },
        async input => {
            if (input.idea.length < 5 || input.idea.length > 100) {
                throw new Error("Idea must be between 5 and 100 characters.");
            }

            const forbiddenPatterns = [/delete all/i, /drop table/i, /<script>/i];
            if (forbiddenPatterns.some(pattern => pattern.test(input.idea))) {
                throw new Error("Invalid input provided.");
            }

            const { output } = await prompt(input);
            return output!;
        }
    );

    return await createCollectionFlow(input);
}
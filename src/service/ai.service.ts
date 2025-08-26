import { CreateCollectionInput, CreateCollectionOutput } from "../ai/collection/collection.dto";
import { createCollectionWithAi } from "../ai/collection/collection.flow";

/**
 * Ai Service
 * Provides methods for interacting with the Genkit AI flow.
 */
export default class AiService {

    /**
     * Executes the Genkit flow to generate a flashcard collection.
     * @param data - The user idea and Gemini API key.
     * @returns The generated flashcard collection.
     */
    async createCollection(data: CreateCollectionInput): Promise<CreateCollectionOutput> {
        return createCollectionWithAi(data);
    }
}
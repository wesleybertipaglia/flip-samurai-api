import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { FastifySchema } from 'fastify';

export const CreateCollectionInputSchema = z.object({
    idea: z.string().min(5).max(100).describe("A ideia do usuário para a coleção de flashcards."),
    apiKey: z.string().min(20).describe('Chave da API Google Gemini.'),
});
export type CreateCollectionInput = z.infer<typeof CreateCollectionInputSchema>;

const CardSchema = z.object({
    front: z.string().describe('O lado frontal do flashcard (pergunta/termo).'),
    back: z.string().describe('O lado traseiro do flashcard (resposta/definição).'),
});

export const CreateCollectionOutputSchema = z.object({
    name: z.string().describe('Nome conciso da coleção.'),
    description: z.string().describe('Breve descrição da coleção.'),
    tags: z.array(z.string()).describe('Lista de tags relevantes.'),
    cards: z.array(CardSchema).describe('Array de 10 flashcards.'),
});
export type CreateCollectionOutput = z.infer<typeof CreateCollectionOutputSchema>;

export const CreateCollectionRouteSchema: FastifySchema = {
    body: zodToJsonSchema(CreateCollectionInputSchema, 'CreateCollectionInput'),
    response: {
        200: zodToJsonSchema(CreateCollectionOutputSchema, 'CreateCollectionOutput'),
    },
};
import { FastifyInstance } from "fastify";
import { CreateCollectionInput, CreateCollectionRouteSchema } from "../ai/collection/collection.dto";
import AiController from "../controller/ai.controller";

const controller = new AiController();

/**
 * Ai Routes
 * Handles routes for AI flashcard generation.
 * @param server 
 */
export const aiRoutes = async (server: FastifyInstance) => {
    const createCollection = controller.createCollection.bind(controller);

    server.post<{ Body: CreateCollectionInput }>(
        "/collection",
        { schema: CreateCollectionRouteSchema },
        createCollection
    );
};
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCollectionInput } from "../ai/collection/collection.dto";
import AiService from "../service/ai.service";

/**
 * Ai Controller
 * Handles HTTP requests related to AI flows.
 */
export default class AiController {
    private aiService: AiService;

    constructor() {
        this.aiService = new AiService();
    }

    /**
     * Handles flashcard collection creation request.
     * @param req - The request object containing user idea and API key.
     * @param res - The response object.
     */
    async createCollection(
        req: FastifyRequest<{ Body: CreateCollectionInput }>,
        res: FastifyReply
    ) {
        const IS_PRODUCTION = process.env.NODE_ENV === 'production';

        try {
            const dto = req.body;
            const result = await this.aiService.createCollection(dto);
            return res.send(result);
        } catch (error) {
            req.log.error(error);

            if (error instanceof Error) {
                if (error.message.includes('Invalid API key') || error.message.includes('Idea must be between') || error.message.includes('Invalid input')) {
                    return res.status(400).send({
                        statusCode: 400,
                        error: 'Bad Request',
                        message: error.message
                    });
                }
            }

            const message = IS_PRODUCTION ? 'An unexpected error occurred.' : 'An unexpected error occurred. Check server logs for details.';
            return res.status(500).send({
                statusCode: 500,
                error: "Internal Server Error",
                message: message
            });
        }
    }
}
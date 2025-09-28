import { FastifyRequest, FastifyReply } from "fastify";

/**
 * Middleware de Tratamento de Erros Global
 * Captura exceções não tratadas nas rotas e formata a resposta.
 */
export default class ErrorMiddleware {
    /**
     * @param error O objeto de erro.
     * @param request A requisição Fastify.
     * @param reply A resposta Fastify.
     */
    static handle(error: any, request: FastifyRequest, reply: FastifyReply) {
        request.log.error(error);

        if (error.validation) {
            return reply.status(400).send({
                statusCode: 400,
                error: 'Bad Request',
                message: 'Validation failed.',
                details: error.validation
            });
        }

        const IS_PRODUCTION = process.env.NODE_ENV === 'production';
        const message = IS_PRODUCTION ? 'Internal Server Error' : error.message;

        return reply.status(error.statusCode || 500).send({
            statusCode: error.statusCode || 500,
            error: error.name || 'ServerError',
            message: message,
        });
    }
}

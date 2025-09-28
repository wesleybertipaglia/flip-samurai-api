import fastify, { FastifyInstance } from "fastify";
import ErrorMiddleware from "./middlewares/error.middleware";
import { aiRoutes } from "./route/ai.route";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit"

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://flipping-samurai.vercel.app';

const serverOptions = {
    logger: IS_PRODUCTION
        ? true
        : {
            transport: {
                target: 'pino-pretty',
                options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' },
            },
        },
    disableRequestLogging: IS_PRODUCTION,
};

const server: FastifyInstance = fastify(serverOptions);

server.setErrorHandler(ErrorMiddleware.handle);

const baseRoute = "/api/v1";

server.register(async (fastifyScoped) => {
    await fastifyScoped.register(cors, {
        origin: CORS_ORIGIN,
        methods: ["POST"],
        allowedHeaders: ["Content-Type"],
    });

    await fastifyScoped.register(rateLimit, {
        max: 10,
        timeWindow: '1 minute',
    });

    fastifyScoped.register(aiRoutes, { prefix: "" });
}, { prefix: baseRoute + "/ai" });

const start = async () => {
    try {
        const host = '0.0.0.0';
        await server.listen({ port: PORT, host });

        server.log.info(`Server is running on port ${PORT}`);

    } catch (err) {
        console.error("Server startup error:", err);
        process.exit(1);
    }
};

const shutdown = async () => {
    try {
        server.log.info("Server shutting down...");
        await server.close();
    } catch (err) {
        if (err instanceof Error) {
            server.log.error("Error during shutdown");
        } else {
            server.log.error("Unknown error during shutdown");
        }
    } finally {
        process.exit(0);
    }
};



["SIGINT", "SIGTERM", "SIGTSTP"].forEach((signal) => {
    process.on(signal, shutdown);
});

start();

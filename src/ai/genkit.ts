import { genkit } from 'genkit';
import { gemini, googleAI } from '@genkit-ai/googleai';

const GEMINI_20_FLASH_LITE = gemini('gemini-2.0-flash-lite');

export function createAI(apiKey: string) {
    return genkit({
        model: GEMINI_20_FLASH_LITE,
        plugins: [
            googleAI({
                apiKey,
                models: [GEMINI_20_FLASH_LITE],
            }),
        ],
    });
}
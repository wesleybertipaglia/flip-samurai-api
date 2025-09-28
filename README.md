# Flip Samurai AI API

Backend service for generating flashcard collections using Google Gemini.
This is the powerful engine that transforms user ideas into structured, ready-to-use learning materials via AI.

## Features
- AI Generation
- Structured Output
- Security & Rate Limiting
- Production-Ready Logging

## Built With
- Fastify
- TypeScript
- Genkit AI
- Google Gemini
- Zod

## Getting Started

### 1 Prerequisites

You'll need a Google Gemini API Key. Get one from Google AI Studio.

### 2 Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/wesleybertipaglia/flip-samurai-api.git
cd flip-samurai-api
npm install
npm run dev
```

### 3 Environment Variables

Create a file named `.env` in the project root and fill in the required variables:

```ini
PORT=3000
CORS_ORIGIN=https://flip-samurai.vercel.app
NODE_ENV=development
```

## Endpoint

The API exposes a single, protected endpoint:

`POST /api/v1/ai/collection` - Generates a new flashcard collection from the provided idea and Gemini API Key.

### Request Body (JSON)

| Field | Type | Description |
| :--- | :--- | :--- |
| `idea` | `string` | The topic or concept for the collection (5-100 chars). |
| `apiKey` | `string` | The user's Google Gemini API key. |

## Contributing

Contributions are welcome! If you'd like to help improve Flip Samurai, feel free to fork the repository, open a pull request, or submit issues.

## License

This project is licensed under the [MIT License](LICENSE).

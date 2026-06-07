import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDBFX_V4kZk3RjaqPrnRoKgaVm3YJ74e5k';

const genAI = new GoogleGenerativeAI(API_KEY);

// Try different model names that might be available
const MODEL_NAMES = [
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-pro',
  'models/gemini-1.5-flash-latest',
  'models/gemini-pro',
];

export async function generateAIResponse(prompt: string): Promise<string> {
  let lastError: Error | null = null;

  // Try each model until one works
  for (const modelName of MODEL_NAMES) {
    try {
      console.log(`Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log(`Success with model: ${modelName}`);
      return response.text();
    } catch (error) {
      console.warn(`Failed with ${modelName}:`, error);
      lastError = error as Error;
      continue;
    }
  }

  console.error('All models failed:', lastError);
  throw new Error('Failed to generate AI response with any available model');
}

export async function* streamAIResponse(prompt: string): AsyncGenerator<string> {
  let lastError: Error | null = null;

  // Try each model until one works
  for (const modelName of MODEL_NAMES) {
    try {
      console.log(`Trying streaming with model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContentStream(prompt);

      console.log(`Success streaming with model: ${modelName}`);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        yield chunkText;
      }

      return; // Successfully streamed, exit
    } catch (error) {
      console.warn(`Streaming failed with ${modelName}:`, error);
      lastError = error as Error;
      continue;
    }
  }

  console.error('All streaming models failed:', lastError);
  throw new Error('Failed to stream AI response with any available model');
}

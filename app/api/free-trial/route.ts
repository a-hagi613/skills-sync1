import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getClientIp } from 'request-ip';
// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Define a map to track the last call time for each IP address
const ipLastCallTimes = new Map();

export async function POST(req: Request) {
  // Extract the client's IP address from the request using request-ip
  const clientIPAddress = getClientIp(req as any);

  // Calculate the current time
  const currentTime = Date.now();

  // Calculate the time elapsed since the last API call for this IP address
  const timeElapsed = currentTime - (ipLastCallTimes.get(clientIPAddress) || 0);

  // Set the minimum time interval between API calls (in milliseconds)
  const minTimeInterval = 60000; // 1 minute

  // Check if the minimum time interval has passed since the last API call for this IP address
  if (timeElapsed < minTimeInterval) {
    // Return an error response indicating that the API can only be called once per minute
    return new Response('Location-based rate limit exceeded. Please wait before making another request.', {
      status: 429, // Too Many Requests
    });
  }

  // Update the last call time for this IP address to the current time
  ipLastCallTimes.set(clientIPAddress, currentTime);

  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    // max_tokens: 10,
    stream: true,
    messages: messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

// Add your job description and resume code here

// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { prisma } from '../../../lib/db';
// import {  currentUser } from '@clerk/nextjs';

// // Optional, but recommended: run on the edge runtime.
// // See https://vercel.com/docs/concepts/functions/edge-functions
// // export const runtime = 'edge';



// const openai = new OpenAI({
//   apiKey: process.env.USER_API_KEY!,
//   // process.env.OPENAI_API_KEY!,
// });

// // Define a variable to track the last time the API was called

 
// export async function POST(req: Request) {

//   const currUser = await currentUser();
//  console.log(currUser, "currUser");
//   if(!currUser){
//     return new Response("Unauthorized. No current user", { status: 401 });
//   }
//   // Extract the `messages` from the body of the request
//   const { messages, userId } = await req.json();
//   console.log(messages, "messages" , userId, "userId");

//   // Fetch the user from the database
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     include: { coverLetters: true },
//   });

//   // Check if the user exists
// if (!user) {
//   return new Response('User not found', { status: 404 });
// }


//   // Check if the user has reached the maximum number of cover letters
//   if ( user.maxCoverLetters <= 0) {
//     return new Response('Maximum number of cover letters reached', { status: 400 });
//   }
 
//   // Request the OpenAI API for the response based on the prompt
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     max_tokens: 20,
//     stream: true,
//     messages: messages,
    
//   });
 
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);

//   //save
 
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }

// //  `Using the requirements from this job description: ${jobDescription}\n I want you to tailor match this resume so that it matches the job description requirements${resume}. Do not change the format of the resume and do not exaggerate too much on the new tailored resume to match the requirements, be somewhat truthful.`,

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { prisma } from '../../../lib/db';
import { currentUser } from '@clerk/nextjs';
import { OpenAI } from 'openai';

// Remove the openai instance creation here
export async function POST(req: Request) {
  try {
    const currUser = await currentUser();
    console.log(currUser, "currUser");
    if (!currUser) {
      throw new Error("Unauthorized. No current user");
    }

    // Extract the `messages` from the body of the request
    const { messages, userId } = await req.json();
    console.log(messages, "messages", userId, "userId");

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { coverLetters: true },
    });

    // Check if the user exists
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user has reached the maximum number of cover letters
    // if (user.maxCoverLetters <= 0) {
    //   throw new Error('Maximum number of cover letters reached');
    // }

    // Initialize the OpenAI instance with the user's API key
    const openai = new OpenAI({
      apiKey: user.apiKey, // Use the apiKey field from the user
    });

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      // max_tokens: 600,
      stream: true,
      messages: messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Save

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Handle the error here
    console.error(error);
    return new Response('AuthenticationError: 401 Incorrect API key provided. You can find your API key at https://platform.openai.com/account/api-keys', { status: 401 });
  }
}
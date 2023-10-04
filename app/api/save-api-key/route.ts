
// import { NextResponse } from 'next/server';
// import { prisma } from '../../../lib/db';
// import { auth } from '@clerk/nextjs';

// export async function POST(req: Request) {

//     const { apiKey } = await req.json();
//     console.log( apiKey, "apiKey");
    

//     const { userId } : { userId: string | null } = await auth();
//     console.log(userId, "currUserId");

//      if(!userId){
//        return new Response("Unauthorized. No current user", { status: 401 });
//      }

//   try {
//     // Check if a user with the provided userId exists in the database
//     let currentUser = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//     });



//     // Continue with saving the resume
//     if (currentUser && userId) {
//       const saveApiKey = await prisma.user.update({
//         where: {
//           id: userId,
//         },
//         data: {
//           apiKey: apiKey,
//         },
//       });
    
//       console.log('Api Key Saved');

  

//       return NextResponse.json({ saveApiKey });
//     } else {
//       console.log("Error could not save api key");
//       return new Response("Error could not save api key", {
//         status: 500, // Internal Server Error
//       });
//     }
//   } catch (error) {
//     console.error(error,"api key save error");
//     return new Response((error as Error).message, {
//       status: 500,
//     });
//   }
// }

// app/api/route.ts



import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function POST(req: Request) {
  // Extract the new API key from the request body
  const { apiKey } = await req.json();

  // Authenticate the user to get their userId
  const { userId }: { userId: string | null } = await auth();

  if (!userId) {
    return new Response('Unauthorized. No current user', { status: 401 });
  }

  try {
    // Find the user in the database based on their userId
    let user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      // Create a new user with the provided userId and API key
      user = await prisma.user.create({
        data: {
          id: userId,
          apiKey: apiKey,
        },
      });

      console.log('New user created');
    } else {
      // Update the user's API key
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          apiKey: apiKey,
        },
      });

      console.log('API Key Updated');
    }

    return NextResponse.json({ message: 'API key updated successfully' });
  } catch (error) {
    console.error('API key update error:', error);
    return new Response('Error updating API key', { status: 500 });
  }
}
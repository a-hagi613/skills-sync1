import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET(){
  try {
    const newUser = await prisma.user.create({
      data: {
        id: "123", // Provide a unique ID
        // No need to provide maxResumes and maxCoverLetters,
        // they will use the default values (5) defined in the model.
      },
    });
    console.log("New user created:", newUser);
    return NextResponse.json({ newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response((error as Error).message, { // Return the actual error message
        status: 500, // Internal Server Error
    });
  } 
}



// export async function GET(request: Request, { params }: { params: { userId: string } }) {
//     const { userId } = params;

//     try {
//         const coverLetters = await prisma.coverLetter.findMany({
//             where: {
//                 userId,
//             },
//         });
//         console.log("Cover Letters Retrieved");

//         return NextResponse.json({ coverLetters });
//     } catch (error) {
//         console.error(error); // Log the error to the console for debugging
//         return new Response((error as Error).message, { // Return the actual error message
//             status: 500, // Internal Server Error
//         });
//     }
// }


// createUser();

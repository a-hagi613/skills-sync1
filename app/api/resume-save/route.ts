// import { NextResponse } from 'next/server';
// import { prisma } from '../../../lib/db';

// export async function POST(req: Request) {
//   const { originalText, generatedText, userId } = await req.json();

//   try {
//     // Check if a user with the provided userId exists in the database
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//     });

//     if (!existingUser) {
//       // If the user doesn't exist, create a new user with userId
//       await prisma.user.create({
//         data: {
//           id: userId,
//         },
//       });
//     }
// console.log("New User Created");

//     // Continue with saving the cover letter
//     const coverLetter = await prisma.coverLetter.create({
//       data: {
//         originalText,
//         generatedText,
//         userId,
//       },
//     });
//     console.log('Cover Letter Saved');

//     return NextResponse.json({ coverLetter });
//   } catch (error) {
//     console.error(error);
//     return new Response((error as Error).message, {
//       status: 500,
//     });
//   }
// }

import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function POST(req: Request) {
  const { originalText, generatedText, userId } = await req.json();

  try {
    // Check if a user with the provided userId exists in the database
    let existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    //if the user does exist set the maxResumes count to 5
    // if (existingUser && (existingUser.maxResumes === null || existingUser.maxResumes === 0)) {
    //     await prisma.user.update({
    //     where: {
    //       id: userId,
    //     },
    //     data: {
    //       maxResumes: 5,
    //     },
    //   });
    //  console.log("User maxResumes count set to 5");
    // }

    if (!existingUser) {
      // If the user doesn't exist, create a new user with userId
      await prisma.user.create({
        data: {
          id: userId,
          // maxResumes: 5,
        },
      });
      console.log("New User Created");

      // Re-fetch the user data after creating a new user
      existingUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    }

    // Continue with saving the resume
    // if (existingUser && existingUser.maxResumes !== null && existingUser.maxResumes < 6) {
      if (existingUser) {

    const resume = await prisma.resume.create({
        data: {
          originalText,
          generatedText,
          userId,
        },
      });

      console.log('Resume Saved');

    //   get latest maxResumes count
        existingUser = await prisma.user.findUnique({
            where: {
            id: userId,
            },
        });
        
        // decrement maxResumes count
        // await prisma.user.update({
        //     where: {
        //       id: userId,
        //     },
        //     data: {
        //       maxResumes: existingUser.maxResumes - 1,
        //     },
        //   });

    //   await prisma.user.update({
    //     where: {
    //       id: userId,
    //     },
    //     data: {
    //       maxResumes: existingUser.maxResumes - 1,
    //     },
    //   });
      // console.log("User maxResumes count decremented");

      return NextResponse.json({ resume });
    } 
    // else {
    //   // Handle the case when maxCoverLetters is null or >= 6
    //   console.log("User has reached the maximum limit of resumes");
    //   return new Response("User has reached the maximum limit of resumes", {
    //     status: 500, // Internal Server Error
    //   });
    // }
  } catch (error) {
    console.error(error,"resume save error");
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}
import { NextResponse } from 'next/server'
import  {prisma}  from "../../../../lib/db"


// const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        const coverLetters = await prisma.coverLetter.findMany({
            where: {
                userId,
            },
        });
        console.log("Cover Letters Retrieved");

        return NextResponse.json({ coverLetters });
    } catch (error) {
        console.error(error,"cover letter retrieve error"); // Log the error to the console for debugging
        return new Response((error as Error).message, { // Return the actual error message
            status: 500, // Internal Server Error
        });
    }
}
import { NextResponse } from 'next/server'
import  {prisma}  from "../../../../lib/db"


// const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        const messages = await prisma.message.findMany({
            where: {
                userId,
            },
        });
        console.log("Messages Retrieved");

        return NextResponse.json({ messages });
    } catch (error) {
        console.error(error , " message retrieve error"); // Log the error to the console for debugging
        return new Response((error as Error).message, { // Return the actual error message
            status: 500, // Internal Server Error
        });
    }
}
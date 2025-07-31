import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ movieId: string }> }
) {
    try {
        await serverAuth();

        const { movieId } = await params;

        if(typeof movieId !== "string") {
            throw new Error("Invalid ID");
        }

        if(!movieId) {
            throw new Error("Invalid ID");
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if(!movie) {
            throw new Error("Invalid ID");
        }

        return NextResponse.json(movie, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Có lỗi xảy ra"}, { status: 400 });

    }
}
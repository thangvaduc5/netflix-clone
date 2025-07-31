import prismadb from "@/lib/prismadb"
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await serverAuth();
        const movieCount = await prismadb.movie.count();

        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovie = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        });

        return NextResponse.json(randomMovie[0], {status: 200});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Có lỗi xảy ra"}, {status: 400});
    }
}

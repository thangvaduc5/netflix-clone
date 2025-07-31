import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { currentUser } = await serverAuth();

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });

        return NextResponse.json(favoriteMovies, {status: 200});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Có lỗi xảy ra"},{status: 400});
    }
}
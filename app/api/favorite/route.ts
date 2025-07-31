import { without } from "lodash";

import prismadb from "@/lib/prismadb"
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { currentUser } = await serverAuth();

        const body = await req.json();
        const { movieId } = body;

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if(!existingMovie) {
            throw new Error("Invalid ID");
        }

        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || "",
            },
            data: {
                favoriteIds: {
                    push: movieId,
                }
            }
        });
        return NextResponse.json(user, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Có lỗi xảy ra"},{status: 400});
    }    
}


export async function DELETE(req: Request) {
    try {
        const { currentUser } = await serverAuth();

        const body = await req.json();
        const { movieId } = body;

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if(!existingMovie) {
            throw new Error("Invalid ID");
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prismadb.user.update({
            where: {
                email: currentUser.email || "",
            },
            data: {
                favoriteIds: updatedFavoriteIds,
            }
        });
        
        return NextResponse.json(updatedUser, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Có lỗi xảy ra"},{status: 400});
    }    
}



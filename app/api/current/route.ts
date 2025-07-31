import { NextResponse } from 'next/server'

import serverAuth from "@/lib/serverAuth";

export async function GET () {

    try {
        const { currentUser } = await serverAuth();
        return NextResponse.json(currentUser, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Có lỗi xảy ra"}, { status: 400 });

    }
}
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_JWT_SECRET});
    
    const { pathname } = req.nextUrl;
    
    // console.log("TOKEN:", token);
    // console.log("PATHNAME", pathname);

    if(
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.startsWith("/auth") 
    ) {
        return NextResponse.next();
    }

    if(!token) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return  NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|auth|images).*)",
    ],
};
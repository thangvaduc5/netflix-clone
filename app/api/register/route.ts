import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function POST(req: Request) {
    if(req.method !== 'POST') {
        return NextResponse.json({status: 405});
    }

    try {
        const body = await req.json();
        const {email, name, password} = body

        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        });

        if(existingUser) {
            return NextResponse.json({error: "Email đã tồn tại"}, {status: 422})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prismadb.user.create({
            data: {
                email,
                name, 
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Có lỗi xảy ra"}, {status: 400})
    }
}
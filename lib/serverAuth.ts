import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

const serverAuth = async () => {
    const session = await getServerSession(authOptions);

    if(!session?.user?.email) {
        throw new Error("Chưa đăng nhập");
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if (!currentUser) {
        throw new Error("Chưa đăng nhập");
    }

    return {currentUser} ;
}

export default serverAuth
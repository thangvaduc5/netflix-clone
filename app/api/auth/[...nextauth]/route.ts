import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";


const handler = NextAuth(authOptions);

// ❗ Phải export GET và POST
export { handler as GET, handler as POST }


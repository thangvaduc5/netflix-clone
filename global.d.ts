import { PrismaClient } from "@prisma/client"
// import { PrismaClient } from "@/app/generated/prisma" 

declare global {
  var prismadb: PrismaClient | undefined
}


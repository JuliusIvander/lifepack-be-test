import { PrismaClient, Prisma } from "@prisma/client";
const db = new PrismaClient();

export { db, Prisma };

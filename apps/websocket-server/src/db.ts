// Ment to be copied to the root of the project (app type)
import { PrismaClient } from "@sheet-hub/database";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;
export { db };

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

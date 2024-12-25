import { PrismaClient } from '@prisma/client'


// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }
//@ts-ignore
const prisma = globalThis.prisma ?? new PrismaClient()

//@ts-ignore
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
export default prisma
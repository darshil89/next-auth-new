import prisma from '../prisma/index'

export async function connectToDB() {

    try {
        await prisma.$connect()

        // console.log("Connected to DB")


    } catch (error: any) {
        return new Error(error)
    }
}
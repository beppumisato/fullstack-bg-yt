import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
    try {
        await prisma.$connect();
    } catch(err){
        return Error('接続に失敗');
    }
}


//取得API
export const GET = async (req: Request, res: NextResponse) => {
    // console.log('GET')
    try{
        await main();
        const users = await prisma.user.findMany();
        return NextResponse.json({ message: 'Success',users}, {status: 200});
    } catch (err) {
        return NextResponse.json({ Message: 'Error',err}, {status: 500});
    }finally{
        await prisma.$disconnect();
    }
};

//ログインAPI
export const POST = async (req: Request, res: NextResponse) => {
    try{
        const { email, name, password } = await req.json();

        await main();
        const users = await prisma.user.create({ data: { email, name, password } });
        return NextResponse.json({ message: 'Success',users}, {status: 201});
    } catch (err) {
        return NextResponse.json({ Message: 'Error',err}, {status: 500});
    }finally{
        await prisma.$disconnect();
    }
};
import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
    try{
        await prisma.$connext();
    } catch (err) {
      return Error("DB接続に失敗しました");
    }
}

//ブログの全記事取得API
export const Get = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({ message: "Success",posts }, {status: 200});
     } catch (err) {
       return NextResponse.json({ message: "Error" , err }, { status: 500 });
     } finally {
        await prisma.$disconnect();
     }
};
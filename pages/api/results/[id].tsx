import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.url ? req.url.split("/").pop() : "";
    const guess = await prisma.guess.findUnique({
        where: {
            id: id
        }
    })
    res.status(200).json(guess);
}

export default handler;
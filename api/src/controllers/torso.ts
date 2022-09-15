import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client';
import { generateUUID, writeB64Image, cleanFiles } from "../utils";
import path from "path"
import { newTorsoEmail } from "../emails";

const prisma = new PrismaClient();

export const submitTorso = async (req: Request, res: Response) => {
    try {
        const front = `${generateUUID()}.png`;
        const back = `${generateUUID()}.png`;
        const frontB64 = req.body.front;
        const backB64 = req.body.back;
        writeB64Image(frontB64, path.join("public", "uploads", front));
        writeB64Image(backB64, path.join("public", "uploads", back));
        req.body["front"] = front;
        req.body["back"] = back;
        const result = await prisma.torso.create({ data: req.body });
        await newTorsoEmail(result, frontB64.replace(/^data:image\/png;base64,/, ""), backB64.replace(/^data:image\/png;base64,/, ""));
        res.status(201).end();
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

export const readTorsos = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await prisma.torso.findMany());
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

export const deleteTorso = async (req: Request, res: Response) => {
    try {
        const id = parseInt(<string>req.query.id);
        const deleted = await prisma.torso.delete({
            where: {
                id: id
            }
        });
        cleanFiles(deleted.front, deleted.back);
        res.status(200).json({});
    } catch (e) {
        console.error(e);
        res.status(500).json({});
    }
}
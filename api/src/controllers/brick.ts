import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client';
import { generateUUID, writeB64Image, cleanFiles } from "../utils";
import path from "path"
import { newBrickEmail } from "../emails";

const prisma = new PrismaClient();

export const submitBrick = async (req: Request, res: Response) => {
    try {
        const mask = `${generateUUID()}.png`;
        const preview = `${generateUUID()}.png`;
        const maskB64 = req.body.mask;
        const previewB64 = req.body.preview;
        writeB64Image(maskB64, path.join("public", "uploads", mask));
        writeB64Image(previewB64, path.join("public", "uploads", preview));
        req.body["preview"] = preview;
        req.body["mask"] = mask;
        const result = await prisma.brick.create({ data: req.body });
        await newBrickEmail(result, previewB64.replace(/^data:image\/png;base64,/, ""), maskB64.replace(/^data:image\/png;base64,/, ""));
        res.status(201).end();
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

export const readBricks = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await prisma.brick.findMany());
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

export const deleteBrick = async (req: Request, res: Response) => {
    try {
        const id = parseInt(<string>req.query.id);
        const deleted = await prisma.brick.delete({
            where: {
                id: id
            }
        });
        cleanFiles(deleted.preview, deleted.mask);
        res.status(200).json({});
    } catch (e) {
        console.error(e);
        res.status(500).json({});
    }
}
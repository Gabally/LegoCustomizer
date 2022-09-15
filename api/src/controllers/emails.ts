import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getNotificationEmails = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await prisma.notificationEmails.findMany());
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

export const addNotificationEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        await prisma.notificationEmails.create({ data: { email: email }  }); 
        res.status(200).json(await prisma.notificationEmails.findMany());
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

export const deleteNotificationEmail = async (req: Request, res: Response) => {
    try {
        const id = parseInt(<string>req.query.id);
        await prisma.notificationEmails.delete({
            where: {
                id: id
            }
        });
        res.status(200).json(await prisma.notificationEmails.findMany());
    } catch (e) {
        console.error(e);
        res.status(500).json({});
    }
}
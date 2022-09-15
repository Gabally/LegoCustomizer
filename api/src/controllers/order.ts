import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client';
import { newOrderEmail } from "../emails";

const prisma = new PrismaClient();

export const submitOrder = async (req: Request, res: Response) => {
    try {
        let result = await prisma.orders.create({ data: req.body });
        await newOrderEmail(result);
        res.status(201).end();
    } catch(e) {
        console.error(e);
        res.status(500).end();
    }
}

export const readOrders = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await prisma.orders.findMany());
    } catch(e) {
        console.error(e);
        res.status(500).end();
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await prisma.orders.delete({ where: {
                id: parseInt(<string>req.query.id)
            }
        }));
    } catch(e) {
        console.error(e);
        res.status(500).json({});
    }
}
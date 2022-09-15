import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const setCredentials = async (req: Request, res: Response) => {
    try {
        if (await prisma.users.count() === 0) {
            req.body["password"] = await bcrypt.hash(req.body["password"], 10);
            await prisma.users.create({
                data: req.body
            })
            res.status(201).end();
        } else {
            res.status(401).end();
        }
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        let user = await prisma.users.findFirst({
            where: {
                username: username
            }
        });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                req.session["authorized"] = true;
                res.status(200).json({});
            } else {
                res.status(401).json({});
            }
        } else {
            res.status(401).json({});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({});
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    try {
        let user = await prisma.users.findFirst();
        let { password, newPassword } = req.body;
        if (await bcrypt.compare(password, user.password)) {
            await prisma.users.updateMany({
                data: {
                    password: await bcrypt.hash(newPassword, 10) 
                }
            });
            res.status(201).json({});
        } else {
            res.status(200).json({
                error: "Wrong password"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}

export const canLogin = async (req: Request, res: Response) => {
    try {
       res.status(200).json(await prisma.users.count() > 0);
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
}
import { Request, Response } from "express"

export const isAuthenticated = (req: Request, res: Response, next) => {
    req.session["authorized"] === true ? next() : res.sendStatus(401);
}
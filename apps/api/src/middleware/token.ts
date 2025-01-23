import { IPersonnel } from "@/types/personnel";
import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

export const createToken = (userId: number, userEmail: string) => {
    const payload = {id : userId, email : userEmail};
    const token = sign(payload, process.env.JWT_SECRET!)
    return token;
}

export const verifyToken = (req:Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) throw new Error('Token not found');
    const verifiedToken = verify(token, process.env.JWT_SECRET!) as IPersonnel;
    req.personnel = verifiedToken;
    next();
}
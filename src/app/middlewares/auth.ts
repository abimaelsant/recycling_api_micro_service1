import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv/config');

export default function authenticateToken(
    request: Request,
    response: Response,
    next: NextFunction) {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return response.status(401).json({ message: "Token no provided" });

    jwt.verify(token, process.env.SECRET_JWT as string, (err: any, user: any) => {
        if (err) return response.status(401).json({ message: "Acesso inválido" });
        request.user = {
            id: user.id
        }
        return next()
    })
}
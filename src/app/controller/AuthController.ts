import { Request, Response } from 'express';
import AuthRepository from '../repository/user/AuthRepository';
import UserRepository from '../repository/user/UserRepository';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

class AuthController {

    async login(request: Request, response: Response): Promise<any> {
        const authRepository = new AuthRepository();
        const userRepository = new UserRepository();
        const body: any = { email: request.body.email, password: request.body.password };
        const user = await userRepository.findByEmail(body.email);
        if (!user)
            return response.status(401).json({ message: 'E-mail e/ou senha incorretos' });
        bcrypt.compare(body.password, user.password, (err, data) => {
            if (err) throw err

            if (data) {
                const res = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_JWT, { expiresIn: '1800s' });
                return response.status(201).json({ message: "Login realizado com sucesso.", res })
            } else {
                return response.status(401).json({ message: 'E-mail e/ou senha incorretos' });
            }

        })
    }
}

export default AuthController;
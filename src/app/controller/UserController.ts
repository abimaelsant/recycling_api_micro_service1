import { Request, Response } from 'express';
import UserRepository from '../repository/user/UserRepository';
const bcrypt = require('bcryptjs');

class UserController {

    async store(request: Request, response: Response): Promise<any> {
        const userRepository = new UserRepository();
        request.body.password = await bcrypt.hash(request.body.password, 8);

        const user = await userRepository.create(request.body);
        return response.status(201).json(user);
    }

    async show(request: Request, response: Response): Promise<any> {
        const userRepository = new UserRepository();

        const id:number = request.user.id;
        const user = await userRepository.findById(id);
        return response.json(user);
    }
}

export default UserController;
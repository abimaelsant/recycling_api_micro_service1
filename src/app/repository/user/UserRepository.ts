import { getRepository, Repository } from 'typeorm';
import User from '../../entity/User';

class UserRepository {
    private user:Repository<User>;

    constructor() {
        this.user = getRepository(User);
    }

    async find(): Promise<any> {
        const users = await this.user.find();
        return users;
    }

    async findByEmail(email:string): Promise<any> {
        const user = await this.user.findOne({ where: { email } });
        return user;
    }

    async findById(id:number): Promise<any> {
        const user = await this.user.findOne(id);
        return user;
    }

    async create(body:any): Promise<any> {
        const user = await this.user.save(body);
        return user;
    }
}

export default UserRepository;
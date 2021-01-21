import { getRepository, Repository } from 'typeorm';
import User from '../../entity/User';

class AuthRepository {
    private user:Repository<User>;

    constructor() {
        this.user = getRepository(User);
    }

    async login(body:any): Promise<any> {
        const user = await this.user.save(body);
        return user;
    }
}

export default AuthRepository;
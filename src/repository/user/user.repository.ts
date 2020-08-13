import { Repository, EntityRepository } from 'typeorm';
import { Service } from 'typedi';

import { User } from '../../entity/user/user.entity';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser(user: any): Promise<any> {
    return this.save(user);
  }
}

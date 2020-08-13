import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';

import { UserRepository } from '../../repository/user/user.repository';
import { User } from '../../entity/user/user.entity';

@Service()
export class UserService {
  @InjectRepository()
  private readonly userRepository: UserRepository;

  async createUser(user: User): Promise<any> {
    const userRes = await this.userRepository.createUser(user);
    console.log(`user created!`);
    console.log({ userRes });
  }
}

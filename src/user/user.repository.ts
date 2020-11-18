import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository()
export class UserRepository extends Repository<User> {
  async createUser(result) {
    const user = new User();
    Object.assign(user, result);
    await user.save();
    return user;
  }
}

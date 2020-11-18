import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository()
export class UserRepository extends Repository<User> {
  async createUser(result) {
    return User.create(result);
  }
}

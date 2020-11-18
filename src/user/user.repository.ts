import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(result: object) {
    return User.create(result).save();
  }
  async query(query) {
    return User.query(query);
  }
}

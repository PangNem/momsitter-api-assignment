import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(result: object) {
    return User.create(result).save();
  }
  async findOne(username) {
    return User.findOne({ username });
  }
}

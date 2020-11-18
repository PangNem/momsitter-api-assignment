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

  async findOneQuery(username) {
    const query = `SELECT * FROM USER WHERE USERNAME = "${username}"`;
    return User.query(query);
  }
  async findSitter(sitter_id) {
    const query = `SELECT user.*, sitter.* from user LEFT JOIN sitter ON "${sitter_id}" = sitter.id where user.sitter_id = "${sitter_id}"`;
    return User.query(query);
  }
}

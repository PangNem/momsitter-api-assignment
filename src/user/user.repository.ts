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
  async findSitter(id) {
    const query = `SELECT user.*, sitter.careable_baby_age, sitter.self_introduction from user LEFT JOIN sitter ON user.sitter_id = sitter.id where user.id = "${id}"`;
    return User.query(query);
  }

  async findParent(id) {
    const query = `SELECT user.*, parent.desired_baby_age, parent.request_infomation from user LEFT JOIN parent ON user.sitter_id = parent.id where user.id = "${id}"`;
    return User.query(query);
  }

  async findAll(id) {
    const query = `SELECT * from (select user.*, sitter.careable_baby_age, sitter.self_introduction from user left join sitter on user.sitter_id = sitter.id) as a left join parent on a.parent_id = parent.id where a.id = "${id}";`;
    return User.query(query);
  }

  async updateProfile(id, data) {
    return User.createQueryBuilder('user')
      .update(User)
      .set(data)
      .where('id = :id', { id })
      .execute();
  }
}

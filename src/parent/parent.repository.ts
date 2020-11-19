import { EntityRepository, Repository } from 'typeorm';
import { Parent } from './parent.entity';

@EntityRepository(Parent)
export class ParentRepository extends Repository<Parent> {
  async createUser({ desired_baby_age, request_infomation }) {
    return Parent.create({
      desired_baby_age,
      request_infomation,
    }).save();
  }

  async updateProfile(id, data) {
    return Parent.createQueryBuilder('parent')
      .update(Parent)
      .set(data)
      .where('id = :id', { id })
      .execute();
  }
}

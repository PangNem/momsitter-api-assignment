import { EntityRepository, Repository } from 'typeorm';
import { Sitter } from './sitter.entity';

@EntityRepository(Sitter)
export class SitterRepository extends Repository<Sitter> {
  async createUser({ careable_baby_age, self_introduction }) {
    return Sitter.create({
      careable_baby_age,
      self_introduction,
    }).save();
  }

  async updateProfile(id, data) {
    return Sitter.createQueryBuilder('sitter')
      .update(Sitter)
      .set(data)
      .where('id = :id', { id })
      .execute();
  }
}

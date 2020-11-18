import { EntityRepository, Repository } from 'typeorm';
import { Sitter } from './sitter.entity';

@EntityRepository(Sitter)
export class SitterRepository extends Repository<Sitter> {
  async createUser({ careable_baby_age, self_introduction }) {
    return await Sitter.create({
      careable_baby_age,
      self_introduction,
    }).save();
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { Sitter } from './sitter.entity';

@EntityRepository()
export class SitterRepository extends Repository<Sitter> {
  async createSitterUser({ careable_baby_age, self_introduction }) {
    return Sitter.create({
      careable_baby_age,
      self_introduction,
    }).save();
  }
}

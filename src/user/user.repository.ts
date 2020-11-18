import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository()
export class UserRepository extends Repository<User> {}

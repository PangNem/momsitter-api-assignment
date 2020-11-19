import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parent } from './parent.entity';
import { ParentRepository } from './parent.repository';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent) private parentRepository: ParentRepository,
  ) {}
  async createUser(user) {
    return this.parentRepository.create(user);
  }
}

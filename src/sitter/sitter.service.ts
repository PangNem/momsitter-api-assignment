import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitter } from './sitter.entity';
import { SitterRepository } from './sitter.repository';

@Injectable()
export class SitterService {
  constructor(
    @InjectRepository(Sitter) private sitterRepository: SitterRepository,
  ) {}
  async createUser(user) {
    return this.sitterRepository.create(user);
  }
}

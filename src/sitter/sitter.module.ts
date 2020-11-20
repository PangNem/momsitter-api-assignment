import { Module } from '@nestjs/common';
import { SitterService } from './sitter.service';

@Module({
  providers: [SitterService]
})
export class SitterModule {}

import { Module } from '@nestjs/common';
import { SitterModule } from '../sitter/sitter.module';

@Module({
  imports: [SitterModule],
})
export class UserModule {}

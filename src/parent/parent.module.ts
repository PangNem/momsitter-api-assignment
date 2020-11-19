import { Module } from '@nestjs/common';
import { ParentRepository } from './parent.repository';
import { ParentService } from './parent.service';

@Module({
  providers: [ParentService, ParentRepository],
})
export class ParentModule {}

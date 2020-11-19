import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';

@Module({
  providers: [ParentService],
})
export class ParentModule {}

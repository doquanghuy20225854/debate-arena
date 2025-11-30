import { Module } from '@nestjs/common';
import { DebatesService } from './debates.service';
import { DebatesController } from './debates.controller';

@Module({
  providers: [DebatesService],
  controllers: [DebatesController]
})
export class DebatesModule {}

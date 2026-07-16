import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { DataService } from '../data/data.service';

@Module({
  controllers: [AdminController],
  providers: [DataService]
})
export class AdminModule {}

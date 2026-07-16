import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { DataService } from '../data/data.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, DataService]
})
export class NewsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { NewsModule } from './news/news.module';
import { DataService } from './data/data.service';

@Module({
  imports: [AdminModule, NewsModule],
  controllers: [AppController],
  providers: [AppService, DataService],
})
export class AppModule {}

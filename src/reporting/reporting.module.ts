import { Module } from '@nestjs/common';
import { ReportingController } from './infrastructure/controllers/reporting.ctrl';
import { TopicModule } from 'src/topic/topic.module';
import { ReportingService } from './services/reporting.service';

@Module({
  controllers: [ReportingController],
  providers: [ReportingService],
  imports: [TopicModule],
})
export class ReportingModule {}

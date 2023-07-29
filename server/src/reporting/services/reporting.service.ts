import { Inject, Injectable } from '@nestjs/common';
import { TopicHistoryRepository } from 'src/topic/domain/topic-history.repository';

@Injectable()
export class ReportingService {
  constructor(
    @Inject('TopicHistoryRepository')
    private readonly topicHistoryRepository: TopicHistoryRepository,
  ) {}

  getTotalsOfUser(userId: number) {
    return this.topicHistoryRepository.getReportOfUserGroupedByTopic(userId);
  }

  getTodayOfUser(userId: number) {
    return this.topicHistoryRepository.getReportOfTodayUser(userId);
  }
}

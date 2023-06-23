import { Injectable } from '@nestjs/common';
import { TopicHistoryRepository } from 'src/topic/domain/topic-history.repository';

@Injectable()
export class MysqlTopicHistoryRepository implements TopicHistoryRepository {
  async create(
    topicId: number,
    userId: number,
    startedAt: Date,
    closedAt: Date,
  ): Promise<void> {
    console.log(topicId, userId, startedAt, closedAt);
  }
}

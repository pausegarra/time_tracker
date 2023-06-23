import { Inject, Injectable } from '@nestjs/common';
import { TopicHistoryRepository } from '../domain/topic-history.repository';

@Injectable()
export class TopicHistorySerivce {
  constructor(
    @Inject('TopicHistoryRepository')
    private readonly topicHistoryRepository: TopicHistoryRepository,
  ) {}

  async activate(id: number, topciId: number) {
    this.topicHistoryRepository.create(topciId, id, new Date(), null);
  }
}

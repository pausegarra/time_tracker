import { Inject, Injectable } from '@nestjs/common';
import { TopicHistoryRepository } from '../domain/topic-history.repository';

@Injectable()
export class TopicHistorySerivce {
  constructor(
    @Inject('TopicHistoryRepository')
    private readonly topicHistoryRepository: TopicHistoryRepository,
  ) {}

  async activate(userId: number, topciId: number) {
    this.topicHistoryRepository.create(topciId, userId, new Date(), null);
  }

  async closeIfAlreadyOneActive(userId: number) {
    const active = await this.topicHistoryRepository.getActiveOfUser(userId);
    if (active !== null) {
      await this.topicHistoryRepository.update(active.id, {
        closedAt: new Date(),
      });
    }
  }

  async getCurrent(userId: number) {
    return this.topicHistoryRepository.getActiveOfUserWithTopic(userId);
  }

  async closeAllActiveTopics() {
    const allOpenTopics =
      await this.topicHistoryRepository.getAllActiveTopics();
    const ids = allOpenTopics.map((topic) => topic.id);
    await this.topicHistoryRepository.updateWhereIn(ids, {
      closedAt: new Date(),
    });
  }
}

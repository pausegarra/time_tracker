import { Inject, Injectable } from '@nestjs/common';
import { TopicRepository } from '../domain/topic.repository';
import { TopicNotFoundException } from './exceptions/not-found.exception';

@Injectable()
export class DeleteTopicService {
  constructor(
    @Inject('TopicRepository')
    private readonly topicRepository: TopicRepository,
  ) {}

  async deleteTopic(topicId: number) {
    await this.topicRepository.deleteTopic(topicId);
  }

  async ensureTopicOfUserExists(topicId: number, userId: number) {
    const topic = await this.topicRepository.findOneOfUser(topicId, userId);
    if (topic === null) {
      throw new TopicNotFoundException();
    }
  }
}

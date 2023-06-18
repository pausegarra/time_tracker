import { Inject, Injectable } from '@nestjs/common';
import { TopicRepository } from '../domain/topic.repository';
import { TopicEntity } from '../domain/topic.entity';
import { UserEntity } from 'src/user/domain/user.entity';
import { TopicNotFoundException } from './exceptions/not-found.exception';

@Injectable()
export class TopicService {
  constructor(
    @Inject('TopicRepository')
    private readonly topicRepository: TopicRepository,
  ) {}

  create(values: TopicEntity, user: UserEntity) {
    const { name, icon, color } = values;
    return this.topicRepository.createTopicForUser(name, user.id, color, icon);
  }

  async deleteTopic(topicId: number) {
    await this.topicRepository.deleteTopic(topicId);
  }

  async ensureTopicOfUserExists(topicId: number, userId: number) {
    const topic = await this.topicRepository.findOneOfUser(topicId, userId);
    if (topic === null) {
      throw new TopicNotFoundException();
    }
  }

  getMyTopics(userId: number) {
    return this.topicRepository.findAllOfUser(userId);
  }
}

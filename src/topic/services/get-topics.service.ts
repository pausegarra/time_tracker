import { Inject, Injectable } from '@nestjs/common';
import { TopicRepository } from '../domain/topic.repository';

@Injectable()
export class GetTopicService {
  constructor(
    @Inject('TopicRepository')
    private readonly topicRepository: TopicRepository,
  ) {}

  getMyTopics(userId: number) {
    return this.topicRepository.findAllOfUser(userId);
  }
}

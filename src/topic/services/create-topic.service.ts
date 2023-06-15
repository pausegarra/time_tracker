import { Inject, Injectable } from '@nestjs/common';
import { TopicRepository } from '../domain/topic.repository';

@Injectable()
export class CreateTopicService {
  constructor(
    @Inject('TopicRepository')
    private readonly topicRepository: TopicRepository,
  ) {}

  create() {
    return 'hello from service';
  }
}

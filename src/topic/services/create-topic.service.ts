import { Inject, Injectable } from '@nestjs/common';
import { TopicRepository } from '../domain/topic.repository';
import { TopicEntity } from '../domain/topic.entity';
import { UserEntity } from 'src/user/domain/user.entity';

@Injectable()
export class CreateTopicService {
  constructor(
    @Inject('TopicRepository')
    private readonly topicRepository: TopicRepository,
  ) {}

  create(values: TopicEntity, user: UserEntity) {
    const { name, icon, color } = values;
    return this.topicRepository.createTopicForUser(name, user.id, color, icon);
  }
}

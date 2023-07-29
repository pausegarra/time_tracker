import { TopicEntity } from './topic.entity';

export interface TopicRepository {
  findAllOfUser(userId: number): Promise<TopicEntity[]>;
  createTopicForUser(
    name: string,
    userId: number,
    color: string,
    icon: string,
  ): Promise<TopicEntity>;
  deleteTopic(topicId: number): Promise<void>;
  findOneOfUser(topicId: number, userId: number): Promise<TopicEntity>;
  updateTopic(topicId: number, name: string, color: string, icon: string): Promise<void>;
}

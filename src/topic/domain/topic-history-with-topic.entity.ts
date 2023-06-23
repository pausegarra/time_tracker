import { TopicHistoryEntity } from './topic-hisotory.entity';
import { TopicEntity } from './topic.entity';

export interface TopicHistoryWithTopic extends TopicHistoryEntity {
  topic: TopicEntity;
}

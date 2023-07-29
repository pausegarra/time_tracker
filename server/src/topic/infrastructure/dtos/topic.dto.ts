import { TopicEntity } from 'src/topic/domain/topic.entity';

export class TopicDTO {
  id: number;
  name: string;
  color: string;
  icon: string;

  constructor(id: number, name: string, color: string, icon: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.icon = icon;
  }

  static toResponseArray(topics: TopicEntity[]) {
    return topics.map(
      (topic) => new TopicDTO(topic.id, topic.name, topic.color, topic.icon),
    );
  }
}

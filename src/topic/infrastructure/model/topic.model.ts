import { Column, Table, Model } from 'sequelize-typescript';
import { TopicEntity } from 'src/topic/domain/topic.entity';

@Table({
  tableName: 'Topics',
})
export class TopicModel extends Model implements TopicEntity {
  @Column
  name: string;

  @Column
  color: string;

  @Column
  icon: string;

  @Column
  userId: number;
}

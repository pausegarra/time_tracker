import { Column, Model, Table } from 'sequelize-typescript';
import { UserEntity } from 'src/user/domain/user.entity';

@Table
export class UserModel extends Model implements UserEntity {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;
}

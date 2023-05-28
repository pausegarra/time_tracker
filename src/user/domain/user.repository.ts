import { UserEntity } from './user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity>;
  create(data: UserEntity): Promise<UserEntity>;
  countByEmail(email: string): Promise<number>;
}

import { UserEntity } from './user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity>;
  create(data: UserEntity): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity>;
}

import { UserEntity } from './user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity>;
}

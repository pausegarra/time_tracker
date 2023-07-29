import { UserEntity } from './user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity>;
  create(name: string, email: string, password: string): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity>;
}

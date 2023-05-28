import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domain/user.entity';
import { UserRepository } from 'src/user/domain/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async register(data: UserEntity) {
    const createdUser = await this.userRepository.create(data);
    return createdUser;
  }
}

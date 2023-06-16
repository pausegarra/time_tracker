import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserEntity } from 'src/user/domain/user.entity';
import { UserRepository } from 'src/user/domain/user.repository';

@Injectable()
export class RegisterService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async register(data: UserEntity) {
    const createdUser = await this.userRepository.create(
      data.name,
      data.email,
      await this.hashPassword(data.password),
    );
    return createdUser;
  }

  private async hashPassword(string) {
    const hashedPassword = await hash(string, 10);
    return hashedPassword;
  }
}

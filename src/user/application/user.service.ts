import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { EmailAlreadyExistsError } from './exceptions/emailExists.error';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async ensureUserEmailNotexists(email: string) {
    const totalUsers = await this.userRepository.countByEmail(email);
    if (totalUsers > 0) {
      throw new EmailAlreadyExistsError();
    }
  }
}

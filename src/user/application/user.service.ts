import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { EmailAlreadyExistsError } from './exceptions/email-exists.error';
import { UserNotFoundException } from './exceptions/user-not-found.error';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async ensureUserEmailNotexists(email: string) {
    const totalUsers = await this.userRepository.findByEmail(email);
    if (totalUsers !== null) {
      throw new EmailAlreadyExistsError();
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user === null) {
      throw new UserNotFoundException();
    }

    return user;
  }
}

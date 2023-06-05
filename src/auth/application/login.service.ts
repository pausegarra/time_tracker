import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PasswordsNotMatchException } from './exceptions/passwords-not-match.error';

@Injectable()
export class LoginService {
  async comparePasswords(password, hash) {
    const isMatched = await compare(password, hash);
    if (isMatched === false) {
      throw new PasswordsNotMatchException();
    }
  }
}

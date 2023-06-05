import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '../domain/token.repository';
import { TokenTypes } from '../domain/token.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('TokenRepository')
    private readonly tokenRepository: TokenRepository,
  ) {}

  generateToken(payload: any) {
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }

  async saveUserSessionToken(token: string, userId: number) {
    const data = {
      token,
      userId,
      type: TokenTypes.Session,
    };
    const saved = await this.tokenRepository.create(data);
    return saved;
  }
}

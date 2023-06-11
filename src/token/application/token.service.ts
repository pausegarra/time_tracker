import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '../domain/token.repository';
import { TokenTypes } from '../domain/token.entity';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('TokenRepository')
    private readonly tokenRepository: TokenRepository,
    private readonly configService: ConfigService,
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

  getCookieOptions(): CookieOptions {
    const env = this.configService.get('NODE_ENV');
    return {
      secure: env !== 'development',
      sameSite: env !== 'development' ? 'none' : 'strict',
      httpOnly: true,
      maxAge: 604800000,
    };
  }

  getCookieName(): string {
    return 'token';
  }
}

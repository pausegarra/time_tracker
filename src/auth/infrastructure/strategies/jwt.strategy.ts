import { Injectable } from '@nestjs/common';
import { JwtStrategy } from 'src/token/infrastructure/strategies/jwt.strategy';

@Injectable()
export class AuthenticatedStrategy extends JwtStrategy {}

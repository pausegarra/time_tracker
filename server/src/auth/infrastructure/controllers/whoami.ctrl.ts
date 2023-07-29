import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request } from 'express';
import { UserDTO } from 'src/user/infrastructure/dtos/user.dto';
import { UserEntity } from 'src/user/domain/user.entity';

@Controller('/api/auth/whoami')
export class WhoAmIController {
  @Get()
  @UseGuards(JwtAuthGuard)
  whoami(@Req() req: Request) {
    return UserDTO.toResponse(req.user as UserEntity);
  }
}

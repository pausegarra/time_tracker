import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateTopicService } from 'src/topic/services/create-topic.service';
import { CreateTopicDTO } from '../dtos/create-topic.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { UserEntity } from 'src/user/domain/user.entity';

@Controller('/api/topics')
export class CreateTopicController {
  constructor(private readonly createTopicService: CreateTopicService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateTopicDTO, @Req() request: Request) {
    return this.createTopicService.create(body, request.user as UserEntity);
  }
}

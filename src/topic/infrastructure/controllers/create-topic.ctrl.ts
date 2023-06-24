import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateTopicDTO } from '../dtos/create-topic.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { UserEntity } from 'src/user/domain/user.entity';
import { TopicService } from 'src/topic/application/topic.service';

@Controller('/api/topics')
export class CreateTopicController {
  constructor(private readonly topicSerive: TopicService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateTopicDTO, @Req() request: Request) {
    return this.topicSerive.create(body, request.user as UserEntity);
  }
}

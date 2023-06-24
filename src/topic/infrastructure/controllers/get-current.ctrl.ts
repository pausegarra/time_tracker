import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { TopicHistorySerivce } from 'src/topic/application/topic-history.service';
import { UserEntity } from 'src/user/domain/user.entity';

@Controller('/api/topics/current')
export class GetCurrentTopicController {
  constructor(private readonly topicHistoryService: TopicHistorySerivce) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrent(@Req() req: Request) {
    const { id } = req.user as UserEntity;
    return this.topicHistoryService.getCurrent(id);
  }
}

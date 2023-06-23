import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth.guard';
import { TopicNotFoundException } from 'src/topic/services/exceptions/not-found.exception';
import { TopicHistorySerivce } from 'src/topic/services/topic-history.service';
import { TopicService } from 'src/topic/services/topic.service';
import { UserEntity } from 'src/user/domain/user.entity';

@Controller('/api/topics/:topicId/activate')
export class ActivateTopicController {
  constructor(
    private readonly topicHistoryService: TopicHistorySerivce,
    private readonly topicService: TopicService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async activate(@Param('topicId') topicId: number, @Req() req: Request) {
    try {
      const { id } = req.user as UserEntity;
      await this.topicService.ensureTopicOfUserExists(topicId, id);
      await this.topicHistoryService.activate(id, topicId);
    } catch (err) {
      if (err instanceof TopicNotFoundException)
        throw new HttpException('topic_not_found', HttpStatus.NOT_FOUND);

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
